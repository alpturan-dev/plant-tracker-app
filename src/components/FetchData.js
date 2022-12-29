import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';

function FetchData() {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [lux, setLux] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetched = await fetch("https://api.thingspeak.com/channels/1977361/feeds.json?results=6")
        .then(response => response.json());
      console.log("fetched", fetched);

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
        fetchedHumidityData.push(fetched.feeds[i].field2);
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
        { date: fetchedLuxTime[0], lux: fetchedLuxData[0] },
        { date: fetchedLuxTime[1], lux: fetchedLuxData[1] },
        { date: fetchedLuxTime[2], lux: fetchedLuxData[2] },
        { date: fetchedLuxTime[3], lux: fetchedLuxData[3] },
        { date: fetchedLuxTime[4], lux: fetchedLuxData[4] },
        { date: fetchedLuxTime[5], lux: fetchedLuxData[5] }
      ]);
    }
    fetchData();
  }, []);

  const IsTemperatureIdeal = () => {
    let ortSicaklik = 0;
    temperature.forEach(element => {
      ortSicaklik += parseFloat(element.temperature);
    });
    ortSicaklik = ortSicaklik / 6;
    if (ortSicaklik >= 23 && ortSicaklik <= 28) {
      return <p className='text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>Ortam sıcaklık değeri ideal seviyede.</p>;
    } else if (ortSicaklik < 23) {
      return <p className='text-center shadow-xl shadow-blue-300 text-xl rounded text-orangebg bg-blue-700'>Ortam sıcaklık değeri ideal seviyenin altında.</p>;
    } else if (ortSicaklik > 28) {
      return <p className='text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>Ortam sıcaklık değeri ideal seviyenin üstünde.</p>;
    }
  }

  const IsHumidityIdeal = () => {
    let ortHumidity = 0;
    humidity.forEach(element => {
      ortHumidity += parseFloat(element.humidity);
    });
    ortHumidity = ortHumidity / 6;
    if (ortHumidity >= 35 && ortHumidity <= 70) {
      return <p className='text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>Ortam nem değeri ideal seviyede.</p>;
    } else if (ortHumidity < 35) {
      return <p className='text-center shadow-xl shadow-blue-300 text-xl rounded text-orangebg bg-blue-700'>Ortam nem değeri ideal seviyenin altında.</p>;
    } else if (ortHumidity > 70) {
      return <p className='text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>Ortam nem değeri ideal seviyenin üstünde.</p>;
    }
  }


  const IsLuxIdeal = () => {
    let ortLux = 0;
    lux.forEach(element => {
      ortLux += parseFloat(element.lux);
    });
    ortLux = ortLux / 6;
    if (ortLux >= 4200 && ortLux <= 4200) {
      return <p className='text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>Ortam ışık değeri ideal seviyede.</p>;
    } else if (ortLux < 35) {
      return <p className='text-center shadow-xl shadow-blue-300 text-xl rounded text-orangebg bg-blue-700'>Ortam ışık değeri ideal seviyenin altında.</p>;
    } else if (ortLux > 60) {
      return <p className='text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>Ortam ışık değeri ideal seviyenin üstünde.</p>;
    }
  }

  return (
    <div className='flex flex-col items-center content-center justify-center my-5'>
      {IsTemperatureIdeal()}
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.grayscale}
        animate={{ duration: 2000 }}
      >
        <VictoryBar
          style={{ data: { fill: "#F87315" } }}
          data={temperature}
          x="date"
          y="temperature"
        />
      </VictoryChart>
      <h3 className='text-lg text-orange-500 mb-20'>Temperature</h3>

      {IsHumidityIdeal()}
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.grayscale}
        animate={{ duration: 2000 }}
      >
        <VictoryBar
          style={{ data: { fill: "#5FA5F9" } }}
          data={humidity}
          x="date"
          y="humidity"
        />
      </VictoryChart>
      <h3 className='text-lg text-blue-400 mb-20'>Humidity</h3>

      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.grayscale}
        animate={{ duration: 2000 }}
      >
        <VictoryBar
          style={{ data: { fill: "#EAB305" } }}
          data={lux}
          x="date"
          y="lux"
        />
      </VictoryChart>
      <h3 className='text-lg text-yellow-500'>Lux</h3>

    </div>
  )
};


export default FetchData