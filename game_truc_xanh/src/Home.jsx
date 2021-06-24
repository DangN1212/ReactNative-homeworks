import React, {useState} from 'react';

import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Card from './Card'
const background = require('./assets/images/background.png');
const {width, height} = Dimensions.get('window');
const randomId = params => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
export default function Home() {
  const insets = useSafeAreaInsets();

  const arr = Array.from({length: 24}, () => {
    return {
      isUp: false,
      id: randomId(),
      value: 0,
    };
  });

  const [cards, setCards] = useState(arr);

  const handleOnPress = id => {
    const newCards = cards.map(card => {
      if (card.id === id) {
        return {
          ...card,
          isUp: true,
        };
      }

      return card;
    });

    setCards(newCards);
  };
  return (
    <View style={{paddingBottom: Math.max(insets.bottom, 16)}}>
      <ImageBackground source={background} style={styles.background}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {cards.map(card => (
            <Card
              width={width / 8 - 10}
              data={card}
              key={card.id}
              onPress={() => handleOnPress(card.id)}
            />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  background: {
    width: width,
    height: height,
  },
});
