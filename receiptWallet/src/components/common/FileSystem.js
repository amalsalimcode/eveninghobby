import * as FileSystem from 'expo-file-system';
import constants from "./constants"
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

export const createImgDir = () => {
    FileSystem.getInfoAsync(constants.rootDir).then(
        tmp => {
            if (!tmp.exists) {
                FileSystem.makeDirectoryAsync(constants.rootDir, { "intermediates": true })
            }
        }
    );
}

export async function saveImgToDir(uri) {
    let fileuri = uri.split('/').pop();
    let newUri = constants.rootDir + "/" + fileuri
    await FileSystem.copyAsync({ "from": uri, "to": newUri }).then(() => { })
}

export async function deleteAllPhotos() {
    let album = await MediaLibrary.getAlbumAsync("receiptWallet")
    if (!album) {
        return null
    }
    MediaLibrary.deleteAlbumsAsync([album], true)
}

export async function RetrieveImageBatch(startId) {

    let album = await MediaLibrary.getAlbumAsync("receiptWallet")
    if (!album) {
        return null
    }

    let options = { "first": 20, "album": album, "sortBy": ["creationTime"] }
    if (startId) {
        options["after"] = startId
    }
    let assets = await MediaLibrary.getAssetsAsync(options)
    return assets
}

export async function addPhotoToAlbum(uri) {
    let asset = await MediaLibrary.createAssetAsync(uri);
    let album = await MediaLibrary.getAlbumAsync("receiptWallet")
    if (!album) {
        MediaLibrary.createAlbumAsync("receiptWallet", asset)
    } else {
        MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
    }

    return asset
}

export async function deletePhotoFromAlbum(fileId) {
    if (Platform.OS == "ios") {
        MediaLibrary.deleteAssetsAsync(fileId)
        return
    }
    let album = await MediaLibrary.getAlbumAsync("receiptWallet")
    for (let idx = 0; idx < fileId.length; idx++) {
        let x = await MediaLibrary.getAssetInfoAsync(fileId[idx].toString())
        MediaLibrary.removeAssetsFromAlbumAsync(x, album)
        MediaLibrary.deleteAssetsAsync(fileId[idx])
    }
}