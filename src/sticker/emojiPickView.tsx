import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Stickers from '../../res/Stickers/sticker';
import SegmentControl from '../common/segmentControl';
import { wScreen } from '../util/screen';
import StickerManager from './stickerManager';

interface Props {
  style: any;
  tabViewHeight?: number;
  height?: number;
  itemSize?: number;
  key?: string;
  onPickEmoji: (text: string, shouldDelete: boolean) => void;
}

interface State {
  width: number;
  curIndex: number;
}


export default class extends React.PureComponent<Props, State> {

  static defaultProps = {
    itemSize: 42,
    tabViewHeight: 30,
  };

  DeleteItem = '__emoji_pick_delete__';
  PlaceholderItem = '__emoji_pick_placeholder__';

  private scrollView: ScrollView | null = null;

  constructor(props) {
    super(props);
    this.state = {
      width: wScreen - 100,
      curIndex: 0,
    };
  }

  render() {
    const { tabViewHeight, key, height } = this.props;
    const tabStyle = {
      height: tabViewHeight,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'grey',
    };
    const emojis = StickerManager.getInstance().getAllStickers()
      .map((item, index) => { return { text: item.name, image: item.resource } });
    const collection = this.dataSource(emojis);
    const isValid = this.state.width > 0;
    return (
      <View onLayout={this.onLayout} style={[styles.view, { height, width: this.state.width }
        , { flexDirection: 'column', backgroundColor: "pink" }]}>
        {this.renderScrollView(collection)}
        <View style={[styles.tabview, tabStyle]}>
          {isValid && (
            <SegmentControl
              length={collection.pages}
              currentIndex={this.state.curIndex}
            />
          )}
        </View>
      </View>
    );
  }

  private renderScrollView = (collection) => {
    const { height } = this.props;
    return (
      <ScrollView
        ref={v => this.scrollView = v}
        style={[styles.scrollview, { height }]}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={this.onContentHorizontalScrollEnd}
        scrollEventThrottle={16}
      >
        {collection.data.map(this.renderPage.bind(this, collection))}
      </ScrollView>
    );
  }

  private renderPage = (collection, obj, index) => {
    const { marginH, marginV, numColumns } = collection;
    return (
      <FlatList
        key={index}
        style={[{ marginHorizontal: marginH, marginVertical: marginV }, { backgroundColor: '#cacaca' }]}
        data={obj}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={item => item.text}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  private renderItem = ({ item }) => {
    const { text, image } = item;
    const style = {
      width: this.props.itemSize,
      height: this.props.itemSize,
    };
    if (text === this.PlaceholderItem) {
      return <View style={style} />;
    }
    return (
      <TouchableOpacity onPress={this.clickEmoji.bind(this, text)}>
        <View style={[styles.itemview, style, { backgroundColor: 'skyblue' }]}>
          <Image style={styles.icon} source={image} />
        </View>
      </TouchableOpacity>
    );
  }

  private onContentHorizontalScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / this.state.width);
    if (newIndex !== this.state.curIndex) {
      this.setState({
        curIndex: newIndex,
      });
    }
  }

  private onCategoryChanged = () => {
    // todo
  }

  private clickEmoji = (text: string) => {
    const { onPickEmoji } = this.props;
    if (onPickEmoji) {
      onPickEmoji(text, text === this.DeleteItem);
    }
  }

  private onLayout = (event) => {
    // const { width } = event.nativeEvent.layout;
    // this.setState({
    //   width,
    // });
  }

  private dataSource = (emojis) => {
    const [numColumns, marginH] = this.columnCount();
    const [numRows, marginV] = this.rowCount();
    const pageSize = numColumns * numRows - 1;
    const pages = Math.ceil(emojis.length / pageSize);
    const dataArr: any[] = [];
    for (let i = 0; i < pages; i++) {
      const arr = emojis.slice(i * pageSize, (i + 1) * pageSize);
      if (arr.length < pageSize) {
        const gap = pageSize - arr.length;
        for (let j = 0; j < gap; j++) {
          arr.push({ text: this.PlaceholderItem });
        }
      }
      // arr.push({
      //   text: this.DeleteItem,
      //   image: require('./image/emoji_delete.png'),
      // });
      dataArr.push(arr);
    }
    return { data: dataArr, numRows, numColumns, marginH, marginV, pageSize, pages };
  }

  private columnCount = () => {
    const width = this.state.width;
    const minMarginH = 15;
    const numColumns = Math.floor((width - minMarginH * 2) / this.props.itemSize);
    const marginH = (width - this.props.itemSize * numColumns) / 2;
    return [numColumns, marginH];
  }

  private rowCount = () => {
    const height = this.props.height - this.props.tabViewHeight;
    const minMarginV = 4;
    const numRows = Math.floor((height - minMarginV * 2) / this.props.itemSize);
    const marginV = (height - this.props.itemSize * numRows) / 2;
    return [numRows, marginV];
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column'
  },
  scrollview: {
    flexDirection: 'row',
  },
  tabview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
  },
});
