/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {getSizeByHeight, getSizeByWidth} from './helper';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const items = [
    {
      title: '',
    },
  ];
  const backgroundStyle = {
    backgroundColor: '#ffffff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.section}>
          <Text style={styles.bigTitle}>Special Delivery</Text>
          <Item />
          <Item />
          <Item isLast={true} />
        </View>
        <View style={styles.section}>
          <Text style={styles.bigTitle}>Special Delivery</Text>
          <Item />
          <Item />
          <Item isLast={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Item = ({isLast = false}) => {
  return (
    <View style={styles.item}>
      <View
        style={isLast ? styles.itemWithoutBorderBottom : styles.borderBottom}>
        <Image
          source={require('./assert/images/item01.png')}
          style={styles.image}
        />
        <View>
          <View style={styles.itemRowTitle}>
            <Text style={styles.itemTitle}>Shrimp Pizza</Text>
            <Text>KCal: 475</Text>
          </View>
          <View style={styles.itemText}>
            <Text>Shrimp, mushroom, cheese, tomato</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.textOrange}>$12.41</Text>
            <Text style={styles.textStrike}>$25.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  section: {
    paddingTop: getSizeByHeight(24),
    paddingBottom: getSizeByHeight(10),
    marginBottom: getSizeByHeight(10),
    backgroundColor: '#ffffff',
    borderBottomWidth: 10,
    borderBottomColor: '#efefef',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    paddingHorizontal: getSizeByWidth(24),
  },
  image: {
    marginRight: getSizeByWidth(16),
    width: 74,
    height: 74,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#4F585E',
    fontSize: 16,
    lineHeight: 16,
    marginRight: getSizeByWidth(15),
  },
  itemText: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 'auto',
  },
  itemRowTitle: {
    marginBottom: getSizeByHeight(2),
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  borderBottom: {
    paddingVertical: getSizeByHeight(16),
    flexDirection: 'row',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  itemWithoutBorderBottom: {
    paddingVertical: getSizeByHeight(16),
    flexDirection: 'row',
  },
  textOrange: {
    color: '#FB6D3B',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: getSizeByWidth(15),
  },
  textStrike: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bigTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: getSizeByWidth(24),
  },
});

export default App;
