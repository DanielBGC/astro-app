import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
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
  return response.json();
};

export const ApodScreen = () => {
  const { setGlobalLoading } = useGlobalStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateString, setDateString] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const { data, error, isLoading } = useQuery<ApodDataInterface, Error>(['apod', dateString], () =>
    fetchAPOD(dateString),
  );

  React.useEffect(() => {
    if (data) {
      console.log({ data });
      const verifyVideo = data.url.includes('youtube');
      setIsVideo(verifyVideo);
    }
  }, [data]);

  React.useEffect(() => {
    console.log('isLoading: ', isLoading);

    setGlobalLoading(isLoading);
  }, [isLoading]);

  const handleDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setDateString(format(date, 'yyyy-MM-dd'));
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <CustomSafeAreaView style={styles.screenContainer}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Button title="Select Date" onPress={openDatePicker} />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={{ gap: 10 }}>
            <Text style={styles.title}>{data?.title}</Text>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Explanation: </Text>
              <Text style={{ fontSize: 16 }}>{data?.explanation}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Date: </Text>
              <Text style={{ fontSize: 16 }}>{data?.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Copyright: </Text>
              <Text style={{ fontSize: 16 }}>
                {data?.copyright ? data.copyright?.trim() : 'No Copyrights'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Media Type: </Text>
              <Text style={{ fontSize: 16 }}>{data?.media_type}</Text>
            </View>
          </View>

          {data?.media_type === 'video' ? (
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              Video format not yet supported. Please wait for new updates.{' '}
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
    backgroundColor: Colors.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    // marginVertical: 10,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
  },
});
