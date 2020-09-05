import * as FileSystem from 'expo-file-system';
import constants from "./constants"

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

export async function saveImgToDir(uri){
    let filename = uri.split('/').pop();
    let newUri = constants.rootDir + "/" + filename
    await FileSystem.copyAsync({"from": uri, "to": newUri}).then(() => {})
}