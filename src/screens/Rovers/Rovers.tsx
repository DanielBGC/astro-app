import { Text, View, StyleSheet } from 'react-native';

export const RoversScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Rovers Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
