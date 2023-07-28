const hid = require('node-hid');

let Blync = {
  getDevices: function ()
  {
    let devices = hid.devices();

    devices = devices.filter(function (device) {
      //Blynclight Mini = vid_2c0d&pid_000a;
      return device.path.indexOf("vid_2c0d&pid_000a") !== -1
    });

    devices = devices.map(function (dev) {
      return new Blync.Device(new hid.HID(dev.path));
    });

    return devices;
  },

  getDevice: function (index)
  {
    index = +index || 0;

    let devices = this.getDevices();

    if (index < 0) {
      throw new Error("Invalid device index");
    }

    if (index >= devices.length) {
      throw new Error("Device index #"+index+" not found");
    }

    return devices[index];
  }
};

Blync.Device = require('./device').Device;

module.exports = Blync;