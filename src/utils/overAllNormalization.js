/* eslint-disable prettier/prettier */
import DeviceInfo from 'react-native-device-info';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const tabletSize = size => {
  let _width = width > height ? width : height;
  _width = height;
  if (Platform.OS == 'ios') {
    return (parseInt(size) * _width) / 1050;
  }
  return (parseInt(size) * _width) / 1100;
};
const moderateScale = size =>
  DeviceInfo.getDeviceType() === 'Tablet'
    ? tabletSize(size)
    : (parseInt(size) * width) / 420;

export {moderateScale};
