import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { useFetch } from '../../../../../hooks/fetch';
import { ServerSysInfo } from '../../../../../types/server_sys_info';
import { Button, Card, Col, Row } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const SysInfoPie = () => {
    const [response, refresh, , , isLoading] = useFetch<ServerSysInfo | undefined>({
        path: "/data/sysInfo",
    }, undefined);
    const cpuData = [
        {
            type: '已使用',
            value: parseFloat(parseFloat(response?.cpuUsedRatio ?? "0").toFixed(2)),
        },
        {
            type: '未使用',
            value: parseFloat((100 - parseFloat(response?.cpuUsedRatio ?? "0")).toFixed(2)),
        },
    ].sort((a, b) => a.value - b.value);

    const memoryData = [
        {
            type: '已使用',
            value: parseFloat(parseFloat(response?.memoryUsed ?? "0").toFixed(3)) * 1000,
        },
        {
            type: '未使用',
            value: parseFloat((parseFloat(response?.memoryTotal ?? "0") - parseFloat(response?.memoryUsed ?? "0")).toFixed(3)) * 1000,
        },
    ].sort((a, b) => a.value - b.value);

    const cpuConfig = {
        appendPadding: 10,
        data: cpuData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}%',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            style: {
                fontSize: "16px"
            },
            content: {
                content: 'CPU',
            },
        },
    };

    const memoryConfig = {
        appendPadding: 10,
        data: memoryData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}MB',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                content: '内存',
            },
        },
    };
    return (
        <Card title={<Row justify="space-between" align='middle'>
            <Col>服务器使用情况</Col>
            <Col><Button disabled={isLoading} size='small' type="link" onClick={() => refresh()}><ReloadOutlined spin={isLoading}/></Button></Col>
        </Row>}>
            <div style={{ height: 300 }}>
                <Pie {...cpuConfig} />
            </div>
            <div style={{ height: 300 }}>
                <Pie {...memoryConfig} />
            </div>
        </Card>
    );
};

export default SysInfoPie;
