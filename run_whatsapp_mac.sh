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

if ! adb devices -l | awk 'NR > 1 && $2 == "device" { found=1 } END { exit found ? 0 : 1 }'; then
  echo "No authorized Android device found. Enable USB debugging and accept the trust prompt on your phone."
  adb devices -l
  exit 1
fi

python3 whatsapp.py --port "${APPIUM_PORT:-4723}"
