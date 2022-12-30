import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';

function FetchData() {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [lux, setLux] = useState([]);
  const [gunlukTemperature, setGunlukTemperature] = useState([]);
  const [gunlukHumidity, setGunlukHumidity] = useState([]);
  const [gunlukLux, setGunlukLux] = useState([]);

  //Gunluk veriler
  async function fetchGunlukData() {
    const fetched = await fetch("https://api.thingspeak.com/channels/1977361/feeds.json?results=1920")
      .then(response => response.json());
    console.log("fetched", fetched);

    const fetchedTemperatureData = [];
    for (let i = 0; i < 1920; i++) {
      fetchedTemperatureData.push(parseFloat(fetched.feeds[i].field1));
    }
    const fetchedTemperatureTime = [];
    for (let i = 0; i < 1920; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedTemperatureTime.push(time);
    }
    setGunlukTemperature(() => {
      let tempArray = [];
      for (let i = 0; i < 1920; i++) {
        tempArray.push({ date: fetchedTemperatureTime[i], temperature: fetchedTemperatureData[i] });
      }
      return tempArray;
    });

    const fetchedHumidityData = [];
    for (let i = 0; i < 1920; i++) {
      fetchedHumidityData.push(fetched.feeds[i].field2);
    }
    const fetchedHumidityTime = [];
    for (let i = 0; i < 1920; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedHumidityTime.push(time);
    }
    setGunlukHumidity(() => {
      let tempArray = [];
      for (let i = 0; i < 6; i++) {
        tempArray.push({ date: fetchedHumidityTime[i], humidity: fetchedHumidityData[i] });
      }
      return tempArray;
    });

    const fetchedLuxData = [];
    for (let i = 0; i < 1920; i++) {
      fetchedLuxData.push(parseFloat(fetched.feeds[i].field3));
    }
    const fetchedLuxTime = [];
    for (let i = 0; i < 1920; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedLuxTime.push(time);
    }
    setGunlukLux(() => {
      let tempArray = [];
      for (let i = 0; i < 6; i++) {
        tempArray.push({ date: fetchedLuxTime[i], lux: fetchedLuxData[i] });
      }
      return tempArray;
    });
  }

  //Dakikalik veriler
  async function fetchData() {
    const fetched = await fetch("https://api.thingspeak.com/channels/1977361/feeds.json?results=4")
      .then(response => response.json());
    console.log("fetched", fetched);

    const fetchedTemperatureData = [];
    for (let i = 0; i < 4; i++) {
      fetchedTemperatureData.push(parseFloat(fetched.feeds[i].field1));
    }
    const fetchedTemperatureTime = [];
    for (let i = 0; i < 4; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedTemperatureTime.push(time);
    }
    setTemperature(() => {
      let tempArray = [];
      for (let i = 0; i < 4; i++) {
        tempArray.push({ date: fetchedTemperatureTime[i], temperature: fetchedTemperatureData[i] });
      }
      return tempArray;
    });

    const fetchedHumidityData = [];
    for (let i = 0; i < 4; i++) {
      fetchedHumidityData.push(fetched.feeds[i].field2);
    }
    const fetchedHumidityTime = [];
    for (let i = 0; i < 4; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedHumidityTime.push(time);
    }
    setHumidity(() => {
      let tempArray = [];
      for (let i = 0; i < 4; i++) {
        tempArray.push({ date: fetchedHumidityTime[i], humidity: fetchedHumidityData[i] });
      }
      return tempArray;
    });

    const fetchedLuxData = [];
    for (let i = 0; i < 4; i++) {
      fetchedLuxData.push(parseFloat(fetched.feeds[i].field3));
    }
    const fetchedLuxTime = [];
    for (let i = 0; i < 4; i++) {
      let time = fetched.feeds[i].created_at;
      time = time.substring(11, 19);
      console.log(time);
      fetchedLuxTime.push(time);
    }
    setLux(() => {
      let tempArray = [];
      for (let i = 0; i < 4; i++) {
        tempArray.push({ date: fetchedLuxTime[i], lux: fetchedLuxData[i] });
      }
      return tempArray;
    });
  }

  useEffect(() => {
    fetchData();
    fetchGunlukData();
  }, []);

  const IsTemperatureIdeal = (veriSayisi, item) => {
    let ortSicaklik = 0;
    item.forEach(element => {
      ortSicaklik += parseFloat(element.temperature);
    });
    ortSicaklik = ortSicaklik / veriSayisi;
    if (ortSicaklik >= 23 && ortSicaklik <= 28) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>
        <span className="pl-4 color-white material-symbols-outlined">
          done
        </span>
        Ortam sıcaklık değeri ideal seviyede.
      </p>;
    } else if (ortSicaklik < 23) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl  shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>
        Ortam sıcaklık değeri ideal seviyenin altında.</p>;
    } else if (ortSicaklik > 28) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>
        Ortam sıcaklık değeri ideal seviyenin üstünde.</p>;
    }
  }

  const IsHumidityIdeal = (veriSayisi, item) => {
    let ortHumidity = 0;
    item.forEach(element => {
      ortHumidity += parseFloat(element.humidity);
    });
    ortHumidity = ortHumidity / veriSayisi;
    if (ortHumidity >= 35 && ortHumidity <= 70) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>
        <span className="pl-4 material-symbols-outlined color-white">
          done
        </span>
        Ortam nem değeri ideal seviyede.</p>;
    } else if (ortHumidity < 35) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>
        Ortam nem değeri ideal seviyenin altında.</p>;
    } else if (ortHumidity > 70) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>
        Ortam nem değeri ideal seviyenin üstünde.</p>;
    }
  }


  const IsLuxIdeal = (veriSayisi, item) => {
    let ortLux = 0;
    item.forEach(element => {
      ortLux += parseFloat(element.lux);
    });
    ortLux = ortLux / veriSayisi;
    if (ortLux >= 100 && ortLux <= 250) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-green-100 text-xl rounded text-orangebg bg-green-600'>
        <span className="pl-4 material-symbols-outlined color-white">
          done
        </span>
        Ortam ışık değeri ideal seviyede.</p>;
    } else if (ortLux < 100) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>
        Ortam ışık değeri ideal seviyenin altında.</p>;
    } else if (ortLux > 250) {
      return <p className='p-3 flex items-center justify-center text-center shadow-xl shadow-red-300 text-xl rounded text-orangebg bg-red-600'>
        <span class="pl-4 color-white material-symbols-outlined">
          warning
        </span>Ortam ışık değeri ideal seviyenin üstünde.</p>;
    }
  }

  return (
    <div className='flex flex-col items-center content-center justify-center my-5'>
      <a className="text-orange-900 text-2xl font-bold underline my-4" href="#section">Bitki Durumu</a>
      {IsTemperatureIdeal(4, temperature)}
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
      <h3 className='text-lg text-orange-500 mb-20'>Sıcaklık</h3>

      {IsHumidityIdeal(4, humidity)}
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
      <h3 className='text-lg text-blue-400 mb-20'>Nem</h3>

      {IsLuxIdeal(4, lux)}
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
      <h3 className='text-lg text-yellow-500'>Işık</h3>

      <a className="text-orange-900 text-2xl font-bold underline my-5" href="#section">Günlük Bitki Durumu</a>
      <div className=''>{IsTemperatureIdeal(1920, gunlukTemperature)}</div>
      <div>{IsHumidityIdeal(1920, gunlukHumidity)}</div>
      <div>{IsLuxIdeal(1920, gunlukLux)}</div>
    </div>
  )
};


export default FetchData