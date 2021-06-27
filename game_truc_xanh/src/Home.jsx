import React, {useEffect, useState} from 'react';

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
  TouchableOpacity,
} from 'react-native';
import Card from './Card';
const background = require('./assets/images/background.png');
const {width, height} = Dimensions.get('window');
const randomId = params => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
const MARGIN = {
  HORIZONTAL: 10,
  VERTICAL: 10,
};

const LAYOUT_SETTING = {
  ROW: 3,
  COLUMN: 6,
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const {width, height} = Dimensions.get('window');
  let interval;
  const arr = Array.from({length: 18}, (v, i) => {
    return {
      isUp: false,
      id: randomId(),
      value: i >= 9 ? i - 9 : i,
      isDisplay: true,
    };
  });

  const shuffle = array => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const [cards, setCards] = useState(shuffle(arr));
  const [time, setTime] = useState(5 * 60);
  const [enableCheck, setEnableCheck] = useState(false);
  useEffect(() => {
    interval = setInterval(() => {
      setTime(prevCount => prevCount - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval);
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    if (enableCheck) {
      if (checkValueOfCardsUp()) {
        setCards(
          cards.map(i => {
            return {...i, isUp: false, isDisplay: !i.isUp};
          }),
        );
      } else {
        setTimeout(() => {
          setCards(
            cards.map(i => {
              return {...i, isUp: false};
            }),
          );
        }, 300);
      }
      // setTimeout(() => {
      //   if (checkValueOfCardsUp) {
      //     setCards(
      //       cards.map(i => {
      //         if (i.isUp) {
      //           i.isDisplay = false;
      //           i.isUp = false;
      //         }

      //         return i;
      //       })
      //     )
      //   }
      // }, 300);
    }
  }, [enableCheck]);

  const checkValueOfCardsUp = () => {
    const cardsUp = cards.filter(i => i.isUp);
    console.log('check');
    if (cardsUp.length !== 2) {
      return false;
    }

    return cardsUp[0].value === cardsUp[1].value;
  };

  const handleOnPress = id => {
    const cardClicked = cards.find(i => {
      return i.id === id;
    });

    if (!cardClicked.isDisplay) {
      return false;
    }

    // Find cards are up
    const cardsUp = cards.filter(i => i.isUp);
    let newCards = [];
    // If there is no card, open current card
    // if (!cardsUp.length || cardsUp.length === 1) {
    newCards = cards.map(i => {
      if (i.id === id) {
        i.isUp = true;
      }

      return i;
    });
    // setEnableCheck(false)
    // } else {
    if (newCards.filter(i => i.isUp).length === 2) {
      setEnableCheck(true);
    } else {
      setEnableCheck(false);
    }
    // }

    setCards(newCards);

    // setCards(newCards);
  };

  const getPaddingHorizontal = () => {
    return insets.left > insets.right ? insets.left : insets.right;
  };

  const getPaddingVertical = () => {
    return insets.top > insets.bottom ? insets.top : insets.bottom;
  };

  const handleReset = params => {
    const newCards = cards.map(i => {
      (i.isUp = false), (i.isDisplay = true);
      return i;
    });
    setCards(shuffle(newCards));
  };

  /**
   * Width of each card , subtract the padding horizontal value, and margin
   * @param {*} params
   * @returns
   */
  const getWidthOfCard = params => {
    return (
      (width - getPaddingHorizontal() * 2) / LAYOUT_SETTING.COLUMN -
      MARGIN.HORIZONTAL * 2
    );
  };

  const getHeightOfCard = () => {
    return (
      (height - getPaddingVertical() * 2) / LAYOUT_SETTING.ROW -
      MARGIN.VERTICAL * 2
    );
  };

  const getTimeByHm = () => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return minutes + ':' + seconds;
  };

  return (
    <View>
      <ImageBackground source={background} style={styles.background}>
        <Text style={{textAlign: 'center'}}>{getTimeByHm()}</Text>
        <View
          style={{
            paddingHorizontal: getPaddingHorizontal(),
            paddingVertical: getPaddingVertical(),
            ...styles.viewContainer,
            ...styles.cardWrap,
          }}>
          {cards.map(card => (
            <Card
              width={getWidthOfCard()}
              height={getHeightOfCard()}
              data={card}
              key={card.id}
              onPress={() => handleOnPress(card.id)}
            />
          ))}
        </View>
        {/* <TouchableOpacity onPress={handleReset} style="text-center">
          <Text style={{color: 'red', textAlign: 'center'}}>Reset</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  cardWrap: {
    width: width,
    height: height - 30,
  },
  viewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
