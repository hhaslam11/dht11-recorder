const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

// You can generate a Token from the "Tokens Tab" in the UI
const token = process.env.TOKEN;
const org = process.env.ORG;
const bucket = process.env.BUCKET;

const client = new InfluxDB({ url: process.env.URL, token: token });

const writeApi = client.getWriteApi(org, bucket);
writeApi.useDefaultTags({ host: 'host1' });

const mockData = () => {
  const temp = new Point('sensors')
    .floatField('temp', Math.floor(Math.random() * 37));
    
  const hum = new Point('sensors')
    .floatField('humidity', Math.floor(Math.random() * 100));
  
  writeApi.writePoint(temp);
  writeApi.writePoint(hum);
  console.log(`setting point (${temp}; ${hum}`);
};

setInterval(mockData, 1000);