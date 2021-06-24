import React from 'react';
import {Text} from 'react-native';

export default function Card({data, onPress, width}) {
  return (
    <Text style={{backgroundColor: data.isUp ? 'red' : 'green', width: width}}>
      {data.value}
    </Text>
  );
}
