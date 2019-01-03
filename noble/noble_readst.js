// Connect to a peripheral running the echo service
// https://github.com/noble/bleno/blob/master/examples/echo

// subscribe to be notified when the value changes
// start an interval to write data to the characteristic

//const noble = require('noble');
const noble = require('noble');

const ECHO_SERVICE_UUID = '180f';
const ECHO_CHARACTERISTIC_UUID = '2a63';

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    console.log('Scanning');
    noble.startScanning([ECHO_SERVICE_UUID]);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', peripheral => {
    // connect to the first peripheral that is scanned
    noble.stopScanning();
    const name = peripheral.advertisement.localName;
    console.log(`Connecting to '${name}' ${peripheral.id}`);
    connectAndSetUp(peripheral);
});

function connectAndSetUp(peripheral) {

  peripheral.connect(error => {
    console.log('Connected to', peripheral.id);

    // specify the services and characteristics to discover
    const serviceUUIDs = [ECHO_SERVICE_UUID];
    const characteristicUUIDs = [ECHO_CHARACTERISTIC_UUID];

    peripheral.discoverSomeServicesAndCharacteristics(
        serviceUUIDs,
        characteristicUUIDs,
        onServicesAndCharacteristicsDiscovered
    );
  });
  
  peripheral.on('disconnect', () => console.log('disconnected'));
}

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
  console.log('Discovered services and characteristics');
  const echoCharacteristic = characteristics[0];

  // data callback receives notifications
  echoCharacteristic.on('data', (data, isNotification) => {
    console.log('Received: "' + data + '"');
  });
  
  // create an interval to send data to the service
  let count = 0;
setInterval(() => {
  const message = new Buffer('hello, ble ' + count, 'utf-8');
  console.log("Sending:  '" + message + "'");
  echoCharacteristic.write(message, (error)=>{
    console.log(error);
  });
}, 3000);

  setInterval(() => {
    count++;
 
    echoCharacteristic.read((error, data)=>{
      console.log(error);
      console.log(data);
    });

  }, 2500);
}