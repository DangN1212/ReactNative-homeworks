import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';

export const imgBack = require('./assets/images/back.png');
export const imgArr = [
  require('./assets/images/card1.png'),
  require('./assets/images/card2.png'),
  require('./assets/images/card3.png'),
  require('./assets/images/card4.png'),
  require('./assets/images/card5.png'),
  require('./assets/images/card6.png'),
  require('./assets/images/card7.png'),
  require('./assets/images/card8.png'),
  require('./assets/images/card9.png'),
];

export default function Card({
  data,
  onPress,
  width,
  height,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
    <Image
      source={data.isUp ? imgArr[data.value] : imgBack}
      style={{
        height: height,
        width: width,
        margin: 5,
        opacity: data.isDisplay ? 1 : 0,
      }}
    />
    </TouchableOpacity>
  );
}
