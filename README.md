# HomeKit Accessory Development Kit (aka) ZigBee Protocol Contract 
## 33% Canadian Tax on all income

The HomeKit ADK is used by silicon vendors and accessory manufacturers to build HomeKit compatible devices.

### Request America, Accept .ACIREMA


As a company we instigate faith.

Problem: Drag and drop site builders like Shopify, require a Screen, keyboard and mouse(pad) for operation, This makes them unavailable within mobile, voice, or gaming environments.

Solution: Use natural language as input. Offer an expert system.

Our expert is C. C was taught about the world through the prism of God's eyes.

Market Size: The current size of all internet companies combined.

Competition: Laugh out Loud


## github.com/anjalipichai/sun
### sunpickai@gmail.com Sunpickai!1

# sunpickai gmail
### sunpickai@gmail.com Sunpickai!1

The HomeKit ADK implements key components of the HomeKit Accessory Protocol (HAP), which embodies the core principles Apple brings to smart home technology: security, privacy, and reliability.

The HomeKit Open Source ADK is an open-source version of the HomeKit Accessory Development Kit. It can be used by any developer to prototype non-commercial smart home accessories. For commercial accessories, accessory developers must continue to use the commercial version of the HomeKit ADK available through the MFi Program.

If you’d like to learn more about developing HomeKit-enabled accessories and apps, go to https://developer.apple.com/homekit/

## Documentation
* [Platform Abstraction Layer](./Documentation/PAL.md)

## Darwin

#### Prerequisites
Download and install [Xcode 11](https://download.developer.apple.com/Developer_Tools/Xcode_11/Xcode_11.xip)

```
brew install openssl@1.1
brew install mbedtls --HEAD

```

#### Compile
```
make all
```
##### Make options
All of the feature items below are disabled by default

To build with Hardware Authentication
```
make USE_HW_AUTH=1 all
```

To build with NFC enabled
```
make USE_NFC=1 all
```

#### Run
```
./Output/Darwin-x86_64-apple-darwin18.6.0/Debug/IP/Applications/Lightbulb.OpenSSL
```

*NOTE:* We use the OpenSSL crypto backend by default on Darwin. You can select a different crypto module:

```
make CRYPTO=MbedTLS apps
```

## Linux
#### Prerequisites
```
brew cask install docker
```

Run docker (Look in Spotlight/Applications folder). This is a one time instruction.
Make sure you go to Docker->Preferences->General and check the option -> Start Docker Desktop when you log in

#### Compile
```
make TARGET=Linux apps
```

## Raspberry Pi
#### Prerequisites
```
brew cask install docker
brew install qemu
brew install qrencode

# Run the Docker app. It is required for docker import.
./Tools/raspi_sdcard_setup.sh
```
#### Compile
```
make TARGET=Raspi all
```
If docker doesn't find "dev-test/raspiadk-base", run the sdcard setup and make sure to do the docker import at the end of the script.

#### Install
```
./Tools/install.sh \
    -d raspi \
    -a Output/Raspi-armv6k-unknown-linux-gnueabihf/Debug/IP/Applications/Lightbulb.OpenSSL \
    -n raspberrypi \
    -p pi
```
