import { Card, Col, Row, Space, Statistic } from "antd"
import { useFetch } from "../../../../../hooks/fetch";
import { UserInfoName, UserInfoNameIndex } from "../../../../../types/server_sys_info";
import FlowVariationDiagram from "./flow_variation_diagram";
import InterfaceCountChart from "./interface";
import SysInfoPie from "./sys_info_pie";

const ServerDataIndex = () => {
    const [res] = useFetch<{ count: number, name: UserInfoNameIndex }[] | undefined>({
        path: "/data/userCount"
    }, undefined)
    return (
        <div>
            <Space size={10} direction="vertical" style={{ width: "100%" }}>
                <Card>
                    <Row gutter={50}>
                        {res?.map((item, index) => {
                            return <Col key={index}><Statistic title={UserInfoName[item.name]} value={item.count} /></Col>
                        })}
                    </Row>
                </Card>
                <Row gutter={10} align="stretch">
                    <Col span={18}>
                        <Card title="网站流量图">
                            <FlowVariationDiagram />
                        </Card>
                        <Card style={{ marginTop: 10 }} title="接口请求情况">
                            <InterfaceCountChart />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <SysInfoPie />
                    </Col>
                </Row>
            </Space>

        </div>
    )
}

export default ServerDataIndex;