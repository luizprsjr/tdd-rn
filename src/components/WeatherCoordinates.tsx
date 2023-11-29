import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './Button';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../constants';
import Yup from 'json-schema-yup-transformer/dist/yup/addMethods';
import {yupResolver} from '@hookform/resolvers/yup';

type FormValues = {
  latitude: number;
  longitude: number;
};

export function WeatherCoordinates() {
  const navigation = useNavigation();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(values => {
    navigation.navigate('Weather', values);
  });

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          name="latitude"
          render={({field, ...props}) => (
            <TextInput
              {...props}
              testID="weather-coordinates-latitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lat"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          control={form.control}
          name="longitude"
          render={({field, ...props}) => (
            <TextInput
              {...props}
              testID="weather-coordinates-longitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lon"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.formState.errors.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>

      <Button onPress={handleSubmit} label="find" />
    </View>
  );
}

const defaultValues: FormValues = {
  latitude: 0,
  longitude: 0,
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().required().min(-90).max(90),
  longitude: Yup.number().required().min(-180).max(180),
});

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});
