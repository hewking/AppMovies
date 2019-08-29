import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import PageKeys from './pageKeys';
import PhotoModalPage from './photoModalPage';
// import CameraView from './cameraView';
import AlbumListView from './albumListView';
import AlbumView from './albumView';
import PreviewMultiView from './previewMultiView';

/**
 * --OPTIONS--
 * maxSize?: number. Camera or Video.
 * sideType?: RNCamera.Constants.Type. Camera or Video.
 * flashMode?: RNCamera.Constants.FlashMode. Camera or Video.
 * pictureOptions?: RNCamera.PictureOptions. Camera.
 * recordingOptions?: RNCamera.RecordingOptions Video.
 * callback: (data: any[]) => void. Donot use Alert.
 */

// export const getCamera = (options) => showImagePicker(PageKeys.camera, { ...options, isVideo: false });
// export const getVideo = (options) => showImagePicker(PageKeys.camera, { ...options, isVideo: true });
export const getAlbum = (options) => showImagePicker(PageKeys.album_list, options);

let sibling: any;

function showImagePicker(initialRouteName, options) {
  if (sibling) {
    return null;
  }
  sibling = new RootSiblings(
    <PhotoModalPage
      initialRouteName={initialRouteName}
      onDestroy={() => {

        if (sibling) {
          sibling.destroy();
        }
        sibling = null;
      }}
      {...options}
    />
  );
}

export {
  PhotoModalPage,
  // CameraView,
  PreviewMultiView,
  AlbumListView,
  AlbumView,
};
