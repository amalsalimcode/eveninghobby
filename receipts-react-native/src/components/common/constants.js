import { Dimensions } from "react-native";
import * as Device from 'expo-device';
import * as FileSystem from 'expo-file-system';


let constants = {
  diffDays: 7,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  ngrokHost: "http://161502d548d0.ngrok.io/",
  // ngrokHost: "http://127.0.0.1:8000/",
  model: Device.modelName,
  rootDir: FileSystem.documentDirectory + "images",
  disableBackend: true,

  textInput: {
    height: 35,
    borderColor: "#000000",
    borderBottomWidth: 1,
  },

}

export function getTopToolbarHeight() {
  return hasNotch() ? 100 : constants.windowHeight * 0.1
}

export function getBottomToolbarHeight() {
  return hasNotch() ? 70 : 55
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function hasNotch() {
  var conditions = ["iPhone 11", "iPhone X"]
  var hasNotch = conditions.some(el => constants.model.includes(el));
  return hasNotch
}

export function getFormattedDate(dt, skipYear) {

  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  var dt_str = dt.getDate() + " " + monthNames[dt.getMonth()]
  if (!skipYear) {
    dt_str += " " + dt.getFullYear()
  }

  return dt_str

}

export default constants
