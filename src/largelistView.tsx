import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import RefreshFlatList from './common/refreshList/refreshFlatList';

interface State {
    datas: string[];
}

export default class LargeListScreen extends Component<any, State> {

    private mPage = 0;
    private flatList: RefreshFlatList;

    constructor(props: any) {
        super(props);
        this.state = {
            datas: [],
        };
    }

    render() {
        return (<View style={styles.container}>
            <RefreshFlatList
                ref={ref => {
                    this.flatList = ref;
                }}
                style={styles.list}
                data={this.state.datas}
                enableLoadMore={true}
                onFooterRefresh={this.loadMore}
                onHeadRefresh={this.refresh}
                renderItem={this.renderItem}
                onScroll={this.handleOnScroll}
            />
        </View>);
    }

    componentDidMount() {
        this.refresh();
    }

    private handleOnScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y > this.props.scrollToBottomOffset!) {
            
        } else {
        }
    }

    private renderItem = ({ item }: { item: string }) => {
        return (<View style={{ marginVertical: 20, marginHorizontal: 15 }}>
            <Text style={{}}>{item}</Text>
        </View>);
    }

    private createDatas = () => {
        const items: string[] = [];
        for (let i = 0; i < 20; i++) {
            items.push(`text ${this.mPage * 20 + i}`);
        }
        return items;
    };

    private loadMore = () => {
        console.log('largelist loadmore');
        setTimeout(() => {
            this.setState(prevState => ({
                datas: prevState.datas.concat(this.createDatas())
            }), () => {
                this.mPage++;
                this.flatList.endRefreshing();
            });
        }, 1000);
    }

    private refresh = () => {
        this.mPage = 0;
        this.setState({
            datas: this.createDatas(),
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    }
});