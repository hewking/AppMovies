import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LargeList, IndexPath } from 'react-native-largelist-v3';

export default class ChatExample extends Component {

    private sectionCount = 10;
    private rowCount = 10;

    render() {
        const data = [];
        for (let section = 0; section < this.sectionCount; ++section) {
            const sContent: { items: any[] } = { items: [] };
            for (let row = 0; row < this.rowCount; ++row) {
                sContent.items.push(row);
            }
            data.push(sContent);
        }
        return (<View style={{ flex: 1 }}>
            <LargeList
                data={data}
                heightForSection={() => 50}
                renderSection={this._renderSection}
                // heightForIndexPath={() => 50}
                renderIndexPath={this._renderIndexPath}
            />
        </View>);
    }

    _renderSection = (section: number) => {
        return (
            <View style={styles.section}>
                <Text>
                    Section {section}
                </Text>
            </View>
        );
    };

    _renderIndexPath = ({ section: section, row: row }) => {
        return (
            <View style={styles.row}>
                <Text>
                    Section {section} Row {row}
                </Text>
                <View style={styles.line} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        flex: 1,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: "#EEE"
    }
});