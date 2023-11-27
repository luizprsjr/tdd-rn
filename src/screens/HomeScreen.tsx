import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants';
import moment from 'moment';

export function HomeScreen() {
  const now = moment(new Date());
  return (
    <LinearGradient
      testID="home-screen"
      colors={[Colors.LIGHT_GRAY, Colors.DARK_GRAY]}
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{now.format('dddd')}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  title: {
    justifyContent: 'flex-end',
  },
  date: {
    color: Colors.GRAY,
    fontSize: 16,
  },
  day: {
    color: Colors.WHITE,
    fontSize: 24,
  },
});
