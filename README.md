
## DHT11-Recorder

A node service for recording temperature and humidity from a [**dht11**](https://learn.adafruit.com/dht) sensor, and streaming data to an InfluxDB database.

Designed to run on Raspberry PI. 
I use [Grafana](https://grafana.com/) for displaying the metrics.

#### Dependencies
node: `16.17.0`
npm: `8.15.0`
python: `3.9.2`

----
### Setup

####  Run influxdb
Setup and run [Influxdb](https://docs.influxdata.com/influxdb/v2.4/get-started/). I have it running on a [vultr](https://www.vultr.com/?ref=7206646) node, but you can run it on your local network as well. I haven't tested running it on the Raspberry Pi, but it would probably work fine.

#### Setup up raspberry pi
1. Setup dht11 sensor as shown [here](https://www.npmjs.com/package/node-dht-sensor)
2. Clone repo to your raspberry pi
3. Create new `.env` file in repo root
4. Copy contents of `.env.example`
5. Fill in your influxdb details
6. Install dependencies with `npm i`

Start the service:
```sh
npm start
```

If all is successful, you should see something like:
```
setting point (sensors temp=22 1663136856314212278; sensors hum=53 1663136856314241236
setting point (sensors temp=22 1663136861323320099; sensors hum=54 1663136861323378692
setting point (sensors temp=22 1663136866328645560; sensors hum=54 1663136866328703997
setting point (sensors temp=22 1663136871331945613; sensors hum=54 1663136871332005457
setting point (sensors temp=22 1663136876337371318; sensors hum=54 1663136876337429286
...
```

#### (Optional) Run with pm2
I use [pm2](https://pm2.keymetrics.io/) to reliably run the node process in the background
```
npm install pm2 -g
pm2 start "npm start"
pm2 save
```

View process: `pm2 monit`
Stop process: `pm2 stop 0`
Start process: `pm2 start 0`
View the [docs](https://pm2.keymetrics.io/docs/usage/quick-start/) for more actions
