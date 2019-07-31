import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RefreshState from './refreshState';

interface Props {
  onLoadMore?: () => void;
  onRetryLoading?: () => void;
  footerFailText?: string;
  footerLoadMoreText?: string;
  footerNoMoreText?: string;
  footerRefreshingText?: string;
  loadingState: string;
}

export default class RefreshFooter extends Component<Props, any> {

  render() {
    const {loadingState} = this.props;
    let footer: any = null;
    switch (loadingState) {
      case RefreshState.Idle:
        break;
      case RefreshState.Refreshing:
        // 显示Loading视图
        footer = <View style={styles.loadingView}>
          <ActivityIndicator size="small"/>
          <Text style={styles.refreshingText}>{this.props.footerRefreshingText || "努力加载中"}</Text>
        </View>;
        break;
      case RefreshState.LoadMore:
        footer = this.renderLoadMoreFooter();
        break;
      case RefreshState.NoMore:
        footer = this.renderNoMoreFooter();
        break;
      case RefreshState.Failure:
        footer =
          <TouchableOpacity style={styles.loadingView} onPress={() => {
            // 先判断不为空？
            if (this.props.onRetryLoading) {
              this.props.onRetryLoading();
            }
          }}>
            <Text style={styles.footerText}>{this.props.footerFailText || '点击重新加载'}</Text>
          </TouchableOpacity>;

        break;
    }
    return footer;
  }

  renderLoadMoreFooter() {
    return <View style={styles.loadingView}>
      <Text style={styles.footerText}>{this.props.footerLoadMoreText || "上拉加载更多"}</Text>
    </View>;
  }

  renderNoMoreFooter() {
    return <View style={styles.loadingView}>
      <Text style={styles.footerText}>{this.props.footerNoMoreText || "已全部加载完毕"}</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  footerText: {
    color: "#666666",
    fontSize: 12,
  },
  loadingView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  refreshingText: {
    color: "#666666",
    fontSize: 12,
    paddingLeft: 10,
  },
});
