import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'astro-app',
  slug: 'astro-app',
  version: '1.0.0',
  owner: 'danielbgc',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'android.danielbgc.astroapp',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        url: 'https://sentry.io/',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '59c62513-57e1-47c9-8ab6-1d9a38b0655f',
    },
    sentryOrg: process.env.SENTRY_ORG,
    sentryProject: process.env.SENTRY_PROJECT,
    sentryDsn: process.env.SENTRY_DSN,
    nasaApiKey: process.env.NASA_API_KEY,
  },
});
