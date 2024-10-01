import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

import { Home } from '@screens/Home/Home';

// Acessando as variáveis definidas no .env
const sentryDsn = Constants.manifest2?.extra?.expoClient?.extra?.sentryDsn;

Sentry.init({
  dsn: sentryDsn,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Home />
    </View>
  );
}

export default Sentry.wrap(App);
