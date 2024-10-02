import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useQuery } from 'react-query';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { Colors, envConstants } from '@consts/consts';

import { useGlobalStore } from '@store/store';
import { ApodDataInterface } from 'src/types/types';

import { CustomSafeAreaView } from '@components/CustomSafeAreaView/CustomSafeAreaView';

const fetchAPOD = async (date: string): Promise<ApodDataInterface> => {
  const fetchUrl = `https://api.nasa.gov/planetary/apod?api_key=${envConstants.nasaApiKey}&date=${date}`;
  console.log('fetchUrl: ', fetchUrl);

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const rateLimitLimit = response.headers.get('x-ratelimit-limit');
  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');

  console.log(`x-ratelimit-limit: ${rateLimitLimit}`);
  console.log(`x-ratelimit-remaining: ${rateLimitRemaining}`);

  return response.json();
};

export const ApodScreen = () => {
  const { setGlobalLoading } = useGlobalStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateString, setDateString] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data, error, isLoading } = useQuery<ApodDataInterface, Error>(['apod', dateString], () =>
    fetchAPOD(dateString),
  );

  React.useEffect(() => {
    if (data) {
      console.log({ data });
    }
  }, [data]);

  React.useEffect(() => {
    console.log('isLoading: ', isLoading);

    setGlobalLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (error) {
      Alert.alert(error.toString());
    }
  }, [error]);

  const handleDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowDatePicker(false);

    if (date) {
      if (date > new Date()) {
        Alert.alert('Cannot select a date greater than the current date');
        return false;
      }

      setSelectedDate(date);
      setDateString(format(date, 'yyyy-MM-dd'));
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <CustomSafeAreaView style={styles.screenContainer}>
      <ScrollView style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              gap: 10,
            }}
          >
            <Text style={{ marginBottom: 10, color: Colors.white, fontSize: 16, flex: 2 }}>
              Change the date to fetch images from other days.
            </Text>
            <TouchableOpacity style={styles.dateButton} onPress={openDatePicker}>
              <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 700 }}>
                Select Date
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderColor: Colors.white,
            }}
          >
            <Text style={styles.labelValue}>Selected Date: </Text>
            <Text style={styles.textValue}>{format(selectedDate, 'dd/MM/yyyy')}</Text>
          </View>

          <View style={{ gap: 4 }}>
            <Text style={styles.title}>{data?.title}</Text>
            <View>
              <Text style={styles.labelValue}>Explanation: </Text>
              <Text style={styles.textValue}>{data?.explanation}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.labelValue}>Copyright: </Text>
              <Text style={styles.textValue}>
                {data?.copyright ? data.copyright?.trim() : 'No Copyrights'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.labelValue}>Media Type: </Text>
              <Text style={styles.textValue}>{data?.media_type}</Text>
            </View>
          </View>

          {data?.media_type === 'video' ? (
            <Text style={{ fontSize: 16, marginTop: 10, color: Colors.white }}>
              Video format not yet supported. Please wait for new updates.
            </Text>
          ) : (
            <View
              style={{
                borderWidth: 3,
                borderColor: Colors.purple,
                borderRadius: 4,
                marginTop: 10,
              }}
            >
              <Image source={{ uri: data?.url }} style={styles.image} />
            </View>
          )}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.darkGray,
  },
  dateButton: {
    backgroundColor: Colors.purple,
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textShadowColor: Colors.purple,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  labelValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    textShadowColor: Colors.purple,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  textValue: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 300,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
  },
});
