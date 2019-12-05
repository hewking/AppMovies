import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import Highlighter from "./highlighter";
// import Highlighter from 'react-native-highlight-words';

export default function TextHightLight(props: any) {

    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
            {'this is a search word'}
        </Text>
        <Highlighter
            highlightStyle={{ backgroundColor: 'yellow' }}
            searchWords={['and', 'or', 'the']}
            textToHighlight='The dog is chasing the cat. Or perhaps they?' />
    </SafeAreaView>);

}