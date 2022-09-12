const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const dht11 = require("node-dht-sensor").promises;
require('dotenv').config();

// You can generate a Token from the "Tokens Tab" in the UI
const token = process.env.TOKEN;
const org = process.env.ORG;
const bucket = process.env.BUCKET;

const client = new InfluxDB({ url: process.env.URL, token: token });
// dht11.initialize({
//   test: {
//     fake: {
//       temperature: 21,
//       humidity: 60
//     }
//   }
// });

const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({ host: 'host1' });

const mockData = () => {

  // fetch temp and humidity from dht11
  dht11.read(11, 4).then(res => {
    const temp = new Point('sensors')
    .floatField('temp', res.temperature.toFixed(2));
    
    const hum = new Point('sensors')
      .floatField('hum', res.humidity.toFixed(2));
    
    writeApi.writePoint(temp);
    writeApi.writePoint(hum);
    console.log(`setting point (${temp}; ${hum}`);
  }).catch(console.err);

};

setInterval(mockData, 5000);