import { Colors } from '@consts/consts';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';

export const LoadingSpinner = () => {
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View style={styles.container}>
        <Text>
          <ActivityIndicator size="large" color={Colors.purple} />
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    opacity: 0.8,
  },
});
