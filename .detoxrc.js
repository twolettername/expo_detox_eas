module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  skipLegacyWorkersInjection: true,
  detox: {
    behavior:{
      init: {
        exposeGlobals: true
      }
    }
  },
  artifacts: {
    rootDir: "e2e/.artifacts/",
    plugins: {
      log: {
        enabled: true
      },
      screenshot: {
        enabled: true,
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true
      },
      video: {
        android: {
          bitRate: 4000000
        },
        simulator: {
          codec: "hevc"
        }
      }
    }
  },
  apps: {
    "ios:debug": {
      type: "ios.app",
      binaryPath: "e2e/builds/ios.app",
      build: "eas build --local --platform ios --profile e2e:debug --non-interactive --output e2e/builds/ios.tar.gz && tar -xf e2e/builds/ios.tar.gz"
    },
    "android:debug": {
      type: "android.apk",
      binaryPath: "e2e/builds/android.apk",
      build: "bash scripts/build-android.sh"
    }
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: process.env.DETOX_IOS_SIMULATOR || "iPhone 11"
      }
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: process.env.DETOX_ANDROID_AVD || "Pixel_3a_API_30_x86"
      }
    }
  },
  configurations: {
    "ios:debug": {
      device: "simulator",
      app: "ios:debug"
    },
    "android:debug": {
      device: "emulator",
      app: "android:debug"
    }
  }
}