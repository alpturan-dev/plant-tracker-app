import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';

function FetchData() {
  const [avaliableWidth, setAvaliableWidth] = useState();
  const [avaliableHeight, setAvaliableHeight] = useState();

  const [data, setData] = useState();
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [lux, setLux] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetched = await fetch("https://api.thingspeak.com/channels/1977361/feeds.json?results=10")
        .then(response => response.json());
      const fetchedTemperatureData = [];
      for (let i = 0; i < 6; i++) {
        fetchedTemperatureData.push(parseFloat(fetched.feeds[i].field1));
      }
      const fetchedTemperatureTime = [];
      for (let i = 0; i < 6; i++) {
        let time = fetched.feeds[i].created_at;
        time = time.substring(11, 19);
        console.log(time);
        fetchedTemperatureTime.push(time);
      }
      setTemperature([
        { date: fetchedTemperatureTime[0], temperature: fetchedTemperatureData[0] },
        { date: fetchedTemperatureTime[1], temperature: fetchedTemperatureData[1] },
        { date: fetchedTemperatureTime[2], temperature: fetchedTemperatureData[2] },
        { date: fetchedTemperatureTime[3], temperature: fetchedTemperatureData[3] },
        { date: fetchedTemperatureTime[4], temperature: fetchedTemperatureData[4] },
        { date: fetchedTemperatureTime[5], temperature: fetchedTemperatureData[5] }
      ]);
      const fetchedHumidityData = [];
      for (let i = 0; i < 6; i++) {
        fetchedHumidityData.push(parseFloat(fetched.feeds[i].field2));
      }
      const fetchedHumidityTime = [];
      for (let i = 0; i < 6; i++) {
        let time = fetched.feeds[i].created_at;
        time = time.substring(11, 19);
        console.log(time);
        fetchedHumidityTime.push(time);
      }
      setHumidity([
        { date: fetchedHumidityTime[0], humidity: fetchedHumidityData[0] },
        { date: fetchedHumidityTime[1], humidity: fetchedHumidityData[1] },
        { date: fetchedHumidityTime[2], humidity: fetchedHumidityData[2] },
        { date: fetchedHumidityTime[3], humidity: fetchedHumidityData[3] },
        { date: fetchedHumidityTime[4], humidity: fetchedHumidityData[4] },
        { date: fetchedHumidityTime[5], humidity: fetchedHumidityData[5] }
      ]);
      const fetchedLuxData = [];
      for (let i = 0; i < 6; i++) {
        fetchedLuxData.push(parseFloat(fetched.feeds[i].field3));
      }
      const fetchedLuxTime = [];
      for (let i = 0; i < 6; i++) {
        let time = fetched.feeds[i].created_at;
        time = time.substring(11, 19);
        console.log(time);
        fetchedLuxTime.push(time);
      }
      setLux([
        { date: fetchedLuxTime[0], humidity: fetchedLuxData[0] },
        { date: fetchedLuxTime[1], humidity: fetchedLuxData[1] },
        { date: fetchedLuxTime[2], humidity: fetchedLuxData[2] },
        { date: fetchedLuxTime[3], humidity: fetchedLuxData[3] },
        { date: fetchedLuxTime[4], humidity: fetchedLuxData[4] },
        { date: fetchedLuxTime[5], humidity: fetchedLuxData[5] }
      ]);


      // setHumidity([...humidity, parseFloat(fetched.field2)]);
      // setLux([...lux, parseFloat(fetched.field3)]);
      // console.log("temperature", temperature);
      // console.log("humidity", humidity);
      // console.log("lux", lux);
      // console.log("fetchedTemperatureData", fetchedTemperatureData);
      // console.log("fetchedTemperatureTime", fetchedTemperatureTime);
    }
    fetchData();
  }, []);

  (function () {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;

    function displayWindowSize() {
      let myWidth = window.innerWidth;
      let myHeight = window.innerHeight;
      // your size calculation code here
      setAvaliableWidth(parseInt(myWidth));
      setAvaliableHeight(parseInt(myHeight));
      console.log(avaliableWidth, avaliableHeight);
    };
  })();

  return (
    <div className='flex flex-col items-center content-center justify-center'>
      <h3>Temperature</h3>
      <VictoryChart
        domainPadding={5}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          data={temperature}
          x="date"
          y="temperature"
        />
      </VictoryChart>
      <h3>Humidity</h3>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          data={humidity}
          x="date"
          y="humidity"
        />
      </VictoryChart>
      <h3>Lux</h3>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          data={lux}
          x="date"
          y="lux"
        />
      </VictoryChart>
    </div>
  )
};




export default FetchData