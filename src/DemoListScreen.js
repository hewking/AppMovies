
import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'

export default class DemoListScreen extends Component {

    getData() {
        return [
            { key: '定时器', id: 1, route: 'Timer' },
            { key: '调试', id: 2, route: 'Debug' },
            { key: 'sticker', id: 3, route: 'StickerPickerView' },
            { key: 'Counter', id: 4, route: 'Counter' },
            { key: 'Chat', id: 5, route: 'Chat' },
            { key: '版本升级', id: 5, route: 'UpgradeDemo' },
            { key: 'AudioDemo', id: 6, route: 'AudioDemo' },
            { key: 'PanExample', id: 7, route: 'PanExample' },
            { key: 'SvgDemo', id: 8, route: 'SvgDemo' },
            { key: 'CircularProgress', id: 9, route: 'CircularProgress' },
            { key: 'CircularDemo2', id: 10, route: 'CircularDemo2' },
        ]
    }

    render() {
        return (<View style={styles.contaner}>
            <FlatList
                data={this.getData()}
                renderItem={({ item }) => this.bindItem(item)}
            />
        </View>)
    }

    bindItem(item) {
        return (<View style={styles.list}>
            <Button title={item.key} onPress={() => {
                this.props.navigation.navigate(item.route, {
                    title: item.key,
                    id: item.id
                })
            }
            } style={styles.text} />
        </View>)
    }

}

const styles = StyleSheet.create({
    contaner: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 16,
        fontStyle: 'normal',
        padding: 8,
    }
})