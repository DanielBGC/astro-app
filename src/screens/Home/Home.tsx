import { Colors } from '@consts/consts';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GALAXY = require('@assets/images/galaxy.png');

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View
          style={{
            gap: 10,
            marginBottom: 30,
            padding: 8,
          }}
        >
          <Text style={styles.screenText}>
            If you're an astronomy enthusiast and fascinated by the mysteries of the universe, this
            app is perfect for you!
          </Text>
          <Text style={styles.screenText}>
            Our goal is to provide a rich and immersive experience, connecting you to a vast array
            of cosmic data. Leveraging public APIs from NASA's catalog, the app allows you to
            explore a wealth of information and images, such as data on comets, measurements from
            Mars, and even real-time imagery of Earth.
          </Text>
          <Text style={styles.screenText}>
            Our goal is to provide a rich and immersive experience, connecting you to a vast array
            of cosmic data. Leveraging public APIs from NASA's catalog, the app allows you to
            explore a wealth of information and images, such as data on comets, measurements from
            Mars, and even real-time imagery of Earth.
          </Text>
          <Text style={styles.screenText}>
            With an intuitive interface and up-to-date information, you'll have the universe at your
            fingertips!
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.purple,
              borderRadius: 4,
            }}
          >
            <Image
              source={GALAXY}
              style={{
                width: '100%',
                height: 200,
              }}
            ></Image>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    paddingHorizontal: 8,
  },
  screenText: {
    fontSize: 22,
    textAlign: 'justify',
    color: Colors.white,
  },
});
