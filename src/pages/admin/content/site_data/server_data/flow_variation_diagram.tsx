import { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Datum, LineConfig } from '@ant-design/charts';

const FlowVariationDiagram = () => {
  const [data, setData] = useState([
    { time: 0, count: 18 },
    { time: 1, count: 28 },
    { time: 2, count: 81 },
    { time: 3, count: 5 },
    { time: 4, count: 3 },
    { time: 5, count: 2 },
    { time: 6, count: 1 },
    { time: 7, count: 0 },
    { time: 8, count: 6 },
    { time: 9, count: 4 },
    { time: 10, count: 3 },
    { time: 11, count: 0 },
    { time: 12, count: 0 },
    { time: 13, count: 0 },
    { time: 14, count: 0 },
    { time: 15, count: 0 },
    { time: 16, count: 0 },
    { time: 17, count: 0 },
    { time: 18, count: 0 },
    { time: 19, count: 0 },
    { time: 20, count: 0 },
    { time: 21, count: 0 },
    { time: 22, count: 0 },
    { time: 23, count: 0 },
  ]);

  const config: LineConfig = {
    data,
    xField: 'time',
    yField: 'count',
    xAxis: {
      // type: 'timeCat',
      tickCount: 24,
      title: {
        text: "时间"
      }
    },
    yAxis: {
      title: {
        text: "访问量"
      }
    },
    tooltip: {
      fields: ["count", "time"],
      formatter: (datum: Datum) => {
        return { name: "访问量", value: datum.count };
      },
    }

  };

  return <Line {...config} />;
};

export default FlowVariationDiagram;