import React from 'react';
import {ActivityIndicator, StyleSheet, Text, ViewProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants';

type Props = {
  label: string;
  onPress: () => {};
  loading?: boolean;
} & ViewProps;

export function Button({label, onPress, loading, style, ...rest}: Props) {
  return (
    <TouchableOpacity onPress={onPress} testID="button">
      <LinearGradient
        {...rest}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
        style={[styles.container, style]}>
        {loading ? (
          <ActivityIndicator
            testID="button-loading"
            size={24}
            color={Colors.WHITE}
          />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: Colors.WHITE,
  },
});
