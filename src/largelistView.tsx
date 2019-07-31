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
        for (let i = 0; i < 10; i++) {
            items.push(`text ${this.mPage * 10 + i}`);
        }
        return items;
    };

    private loadMore = () => {
        this.setState((prevState => {
            datas: prevState.datas.concat(this.createDatas())
        }));
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