## DHT11-Recorder
A node service for recording temperature and humidity from a [**dht11**}(https://learn.adafruit.com/dht) sensor, and streaming data to an InfluxDB database.
Designed to run on Raspberry PI

### Setup Locally
Run influxdb on docker
```sh
docker run -d -p 8086:8086 --name influxdb influxdb:2.0
```

Open [http://localhost:8086](http://localhost:8086) to access influxdb setup UI

Run grafana on docker
```sh
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

Run service
```sh
npm install
npm start
```

### Setup on Raspberry PI
TODO