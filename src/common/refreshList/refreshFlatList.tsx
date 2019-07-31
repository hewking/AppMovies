import React, { Component } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import FooterState from "./refreshState";
import RefreshState from "./refreshState";
import ChatRefreshFooter from "./chatRefreshFooter";
import RefreshFooter from "./refreshFooter";

interface Props {
  enableLoadMore?: boolean;
  onFooterRefresh?: () => void; // 上拉加载方法
  onHeadRefresh?: () => void; // 下拉刷新
  renderItem: ListRenderItem<any>;
  data: any;

  [propsName: string]: any;
}

interface State {
  enableLoadMore: boolean; // 是否打开loadmore
  footerState: string; // 尾部footer状态
  isFooterRefreshing: boolean; // 是否正在上拉加载
  isHeaderRefreshing: boolean; // 是否正在下拉刷新
}

export default class RefreshFlatList extends Component<Props, State> {
  private flatList: FlatList<any> | null = null;

  constructor(props) {
    super(props);
    this.state = {
      enableLoadMore: true, // 是否打开loadmore
      footerState: FooterState.Idle, // 尾部footer状态
      isFooterRefreshing: false, // 是否正在上拉加载
      isHeaderRefreshing: false, // 是否正在下拉刷新
    };
  }

  render() {
    return (
      <FlatList
        {...this.props} // 这一行直接把传给RefreshFlatList的属性中输入FlatList的都传入
        onRefresh={this.beginHeaderRefresh}
        refreshing={this.state.isHeaderRefreshing}
        onEndReached={this.beginFooterRefresh}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
        ref={(list) => this.flatList = list}
        data={this.props.data}
        renderItem={this.props.renderItem}
      />
    );
  }

  beginHeaderRefresh: (() => void) | null = () => {
    // console.log('beginHeaderRefresh beginHeadRefresh');
    if (this.shouldStartHeaderRefresh()) {
      // console.log('beginHeaderRefresh shouldStartHeaderRefresh');
      this.startHeaderRefresh();
    }
  }

  beginFooterRefresh = () => {
    if (this.props.enableLoadMore && this.shouldStartFooterRefresh()) {
      this.startFooterRefresh();
    }
  }

  startHeaderRefresh() {
    this.setState({
      isHeaderRefreshing: true,
    }, () => {
      // 设置state 后的回调
      if (this.props.onHeadRefresh) {
        this.props.onHeadRefresh();
      }
    });
  }

  startFooterRefresh() {
    this.setState({
      footerState: RefreshState.Refreshing,
      isFooterRefreshing: true,
    }, () => {
      if (this.props.onFooterRefresh) {
        this.props.onFooterRefresh();
      }
    });
  }

  shouldStartHeaderRefresh() {
    // console.log('shouldStartHeaderRefresh ' + this.state.footerState
    //   + ' headerrefresh : ' + this.state.isHeaderRefreshing
    //   + ' footerRefresh : ' + this.state.isFooterRefreshing);
    if (this.state.footerState === RefreshState.Refreshing
      || this.state.isHeaderRefreshing || this.state.isFooterRefreshing) {
      return false;
    } else {
      return true;
    }
  }

  shouldStartFooterRefresh() {
    if (this.state.footerState === RefreshState.Refreshing
      || this.state.footerState === RefreshState.NoMore
      || this.state.isHeaderRefreshing
      || this.state.isFooterRefreshing) {
      return false;
    } else {
      return true;
    }
  }

  endRefreshing(footerState = RefreshState.Idle) {
    let footerRefreshState = footerState;
    if (this.props.data.length === 0) {
      footerRefreshState = RefreshState.Idle;
    }
    this.setState({
      footerState: footerRefreshState,
      isFooterRefreshing: false,
      isHeaderRefreshing: false,
    });
  }

  renderFooter = () => {
    return (<RefreshFooter
      loadingState={this.state.footerState}
      onRetryLoading={() => {
        this.beginFooterRefresh();
      }}
    />);
  }

  scrollToEnd(param) {
    this.flatList!.scrollToEnd(param);
  }

  scrollToIndex(index) {
    this.flatList!.scrollToIndex({ index });
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
