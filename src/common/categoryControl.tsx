import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { any } from 'prop-types';

interface Prop {
    curColor: string;
    curIndex: number;
    height?: number;
    style?: any;
    categoryList: { name: string, image: NodeRequire }[];
}

export default class CategoryControl extends Component<Prop> {

    static defaultProps = {
        curColor: '#d6d6d6',
    };
    render() {
        const { height, style } = this.props;
        return (<View style={[styles.container, { height}, style]}>
            {this.props.categoryList.map(this.renderItem)}
        </View>);
    }

    private renderItem = (category: { name: string, image: NodeRequire }, index: number) => {
        const { curIndex, curColor } = this.props;
        const bgColor = (value: string) => ({ backgroundColor: value });
        const style = curIndex === index ? [styles.item, bgColor(curColor)] : styles.item;
        return <View style={style} key={index}>
            <Image source={category.image} resizeMode='contain' style={{ width: 20, height: 20 }} />
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
});