const { InfluxDB, Point, setLogger } = require('@influxdata/influxdb-client');
const dht11 = require("node-dht-sensor").promises;
require('dotenv').config();

// You can generate a Token from the "Tokens Tab" in the UI
const token = process.env.TOKEN;
const org = process.env.ORG;
const bucket = process.env.BUCKET;

const client = new InfluxDB({ url: process.env.URL, token: token });

const writeApi = client.getWriteApi(org, bucket);

const pins = [4, 17];

const saveDatapoint = (data, sensorName) => {
  console.log(`setting point for ${sensorName} (${data.temperature.toFixed(0)}c; ${data.humidity.toFixed(0)}%)`);

  const temp = new Point('sensors')
    .tag('sensor', sensorName)
    .floatField('temp', data.temperature.toFixed(2));

  const humidity = new Point('sensors')
    .tag('sensor', sensorName)
    .floatField('hum', data.humidity.toFixed(2));

  writeApi.writePoint(temp);
  writeApi.writePoint(humidity);
};

const run = () => {

  // fetch temp and humidity from each sensor
  pins.forEach(pin => {
    
    dht11.read(11, pin).then(res => {
      saveDatapoint(res, pin);
    }).catch(e => {
      console.error('error occured for sensor ' + pin);
      console.error(e);
    });

  });

};

setInterval(run, 3000);
