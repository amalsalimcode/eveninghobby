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
}

export function getTopToolbarHeight() {
  return hasNotch() ? 80 : constants.windowHeight * 0.08
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

export function getFormattedDate(dt) {

  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  var dt_str = dt.getDate() + " " + monthNames[dt.getMonth()] + " " + dt.getFullYear()

  return dt_str

}

export function getFormattedDateAbbrev(dt) {

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  return dt.getDate() + " " + monthNames[dt.getMonth()]

}

export function getSQLformattedDate(arg) {

  if (!arg) {
    return arg
  }
  return arg.getFullYear() + "-" + checkPrependZero(arg.getMonth() + 1) + "-" + checkPrependZero(arg.getDate())
}

export const getColor = (value, defaultValue) => {
  if (value == defaultValue) {
    return ("rgb(150, 150, 150)")
  }
  else {
    return ("black")
  }
}

export function checkPrependZero(arg) {
  if (arg < 10) {
    return "0" + arg
  }
  return arg
}

export default constants
