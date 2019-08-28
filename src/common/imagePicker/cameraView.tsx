// import React from 'react';
// import {
//   Alert, Dimensions, Image, Platform
//   , StyleSheet, Text, TouchableOpacity
//   , View, TouchableWithoutFeedback
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { getSafeAreaInset } from 'react-native-pure-navigation-bar';
// import Video from 'react-native-video';
// import PageKeys from './pageKeys';
// import * as Toast from '../../../utils/toast';
// import * as ChatIcons from '@asset/chat';
// import { dp2px } from '../../../utils/screen';
// import CameraControlPanel from '@common/cameraControlPanel';
// import RecordView from '@app/components/chat/component/recordView';
// import StatusBar from '@common/statusBar';

// export default class CameraView extends React.PureComponent<any, any> {
//   static defaultProps = {
//     maxSize: 1,
//     sideType: RNCamera.Constants.Type.back,
//     flashMode: 0,
//     videoQuality: RNCamera.Constants.VideoQuality["480p"],
//     pictureOptions: {},
//     recordingOptions: {},
//   };

//   private flashModes: any[];
//   private camera: any;
//   private player: any;

//   constructor(props) {
//     super(props);
//     this.flashModes = [
//       RNCamera.Constants.FlashMode.auto,
//       RNCamera.Constants.FlashMode.off,
//       RNCamera.Constants.FlashMode.on,
//     ];
//     this.state = {
//       data: [],
//       isPreview: false,
//       sideType: this.props.sideType,
//       flashMode: this.props.flashMode,
//       isRecording: false,
//       isVideo: false,
//     };
//   }

//   componentDidMount() {
//     Dimensions.addEventListener('change', this.onWindowChanged);
//   }

//   componentWillUnmount() {
//     Dimensions.removeEventListener('change', this.onWindowChanged);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar hidden={true} />
//         {!this.state.isPreview ? this.renderCameraView() : this.renderPreviewView()}
//         {this.renderTopView()}
//         {this.renderBottomView()}
//       </View>
//     );
//   }

//   private renderTopView = () => {
//     const safeArea = getSafeAreaInset();
//     const style = {
//       top: safeArea.top,
//       left: safeArea.left,
//       right: safeArea.right,
//     };
//     const { flashMode } = this.state;
//     return (
//       <View style={[styles.top, style]}>
//         {this.renderTopButton(ChatIcons.IconWhiteBack, this.clickCancel)}
//         {!this.state.isPreview ? this.renderTopButton(ChatIcons.IconSwitchCamera, this.clickSwitchSide) : null}
//       </View>
//     );
//   }

//   private renderTopButton = (IconImage, onPress) => {
//     return (
//       <TouchableOpacity onPress={onPress}>
//         {/* <Image style={styles.topImage} source={image} /> */}
//         <IconImage style={styles.topImage} />
//       </TouchableOpacity>
//     );
//   }

//   private renderCameraView = () => {
//     return (
//       <RNCamera
//         ref={cam => this.camera = cam}
//         type={this.state.sideType}
//         defaultVideoQuality={this.props.videoQuality}
//         flashMode={this.flashModes[this.state.flashMode]}
//         style={styles.camera}
//         captureAudio={true}
//       // fixOrientation={true}
//       />
//     );
//   }

//   private renderPreviewView = () => {
//     const { width, height } = Dimensions.get('window');
//     const safeArea = getSafeAreaInset();
//     const style = {
//       flex: 1,
//       // marginTop: safeArea.top + topHeight,
//       // marginLeft: safeArea.left,
//       // marginRight: safeArea.right,
//       // marginBottom: safeArea.bottom + bottomHeight,
//       // backgroundColor: 'black',
//     };
//     console.debug(`renderPrevview data:${JSON.stringify(this.state.data[0])}  isVideo : ${this.state.isVideo}
//     size : ${this.state.data.length}`);
//     if (this.state.data.length > 0) {
//       return (
//         <View style={{ width, height }}>
//           {this.state.isVideo ? (
//             <Video
//               source={{ uri: this.state.data[0].uri }}
//               ref={(ref) => this.player = ref}
//               style={style}
//             />
//           ) : (
//               <Image
//                 resizeMode='contain'
//                 style={style}
//                 source={{ uri: this.state.data[0].uri }}
//               />
//             )}
//         </View>
//       );
//     } else {
//       return null;
//     }
//   }

//   private renderBottomView = () => {
//     const safeArea = getSafeAreaInset();
//     const style = {
//       bottom: safeArea.bottom,
//       left: safeArea.left,
//       right: safeArea.right,
//     };
//     const isMulti = this.props.maxSize > 1;
//     const hasPhoto = this.state.data.length > 0;
//     const inPreview = this.state.isPreview;
//     const isRecording = this.state.isRecording;
//     const buttonName = this.state.isVideo ? this.props.useVideoLabel : this.props.usePhotoLabel;

//     if (inPreview && !isRecording) {
//       return (<TouchableOpacity style={[styles.bottom, style
//         , {
//         justifyContent: 'center'
//         , alignItems: 'center'
//       }]}
//         onPress={() => {
//           this.clickOK();
//         }}>
//         <ChatIcons.IconVideoSend style={{
//           resizeMode: 'contain',
//           width: dp2px(65),
//           height: dp2px(65)
//         }}
//         />
//       </TouchableOpacity>);
//     } else {
//       return (<View style={[styles.bottom, style
//         , {
//         height: 100,
//         marginBottom: 20,
//         justifyContent: 'center'
//         , alignItems: 'center'
//       }]}>

//         <RecordView
//           onRecordStart={() => {
//             this.setState({
//               isVideo: true,
//             }, () => {
//               this.clickRecordVideo();
//             });
//           }}
//           onRecordFinish={(allow: boolean) => {
//             this.clickRecordVideo();
//           }}
//           onRecording={(isRecord: boolean) => {
//             console.debug('正在录制中');
//           }}
//           onTakePhoto={() => {
//             this.clickTakePicture();
//           }}>

//         </RecordView>
//       </View>);
//     }
//   }

//   private renderPreviewButton = () => {
//     const text = '' + this.state.data.length + '/' + this.props.maxSize;
//     return (
//       <TouchableOpacity onPress={this.clickPreview} style={styles.previewTouch}>
//         <View style={styles.previewView}>
//           <Image
//             style={styles.previewImage}
//             source={{ uri: this.state.data[this.state.data.length - 1].uri }}
//           />
//           <Text style={styles.previewText}>
//             {text}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   private renderBottomButton = (text, onPress) => {
//     return (
//       <TouchableOpacity onPress={onPress} style={styles.buttonTouch}>
//         <Text style={styles.buttonText}>
//           {text}
//         </Text>
//       </TouchableOpacity>
//     );
//   }

//   private renderTakePhotoButton = () => {
//     const safeArea = getSafeAreaInset();
//     const left = (Dimensions.get('window').width - safeArea.left - safeArea.right - 84) / 2;
//     const icon = this.state.isRecording ?
//       require('./images/video_recording.png') :
//       require('./images/shutter.png');
//     return (
//       <TouchableOpacity
//         onPress={this.state.isVideo ? this.clickRecordVideo : this.clickTakePicture}
//         style={[styles.takeView, { left }]}
//       >
//         <Image style={styles.takeImage} source={icon} />
//       </TouchableOpacity>
//     );
//   }

//   private onFinish = (data) => {
//     if (this.props.callback) {
//       this.props.callback(data);
//     }
//   }

//   private onDeletePageFinish = (data) => {
//     this.setState({
//       data: [...data],
//     });
//   }

//   private clickTakePicture = async () => {
//     if (this.camera) {
//       const item = await this.camera.takePictureAsync({
//         mirrorImage: this.state.sideType === RNCamera.Constants.Type.front,
//         fixOrientation: true,
//         forceUpOrientation: true,
//         ...this.props.pictureOptions
//       });
//       if (Platform.OS === 'ios') {
//         if (item.uri.startsWith('file://')) {
//           item.uri = item.uri.substring(7);
//         }
//       }
//       if (this.props.maxSize > 1) {
//         if (this.state.data.length >= this.props.maxSize) {
//           Toast.showShortToast(this.props.maxSizeTakeAlert(this.props.maxSize));
//         } else {
//           this.setState({
//             data: [...this.state.data, item],
//           });
//         }
//       } else {
//         const photoItem = Object.assign(item, { isVideo: false });
//         this.setState({
//           data: [photoItem],
//           isPreview: true,
//         });
//       }
//     }
//   }

//   private clickRecordVideo = () => {
//     if (this.camera) {
//       if (this.state.isRecording) {
//         this.camera.stopRecording();
//       } else {
//         this.setState({
//           isRecording: true,
//         }, this.startRecording);
//       }
//     }
//   }

//   private startRecording = () => {
//     this.camera.recordAsync(this.props.recordingOptions)
//       .then((item) => {
//         if (Platform.OS === 'ios') {
//           if (item.uri.startsWith('file://')) {
//             item.uri = item.uri.substring(7);
//           }
//         }
//         console.debug(`recordAsync : ${(item)}`);
//         const videoItem = Object.assign(item, { isVideo: true });
//         this.setState({
//           data: [videoItem],
//           isRecording: false,
//           isPreview: true,
//         });
//       });
//   }

//   private clickOK = () => {
//     this.onFinish(this.state.data);
//   }

//   private clickSwitchSide = () => {
//     const target = this.state.sideType === RNCamera.Constants.Type.back
//       ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
//     this.setState({ sideType: target });
//   }

//   private clickFlashMode = () => {
//     const newMode = (this.state.flashMode + 1) % this.flashModes.length;
//     this.setState({ flashMode: newMode });
//   }

//   private clickPreview = () => {
//     this.props.navigation.navigate(PageKeys.preview, {
//       ...this.props,
//       images: this.state.data,
//       callback: this.onDeletePageFinish,
//     });
//   }

//   private clickCancel = () => {
//     if (this.props.maxSize <= 1 && this.state.isPreview) {
//       this.setState({
//         data: [],
//         isPreview: false,
//       });
//     } else {
//       this.onFinish([]);
//     }
//   }

//   private onWindowChanged = () => {
//     this.forceUpdate();
//   }
// }

// const topHeight = 60;
// const bottomHeight = 84;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   top: {
//     position: 'absolute',
//     height: topHeight,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     paddingHorizontal: 5,
//   },
//   topImage: {
//     margin: 10,
//     width: 27,
//     height: 27,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   bottom: {
//     position: 'absolute',
//     height: 84,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   takeView: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   takeImage: {
//     width: 64,
//     height: 64,
//     margin: 10,
//   },
//   buttonTouch: {
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     margin: 10,
//     height: 44,
//     lineHeight: 44,
//     fontSize: 16,
//     color: 'white',
//     backgroundColor: 'transparent',
//   },
//   previewTouch: {
//     marginLeft: 15,
//   },
//   previewView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 84,
//   },
//   previewImage: {
//     width: 50,
//     height: 50,
//   },
//   previewText: {
//     fontSize: 16,
//     marginLeft: 10,
//     color: 'white',
//     backgroundColor: 'transparent',
//   },
// });
