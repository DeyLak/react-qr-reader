"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoVideoInputDevicesError = NoVideoInputDevicesError;

function NoVideoInputDevicesError() {
  this.name = 'NoVideoInputDevicesError';
  this.message = 'No video input devices found';
}

NoVideoInputDevicesError.prototype = new Error();