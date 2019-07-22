
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