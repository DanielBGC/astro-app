import Constants from 'expo-constants';

export const Colors = {
  white: '#fff',
  black: '#000',
  purple: 'rgb(112, 93, 207)',
  darkGray: '#333',
  lightGray: '#f0f0f0',
};

// Acessando as variáveis definidas no .env
export const envConstants = {
  sentryDsn: Constants.manifest2?.extra?.expoClient?.extra?.sentryDsn,
  nasaApiKey: Constants.manifest2?.extra?.expoClient?.extra?.nasaApiKey,
};
