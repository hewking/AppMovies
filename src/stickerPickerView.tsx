import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import EmojiPickView from './sticker/emojiPickView';

export default class StickerPickerView extends Component<any, any> {

    render(): React.ReactNode {
        return (<View style={styles.constainer}>
            <EmojiPickView
                style={styles.scrollView}
                height={220}
                itemSize={80}
                onPickEmoji={(text, shouldDelte) => {

                }}
            />
        </View>);
    }

}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flexDirection: 'row',
        backgroundColor: 'pink',
    }
});
