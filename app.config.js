import 'dotenv/config';
export default {
  "expo": {
    "name": "radicle-driver-app",
    "slug": "radicle-driver-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#449342"
    },
    "androidStatusBar": {
      "backgroundColor": "#449342",
      "translucent": false
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "config": {
        "usesNonExemptEncryption": false,
        "googleMapsApiKey": process.env.API_KEY_MAP
      },
      "bundleIdentifier": "com.radicle.driver",
      "useFrameworks": "static",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.jpg",
        "backgroundColor": "#ffffff"
      },
      "package": "com.radicle.driver",
      googleServicesFile: "./google-services.json",
      "config": {
        "googleMaps": {
          "apiKey": process.env.API_KEY_MAP
        }
      },
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE"
      ]
    },
    "plugins": ["@react-native-firebase/app",
    "@notifee/react-native",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "65928077-66fe-4e36-9d0e-dfc26af5e2c2"
      }
    }
  }
}
