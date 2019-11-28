import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, CameraRoll, Platform } from 'react-native';
// import { ProcessingManager } from 'react-native-video-processing';
import RNFS from 'react-native-fs';

export default class VideoProcess extends Component {

    render() {
        return (<View>
            <Button title={'获取所有资源'}
                onPress={() => {
                    this.printAllResources();
                }}>

            </Button>
            <Button
                title={'获取视频Info'}
                onPress={() => {
                    this.printInfo();
                }}
            />

            <Button
                title={'压缩视频'}
                onPress={() => {
                    this.compressVideo();
                }}
            />

        </View>);
    }

    printAllResources = async () => {
        CameraRoll.getPhotos({
            first: 1000000,
            // groupTypes: Platform.OS === 'ios' ? this.props.groupTypes : undefined,
            assetType: 'All',
        }).then((result) => {
            const arr = result.edges.map(item => item.node);
            const dict = arr.reduce((prv, cur) => {
                const curValue = {
                    type: cur.type,
                    location: cur.location,
                    timestamp: cur.timestamp,
                    ...cur.image,
                };
                if (!prv[cur.group_name]) {
                    prv[cur.group_name] = [curValue];
                } else {
                    prv[cur.group_name].push(curValue);
                }
                return prv;
            }, {});

            const values = Object.values(dict).reduce((pre, cur) => {
                return pre.concat(cur);
            }).filter(item => (item.type.indexOf('video') !== -1));
            // const data = Object.keys(dict)
            //     .sort((a, b) => {
            //         const rootIndex = 'Camera Roll';
            //         if (a === rootIndex) {
            //             return -1;
            //         } else if (b === rootIndex) {
            //             return 1;
            //         } else {
            //             return a < b ? -1 : 1;
            //         }
            //     })
            //     .map(key => ({ name: key, value: dict[key] }))
            // .filter(item => (item.type.index('video') !== -1));
            console.log(`all medias : ` + JSON.stringify(values));

        });
    }

    printInfo = async () => {
        const source = 'file:///storage/emulated/0/DCIM/Camera/20190726_143243.mp4';
        this.info(source);

    }

    info = async (source: string) => {
        // const info = await ProcessingManager.getVideoInfo(source);
        // console.log(JSON.stringify(info));

        const file = await RNFS.stat(source);
        console.log(JSON.stringify(file));

    }

    compressVideo = async () => {
        const source = 'file:///storage/emulated/0/DCIM/Camera/20190726_143243.mp4';

        const options = {
            width: 1080,
            height: 1920,
            bitrateMultiplier: 3,
            saveToCameraRoll: true, // default is false, iOS only
            saveWithCurrentDate: true, // default is false, iOS only
            minimumBitrate: 300000,
            removeAudio: false, // default is false
        };
        // this.videoPlayerRef.compress(options)
        //     .then((newSource) => console.log(newSource))
        //     .catch(console.warn);

        // const newSource = await ProcessingManager.compress(source, options);
        // console.log(newSource)
        // this.info(newSource.source);
    }
}

const styles = StyleSheet.create({

});