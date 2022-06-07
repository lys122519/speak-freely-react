import { useContext } from 'react';
import { BarConfig } from '@ant-design/charts';
import { useFetch } from '../../../../../hooks/fetch';
import { UserContext } from '../../../../../context/user';
import { Bar } from '@ant-design/plots';

const InterfaceCountChart:React.FC = () => {
    const { userinfo } = useContext(UserContext);
    const [data] = useFetch<{name: string, count: number}[]>({
        path: "/data/interface/10",
        token: userinfo?.token
    }, [])
    let chartData = data.map((item) => {
        return {
            ...item,
            name: item.name.split(".").pop()
        }
    }); 

    const config:BarConfig = {
        data: chartData,
        xField: 'count',
        yField: 'name',
        label: {
            position: "right"
        },
        xAxis: {
        },
        yAxis: {
            tickCount: 10
        },
        legend: {
            position: 'top-left',
        },
    };
    return <Bar {...config} />;
};

export default InterfaceCountChart;