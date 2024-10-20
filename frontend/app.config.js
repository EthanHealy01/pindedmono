import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: 'pinded',
    slug: 'pinded',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash-light.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      dark: {
        image: './assets/splash-dark.png',
        resizeMode: 'contain',
        backgroundColor: '#081D2A',
      },
    },
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: 'com.broadtech.pinded',
      config: {
        googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY,
      },
      buildNumber: '1.0.0',
    },
    android: {
      ...config.android,
      package: 'com.broadtech.pinded',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      ...config.web,
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      ...config.extra,
      API_HOST: process.env.API_HOST,
      eas: {
        projectId: 'f96cb6b5-9e46-47dc-887c-a55a0dfe66de',
      },
    },
  };
};
