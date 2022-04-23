#!/bin/bash

set -e

expo prebuild --clean -p android

eas build --local --platform android --profile e2e:debug --non-interactive --output e2e/builds/android.apk

pushd android

./gradlew \
  assembleAndroidTest \
  -DtestBuildType=debug \
  -Pandroid.injected.signing.store.file="$PWD/app/debug.keystore" \
  -Pandroid.injected.signing.store.password="android" \
  -Pandroid.injected.signing.key.alias="androiddebugkey" \
  -Pandroid.injected.signing.key.password="android"

popd android

echo "BIG LS BELOW!!!!"

ls "$PWD/app/build/outputs/apk/androidTest"


echo "BIG LS ABOVEEEE!!!!"

mv "$PWD/app/build/outputs/apk/androidTest/*.apk" e2e/builds/