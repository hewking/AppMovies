import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import RefreshFlatList from './common/refreshList/refreshFlatList';

interface State {
    datas: string[];
}

export default class LargeListScreen extends Component<any, State> {

    private mPage = 0;

    constructor(props: any) {
        super(props);
        this.state = {
            datas: [],
        };
    }

    render() {
        return (<View style={styles.container}>
            <RefreshFlatList
                style={styles.list}
                data={this.state.datas}
                enableLoadMore={true}
                onFooterRefresh={this.loadMore}
                onHeadRefresh={this.refresh}
                renderItem={this.renderItem}
            />
        </View>);
    }

    componentDidMount() {
        this.refresh();
    }

    private renderItem = ({ item }: { item: string }) => {
        return (<View style={{ marginVertical: 20, marginHorizontal: 15 }}>
            <Text style={{}}>{item}</Text>
        </View>);
    }

    private createDatas = () => {
        const items: string[] = [];
        for (let i = 0; i < 20; i++) {
            items.push(`text ${this.mPage * 10 + i}`);
        }
        return items;
    };

    private loadMore = () => {
        console.log('largelist loadmore');
        setTimeout(() => {
            this.setState(prevState => ({
                datas: prevState.datas.concat(this.createDatas())
            }));
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