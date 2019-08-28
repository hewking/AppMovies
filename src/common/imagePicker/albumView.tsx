import React from 'react';
import { Alert, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NaviBar, { getSafeAreaInset } from 'react-native-pure-navigation-bar';
import * as RNFS from 'react-native-fs';
import PageKeys from './pageKeys';
import * as ChatIcons from '@asset/chat';
import { showShortToast } from '@utils/toast';

export default class AlbumView extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [...this.props.selectedItems],
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onWindowChanged);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onWindowChanged);
  }

  render() {
    const safeArea = getSafeAreaInset();
    const style = {
      paddingLeft: safeArea.left,
      paddingRight: safeArea.right,
    };
    return (
      <View style={styles.view}>
        <NaviBar
          title={this.props.groupName}
          onLeft={this.clickBack}
          rightElement={this.props.cancelLabel}
          onRight={this.onFinish.bind(this, [])}
        />
        <FlatList
          key={this.column()}
          style={[styles.list, style]}
          renderItem={this.renderItem}
          data={this.props.photos}
          keyExtractor={item => item.uri}
          numColumns={this.column()}
          extraData={this.state}
        />
        {this.renderBottomView()}
      </View>
    );
  }

  private renderItem = ({ item, index }) => {
    console.log('album photo: ' + JSON.stringify(item));
    const safeArea = getSafeAreaInset();
    const edge = (Dimensions.get('window').width - safeArea.left - safeArea.right) / this.column() - 2;
    const isSelected = this.state.selectedItems.some(obj => obj.uri === item.uri);
    const backgroundColor = isSelected ? '#e15151' : 'transparent';
    const hasIcon = isSelected || this.state.selectedItems.length < this.props.maxSize;
    return (
      <TouchableOpacity onPress={this.clickCell.bind(this, item)}>
        <View style={{ padding: 1 }}>
          <Image
            key={index}
            source={{ uri: item.uri }}
            style={{ width: edge, height: edge, overflow: 'hidden' }}
            resizeMode='cover'
          />
          {
            (item.type.search("video") !== -1)
            && <ChatIcons.IconAlbumVideo style={{
              position: 'absolute',
              left: 5,
              bottom: 5,
            }} />
          }
          {hasIcon && (
            <View style={styles.selectView}>
              <View style={[styles.selectIcon, { backgroundColor }]}>
                {isSelected && (
                  <Image
                    source={require('./images/check_box.png')}
                    style={styles.selectedIcon}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  private renderBottomView = () => {
    const previewButton = this.state.selectedItems.length > 0 ? this.props.previewLabel : '';
    const okButton = this.props.okLabel + ' (' + this.state.selectedItems.length + '/' + this.props.maxSize + ')';
    const safeArea = getSafeAreaInset();
    return (
      <View style={[styles.bottom, { marginBottom: safeArea.bottom }]}>
        <TouchableOpacity onPress={this.clickPreview}>
          <Text style={styles.previewButton}>
            {previewButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.clickOk}>
          <Text style={styles.okButton}>
            {okButton}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onFinish = (data) => {
    if (this.props.autoConvertPath && Platform.OS === 'ios') {
      const promises = data.map((item, index) => {
        const { uri } = item;
        const params = uri.split('?');
        if (params.length < 1) {
          throw new Error('Unknown URI：' + uri);
        }
        const keyValues = params[1].split('&');
        if (keyValues.length < 2) {
          throw new Error('Unknown URI：' + uri);
        }
        const kvMaps = keyValues.reduce((prv, cur) => {
          const kv = cur.split('=');
          prv[kv[0]] = kv[1];
          return prv;
        }, {});
        const itemId = kvMaps.id;
        const ext = kvMaps.ext.toLowerCase();
        const destPath = RNFS.CachesDirectoryPath + '/' + itemId + '.' + ext;
        let promise;
        if (item.type === 'ALAssetTypePhoto') {
          promise = RNFS.copyAssetsFileIOS(uri, destPath, 0, 0);
        } else if (item.type === 'ALAssetTypeVideo') {
          promise = RNFS.copyAssetsVideoIOS(uri, destPath);
        } else {
          throw new Error('Unknown URI：' + uri);
        }
        return promise
          .then((resultUri) => {
            data[index].uri = resultUri;
          });
      });
      Promise.all(promises)
        .then(() => {
          if (this.props.callback) {
            this.props.callback(data);
          }
        });
    } else if (this.props.autoConvertPath && Platform.OS === 'android') {
      const promises = data.map((item, index) => {
        return RNFS.stat(item.uri)
          .then((result) => {
            data[index].uri = result.originalFilepath;
          });
      });
      Promise.all(promises)
        .then(() => {
          if (this.props.callback) {
            this.props.callback(data);
          }
        });
    } else {
      if (this.props.callback) {
        this.props.callback(data);
      }
    }
  }

  private onDeletePageFinish = (data) => {
    const selectedItems = this.state.selectedItems
      .filter(item => data.indexOf(item.uri) >= 0);
    this.setState({ selectedItems });
  }

  private clickBack = () => {
    if (this.props.onBack) {
      this.props.onBack(this.state.selectedItems);
    }
  }

  private clickCell = (itemuri) => {
    const isSelected = this.state.selectedItems.some(item => item.uri === itemuri.uri);
    if (isSelected) {
      const selectedItems = this.state.selectedItems.filter(item => item.uri !== itemuri.uri);
      this.setState({
        selectedItems: [...selectedItems]
      });
    } else if (this.state.selectedItems.length >= this.props.maxSize) {
      showShortToast(this.props.maxSizeChooseAlert(this.props.maxSize));
    } else {
      this.setState({
        selectedItems: [...this.state.selectedItems, itemuri]
      });
    }
  }

  private clickPreview = () => {
    if (this.state.selectedItems.length > 0) {
      this.props.navigation.navigate(PageKeys.preview, {
        ...this.props,
        images: this.state.selectedItems.map(item => item.uri),
        callback: this.onDeletePageFinish,
      });
    }
  }

  private clickOk = () => {
    if (this.state.selectedItems.length > 0) {
      this.onFinish(this.state.selectedItems);
    }
  }

  private column = () => {
    const { width, height } = Dimensions.get('window');
    if (width < height) {
      return 3;
    } else {
      const safeArea = getSafeAreaInset();
      const edge = height * 1.0 / 3;
      return parseInt((width - safeArea.left - safeArea.right) / edge + '');
    }
  }

  private onWindowChanged = () => {
    this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeView: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  selectView: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 30,
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  selectIcon: {
    marginTop: 2,
    marginRight: 2,
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedIcon: {
    width: 13,
    height: 13,
  },
  bottom: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6e6ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6ea',
  },
  previewButton: {
    marginLeft: 10,
    padding: 5,
    fontSize: 16,
    color: '#666666',
  },
  okButton: {
    marginRight: 15,
    paddingHorizontal: 15,
    height: 30,
    ...Platform.select({
      ios: { lineHeight: 30 },
      android: { textAlignVertical: 'center' }
    }),
    borderRadius: 6,
    overflow: 'hidden',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#e15151',
  },
});
