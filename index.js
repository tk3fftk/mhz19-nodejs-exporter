'use strict';

const SerialPort = require('serialport');
const fs = require('fs').promises;
let serialPath = process.env.SERIAL_PATH || '/dev/serial0';
const readCO2Cmd = Buffer.from([
  0xff,
  0x01,
  0x86,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x79,
]);

(async () => {
  try {
    await fs.stat(serialPath);
  } catch (err) {
    console.error(err);
    process.exit(err.errno);
  }

  const port = new SerialPort(serialPath, {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
  });

  port.write(readCO2Cmd, (err) => {
    if (err) {
      console.error(err);
    }
  });

  port.on('data', (data) => {
    console.log(data);
  });
})();
