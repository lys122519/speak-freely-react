import { useContext } from 'react';
import { Line } from '@ant-design/plots';
import { Datum, LineConfig } from '@ant-design/charts';
import { useFetch } from '../../../../../hooks/fetch';

const FlowVariationDiagram = () => {
  const [data] = useFetch<number[]>({
    path: "/data/activeUserCountByHour",
  }, []);
  let max = 0;
  let chartData = data.map((item, index) => {
    let h = new Date().getHours() 
    let time = h - (23 - index) >= 0 ? h - (23 - index) : 24 + (h - (23 - index));
    if(max < item) {
      max = item;
    }
    return {
      time: time + '',
      count: item,
    }
  });


  const config: LineConfig = {
    data: chartData,
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
      },
      tickInterval: max <= 5 ? 1 : Math.floor(max / 5) + 1,
      tickCount: 5
    },
    tooltip: {
      fields: ["count", "time"],
      formatter: (datum: Datum) => {
        return { name: "访问量", value: datum.count };
      },
      title: (_, datum: Datum) => {
        return `时间：${datum.time}`
      }
    }

  };

  return <Line {...config} />;
};

export default FlowVariationDiagram;