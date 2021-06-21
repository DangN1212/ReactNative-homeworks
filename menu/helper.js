import {Dimensions} from 'react-native';

const getSizeByWidth = size => {
  return (Dimensions.get('window').width / 375) * size;
};

const getSizeByHeight = size => {
  return (Dimensions.get('window').height / 812) * size;
};

export {getSizeByHeight, getSizeByWidth};
