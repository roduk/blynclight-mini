# Blynclight Mini for NodeJS

This unofficial library allows control of the [Blynclight Mini](https://embrava.com/products/blynclight-mini) device.

This module has only been tested on Windows 10 (x64).

[Official Blynclight SDK](https://www.embrava.com/pages/embrava-software-sdk)

Forked from:
- [node-blync-USB30](https://github.com/julienstroheker/node-blync-USB30)
- [node-blync](https://github.com/justmoon/node-blync)

### Usage
```sh
npm install node-blynclight-mini
```

``` js
const blync = require('blynclight-mini');

let device;

try {
    device = blync.getDevice(0);
} catch (error) {
    throw new Error(error);
}

// Static colors
device.setColor('white', 'on');
device.setColor('red', 'on');
device.setColor('blue', 'on');
device.setColor('green', 'on');

// Colors & effects
device.setColor('green', 'dim');
device.setColor('green', 'blinkveryfast');
device.setColor('green', 'blinkfast');
device.setColor('green', 'blinknormal');

// Turn light off (any color is valid).
device.setColor('green', 'off');
```
