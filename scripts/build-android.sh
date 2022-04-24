#!/bin/bash

set -e

expo prebuild --clean -p android

eas build --local --platform android --profile e2e:debug --non-interactive --output e2e/builds/android-debug.apk

pushd android

./gradlew \
  assembleAndroidTest \
  -DtestBuildType=debug \
  -Pandroid.injected.signing.store.file="$PWD/app/debug.keystore" \
  -Pandroid.injected.signing.store.password="android" \
  -Pandroid.injected.signing.key.alias="androiddebugkey" \
  -Pandroid.injected.signing.key.password="android"

popd

ls "$PWD/android/app/build/outputs/apk/androidTest/debug/"
echo "LS RESULT ^^"

ls "$GITHUB_WORKSPACE/e2e/builds/"
echo "LS REUSLT ^^^^^^"

mv "$PWD/android/app/build/outputs/apk/androidTest/debug/*" "$GITHUB_WORKSPACE/e2e/builds/"