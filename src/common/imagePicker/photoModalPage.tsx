import React from 'react';
import { Modal, BackHandler, InteractionManager, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PageKeys from './pageKeys';
import CameraView from './cameraView';
import AlbumListView from './albumListView';
import AlbumView from './albumView';
import PreviewMultiView from './previewMultiView';

export default class PhotoModalPage extends React.PureComponent<any, any> {
  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    deleteLabel: 'Delete',
    useVideoLabel: 'Use Video',
    usePhotoLabel: 'Use Photo',
    previewLabel: 'Preview',
    choosePhotoTitle: 'Choose Photo',
    maxSizeChooseAlert: (num) => 'You can only choose ' + num + ' photos at most',
    maxSizeTakeAlert: (num) => 'You can only take ' + num + ' photos at most',
    supportedOrientations: ['portrait', 'landscape'],
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.clickBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.clickBack);
  }

  render() {
    const callback = (data) => {
      if (this.props.callback) {
        this.props.callback(data);
      }
      if (this.props.onDestroy) {
        this.props.onDestroy();
      }
    };
    const allscenes = {
      [PageKeys.camera]: CameraView,
      [PageKeys.album_list]: AlbumListView,
      [PageKeys.album_view]: AlbumView,
      [PageKeys.preview]: PreviewMultiView,
    };
    // tslint:disable-next-line: max-classes-per-file
    const withUnwrap = (WrappedComponent) => class extends React.PureComponent<any, any> {
      render() {
        return (
          <WrappedComponent
            {...this.props.navigation.state.params}
            navigation={this.props.navigation}
          />
        );
      }
    };

    const scenes = Object.keys(allscenes)
      .reduce((prv, cur) => {
        prv[cur] = {
          screen: withUnwrap(allscenes[cur]),
          navigationOptions: {
            gesturesEnabled: false,
          }
        };
        return prv;
      }, {});
    const NavigationDoor = createStackNavigator(
      scenes,
      {
        initialRouteName: this.props.initialRouteName,
        initialRouteParams: {
          ...this.props,
          callback,
        },
        headerMode: 'none',
      });
    const TAB = createAppContainer(NavigationDoor);
    return (
      <Modal
        animationType={'slide'}
        supportedOrientations={this.props.supportedOrientations}
      >
        <TAB />
      </Modal>
    );
  }

  clickBack = () => {
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
    return true;
  }
}
