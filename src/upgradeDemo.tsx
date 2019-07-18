import React, { Component } from 'react';
import {
    View, Image, StyleSheet
    , Text, TouchableOpacity
    , NativeModules,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

const UPGRADE_API = 'https://ali-fir-pro-binary.fir.im/99c869a7cb5ca49b5749acb6e2b52044c2e74770.apk?auth_key=1563439432-0-0-a0cc1ca3af21cd7afe1bd85a1cc4f234';

interface State {
    showLoading: boolean
}

export default class UpgradeDemo extends Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            showLoading: false
        }
    }

    render() {
        return (<View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => {
                this.upgrade();
            }} >
                <Text style={{
                    backgroundColor: 'skyblue', borderRadius: 6
                    , paddingHorizontal: 25, paddingVertical: 15
                }}
                >{'升级'}</Text>
            </TouchableOpacity>
            {
                this.state.showLoading ? <ActivityIndicator /> : null
            }
        </View>);
    }

    private upgrade = async () => {

        // const resp =  await fetch(UPGRADE_API,{
        //     method:'GET'
        // })
        // const bean = resp.json();
        this.setState(prevState => ({
            showLoading: !prevState.showLoading
        }));
        setTimeout(() => {
            // 下载最新Apk  
            NativeModules.upgrade.upgrade(UPGRADE_API);
            this.setState(prevState => ({
                showLoading: !prevState.showLoading
            }));
        }, 3000);

    }

}