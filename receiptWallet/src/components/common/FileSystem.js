import * as FileSystem from 'expo-file-system';
import constants from "./constants"
import * as MediaLibrary from 'expo-media-library';

export const createImgDir = () => {
    console.log("Location of File System", FileSystem.documentDirectory)
    FileSystem.getInfoAsync(constants.rootDir).then(
        tmp => {
            if (!tmp.exists) {
                FileSystem.makeDirectoryAsync(constants.rootDir, { "intermediates": true })
            }
        }
    );
}

export async function saveImgToDir(uri) {
    let fileId = uri.split('/').pop();
    let newUri = constants.rootDir + "/" + fileId
    await FileSystem.copyAsync({ "from": uri, "to": newUri }).then(() => { })
}

export async function RetrieveImageBatch(startId) {

    let album = await MediaLibrary.getAlbumAsync("receiptWallet")
    if (!album) {
        return null
    }
    // MediaLibrary.deleteAlbumsAsync([album], true)

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
        MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
    }

    return asset
}