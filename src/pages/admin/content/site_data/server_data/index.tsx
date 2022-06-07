import { Card, Col, Row, Space, Statistic } from "antd"
import FlowVariationDiagram from "./flow_variation_diagram";
import InterfaceCountChart from "./interface";
import TPie from "./pie";

const ServerDataIndex = () => {
    return (
        <div>
            <Space size={10} direction="vertical" style={{width: "100%"}}>
                <Card>
                    <Row gutter={50}>
                        <Col><Statistic title="用户总数" value={112893} /></Col>
                        <Col><Statistic title="当前在线" value={1} /></Col>
                    </Row>
                </Card>
                <Row gutter={10} align="stretch">
                    <Col span={18}>
                        <Card title="网站流量图">
                            <FlowVariationDiagram />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="待定" style={{ width: "100%", height: "100%" }}>
                            <TPie />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10} align="stretch">
                    <Col span={18}>
                        <Card title="接口请求情况">
                            <InterfaceCountChart />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="待定" style={{ width: "100%", height: "100%" }}>
                            <TPie />
                        </Card>
                    </Col>
                </Row>
            </Space>

        </div>
    )
}

export default ServerDataIndex;