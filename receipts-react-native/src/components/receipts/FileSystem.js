import * as FileSystem from 'expo-file-system';
import constants from '../common/constants';

export const createImgDir = () => {
    console.log(FileSystem.documentDirectory)
    FileSystem.getInfoAsync(constants.rootDir).then(
        tmp => {
            if (!tmp.exists) {
                console.log("creating directory images")
                FileSystem.makeDirectoryAsync(constants.rootDir, { "intermediates": true })
            }
        }
    );
}

export async function saveImgToDir(uri){
    let filename = uri.split('/').pop();
    let newUri = constants.rootDir + "/" + filename
    console.log("new uri is", newUri)
    await FileSystem.moveAsync({"from": uri, "to": newUri}).then(() => {})
}