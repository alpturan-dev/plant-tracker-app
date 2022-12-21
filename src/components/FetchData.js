import React from 'react'
import { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

function FetchData() {
  const [avaliableWidth, setAvaliableWidth] = useState();
  const [avaliableHeight, setAvaliableHeight] = useState();

  const [data, setData] = useState();
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [lux, setLux] = useState();

  async function fetchData() {
    const fetched = await fetch("https://api.thingspeak.com/channels/1977361/feeds.json?results=1")
      .then(response => response.json())
      .then(data => data.feeds[0]);
    setTemperature(parseFloat(fetched.field1));
    setHumidity(parseFloat(fetched.field2));
    setLux(parseFloat(fetched.field3));
    setData([
      {
        name: "temperature",
        uv: temperature,
        pv: 100,
        fill: "#ea580cd9"
      },
      {
        name: "humidity",
        uv: humidity,
        pv: 100,
        fill: "#2563ebd9"
      },
      {
        name: "lux",
        uv: lux,
        pv: 100,
        fill: "#fadc15d9"
      }
    ])
  }

  useEffect(() => {
    fetchData();
  });

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
    <div className='flex flex-row items-center content-center justify-center'>
      <RadialBarChart
        width={avaliableWidth < 400 ? 250 : 800}
        height={450}
        innerRadius="10%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="bottom" />
        <Tooltip />
      </RadialBarChart>
    </div>
  )
};




export default FetchData