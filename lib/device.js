let Device = function (hidDevice) {
  this.hidDevice = hidDevice;
};

Device.colors = {
  white: [255,255,255],
  blue: [0,0,255],
  green: [0,255,0],
  red: [255,0,0],
  yellow: [255,255,0],
  cyan: [0,255,255],
  magenta: [255,0,255]
};

Device.controls = {
  blinkslow: 12,
  blinkfast: 36,
  blinknormal: 20,
  on: 0,
  off: 1,
  dim: 2
};

Device.prototype.setColor = function (color, control) {
  if ("undefined" === typeof Device.colors[color] || "undefined" === typeof Device.controls[control]) {
    throw new Error("Unknown color : " + color + " or control : " + control);
  }

  this.sendCommand(
      Device.colors[color][0],
      Device.colors[color][1],
      Device.colors[color][2],
      Device.controls[control]
  );
};

Device.prototype.setRGB = function (red, green, blue, control) {
  if ("undefined" === typeof Device.controls[control]) {
    throw new Error("Unknown control : " + control);
  }
  if (red > 255 || red < 0) {
    throw new Error("Your value should be [0:255] - Current : " + red);
  }
  if (green > 255 || green < 0) {
    throw new Error("Your value should be [0:255] - Current : " + green);
  }
  if (blue > 255 || blue < 0) {
    throw new Error("Your value should be [0:255] - Current : " + red);
  }

  this.sendCommand(
      red,
      green,
      blue,
      Device.controls[control]
  );
};

Device.prototype.sendCommand = function (red, green, blue, control) {
  const reportBuffer = Buffer.alloc(9);

  reportBuffer[0] = 0x00;
  reportBuffer[1] = red;
  reportBuffer[2] = blue;
  reportBuffer[3] = green;
  reportBuffer[4] = control;
  reportBuffer[5] = 0;
  reportBuffer[6] = 0;
  reportBuffer[7] = 0xFF;
  reportBuffer[8] = 0x22;

  // Send the report to the HID device
  this.hidDevice.write(reportBuffer);
};

Device.prototype.turnOff = function () {
  this.sendCommand(0,0,0,1);
};

Device.prototype.turnOn = function () {
  this.sendCommand(0,0,0,0);
};

exports.Device = Device;