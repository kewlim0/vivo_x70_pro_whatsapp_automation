# Mac Setup

This project can run on macOS through the Python scripts. The Windows `.bat` files and bundled `adb.exe` are not used on Mac.

## 1. Connect Android Phone

Enable Developer Options and USB debugging on the phone, connect it with a data-capable USB-C cable, then accept the USB debugging trust prompt.

Verify:

```bash
adb devices -l
```

The phone must show as `device`.

## 2. Install Python Dependencies

```bash
cd "/Users/admin/Downloads/whatsapp-automation-mobile-main 3"
python3 -m pip install -r requirements.txt
```

## 3. Start Appium

In Terminal 1:

```bash
cd "/Users/admin/Downloads/whatsapp-automation-mobile-main 3"
./start_appium_mac.sh
```

## 4. Run Automation

In Terminal 2:

```bash
cd "/Users/admin/Downloads/whatsapp-automation-mobile-main 3"
./run_whatsapp_mac.sh
```

When the device configuration menu appears, pick the matching phone model if listed. Pressing ENTER now uses the first listed config instead of crashing.
