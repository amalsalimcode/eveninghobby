import { Dimensions } from "react-native";

let constants = {
  diffDays: 7,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  ngrokHost: "https://73702b9799fd.ngrok.io/"
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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