import React from 'react';
import {
  FlatList, Image, ScrollView, StyleSheet
  , TouchableOpacity, View,
  ToastAndroid
} from 'react-native';
import Stickers from '../../res/Stickers/sticker';
import SegmentControl from '../common/segmentControl';
import CategoryControl from '../common/categoryControl';
import { wScreen } from '../util/screen';
import GridView from '../common/gridView';
import StickerManager, { PAGE_COLUMNs, PAGE_ROWS } from './stickerManager';
import { StickerItem } from './stickerCategory';

interface Props {
  style: any;
  tabViewHeight?: number;
  height?: number;
  itemSize?: number;
  key?: string;
  onPickEmoji: (text: StickerItem) => void;
}

interface State {
  width: number;
  curIndex: number;
  categoryCount: number;
}


export default class EmojiPickView extends React.PureComponent<Props, State> {

  static defaultProps = {
    itemSize: 64,
    tabViewHeight: 30,
  };

  DeleteItem = '__emoji_pick_delete__';
  PlaceholderItem = '__emoji_pick_placeholder__';

  private scrollView: ScrollView | null = null;

  constructor(props) {
    super(props);
    this.state = {
      width: wScreen - 20,
      curIndex: 0,
      categoryCount: StickerManager.getInstance().getCagegorySizeByIndex(0),
    };
  }

  render() {
    const { tabViewHeight, key, height } = this.props;
    const tabStyle = {
      height: tabViewHeight,
    };
    const emojis = StickerManager.getInstance().getAllStickers();
    const collection = this.dataSource(emojis);
    const isValid = this.state.width > 0;
    const curIndex = StickerManager.getInstance().getCagegoryCurIndex(this.state.curIndex);
    const categoryOrder = StickerManager.getInstance().getCategoryOrderByIndex(this.state.curIndex);
    const categoryList = StickerManager.getInstance().getAllCategory()
      .map(item => { return { name: item.getName(), image: item.getPoster() } })
    console.log(`EmojiPickView true curIndex: ${this.state.curIndex}`);
    console.log(`EmojiPickView cuIndex: ${curIndex} categoryCount: ${this.state.categoryCount}`);
    console.log(`EmojiPickView categoryOrder: ${categoryOrder}`);
    return (
      <View onLayout={this.onLayout} style={[styles.view, { height, width: this.state.width }
        , { flexDirection: 'column', backgroundColor: "pink" }]}>
        {this.renderScrollView(collection)}
        <View style={[styles.tabview, tabStyle]}>
          {isValid && (
            <SegmentControl
              length={this.state.categoryCount}
              currentIndex={curIndex}
            />
          )}
        </View>
        <CategoryControl
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#d6d6d6',
          }}
          curIndex={categoryOrder}
          height={tabViewHeight}
          categoryList={categoryList}
        />
      </View>
    );
  }

  private renderScrollView = (collection) => {
    const { height, tabViewHeight } = this.props;
    const viewHeight = height! - 2 * tabViewHeight!;
    return (
      <ScrollView
        ref={v => this.scrollView = v}
        style={[styles.scrollview, { height: viewHeight }]}
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

  private renderPage = (collection: any, obj: any, index: number) => {
    const { marginH, marginV, numColumns } = collection;
    return (
      <GridView
        // key={index}
        style={[{ marginHorizontal: marginH, marginVertical: marginV }
          , { backgroundColor: '#cacaca' }]}
        data={obj}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={item => item.text}
      // showsVerticalScrollIndicator={false}
      />
    );
  }

  private renderItem = (item) => {
    const { name, resource } = item;
    const style = {
      width: this.props.itemSize,
      height: this.props.itemSize,
    };
    if (name === this.PlaceholderItem) {
      return <View style={style} />;
    }
    return (
      <TouchableOpacity onPress={this.clickEmoji.bind(this, item)}>
        <View style={[styles.itemview, style, { backgroundColor: 'skyblue' }]}>
          <Image style={styles.icon} source={resource} />
        </View>
      </TouchableOpacity>
    );
  }

  private onContentHorizontalScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / this.state.width);
    console.log('EmojiPickView offsetX : ' + offsetX
      + " curIndex: " + this.state.curIndex
      + " newIndex: " + newIndex + ' width: ' + this.state.width);
    if (newIndex !== this.state.curIndex) {
      if (StickerManager.getInstance().checkCategoryChanged(this.state.curIndex, newIndex)) {
        this.onCategoryChanged();
        this.setState({
          curIndex: newIndex,
          categoryCount: StickerManager.getInstance().getCagegorySizeByIndex(newIndex)
        });
      } else {
        this.setState({
          curIndex: newIndex,
        });
      }
    }
  }

  private onCategoryChanged = () => {
    // todo
    ToastAndroid.show('EmojiPickView onCategoryChanged', ToastAndroid.SHORT);
    console.log('EmojiPickView onCategoryChanged');
  }

  private clickEmoji = (item: StickerItem) => {
    const { onPickEmoji } = this.props;
    if (onPickEmoji) {
      onPickEmoji(item);
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
    const pageSize = numColumns * numRows;
    const pages = StickerManager.getInstance().getCagegoryPageCount();
    const dataArr: any[] = [];
    for (let i = 0; i < pages; i++) {
      const arr = emojis.slice(i * pageSize, (i + 1) * pageSize);
      dataArr.push(arr);
    }
    console.log('dataSource pages: ' + pages);
    return { data: dataArr, numRows, numColumns, marginH, marginV, pageSize, pages };
  }

  private columnCount = () => {
    const width = this.state.width;
    const minMarginH = 15;
    // const numColumns = Math.floor((width - minMarginH * 2) / this.props.itemSize);
    const numColumns = PAGE_COLUMNs;
    const marginH = (width - this.props.itemSize * numColumns) / 2;
    return [numColumns, marginH];
  }

  private rowCount = () => {
    const height = this.props.height - this.props.tabViewHeight * 2;
    const minMarginV = 4;
    // const numRows = Math.floor((height - minMarginV * 2) / this.props.itemSize);
    const numRows = PAGE_ROWS;
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
