"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceId = getDeviceId;
exports.getFacingModePattern = void 0;

var _errors = require("./errors");

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
  if (filteredDevices.length > 0) {
    return filteredDevices[0].deviceId;
  }

  if (videoDevices.length == 1 || facingMode == 'user') {
    return videoDevices[0].deviceId;
  }

  return videoDevices[1].deviceId;
}

var getFacingModePattern = function getFacingModePattern(facingMode) {
  return facingMode == 'environment' ? /rear|back|environment/ig : /front|user|face/ig;
};

exports.getFacingModePattern = getFacingModePattern;

function getDeviceId(facingMode) {
  var chooseDeviceId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDeviceIdChooser;
  // Get manual deviceId from available devices.
  return new Promise(function (resolve, reject) {
    var enumerateDevices;

    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new _errors.NoVideoInputDevicesError());
    }

    enumerateDevices.then(function (devices) {
      // Filter out non-videoinputs
      var videoDevices = devices.filter(function (device) {
        return device.kind == 'videoinput';
      });

      if (videoDevices.length < 1) {
        reject(new _errors.NoVideoInputDevicesError());
        return;
      }

      var pattern = getFacingModePattern(facingMode); // Filter out video devices without the pattern

      var filteredDevices = videoDevices.filter(function (_ref) {
        var label = _ref.label;
        return pattern.test(label);
      });
      resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode));
    });
  });
}