#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"
export PATH="$ANDROID_HOME/platform-tools:/opt/homebrew/bin:/usr/local/bin:$PATH"

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found. Install Android platform-tools first."
  exit 1
fi

if ! command -v appium >/dev/null 2>&1; then
  echo "appium not found. Install Appium first."
  exit 1
fi

echo "Starting Appium on http://127.0.0.1:4723"
appium server --address 127.0.0.1 --port 4723 --log-level info
