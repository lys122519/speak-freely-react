import { CommentOutlined, EyeOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/fetch";
import { ArticleDataFetchResponseData } from "../../../types/article";

const { Title, Text } = Typography;

const ArticleList: React.FC = () => {
    const pageSize = 6;
    const [page, setPage] = useState(1);
    const [res,, setOps, err, isLoading] = useFetch<ArticleDataFetchResponseData | undefined>({}, undefined);
    const { userId } = useParams();
    const nav = useNavigate();

    console.log(err);

    useEffect(() => {
        setOps({
            path: `/article/author/${userId}/publish/${page}/${pageSize}`,
        });
    }, [page, setOps, userId])

    return (
        <>
            <Card>
                <List
                    dataSource={res?.records ?? []}
                    pagination={{
                        position: "bottom",
                        total: res?.total,
                        pageSize: pageSize,
                        onChange: (p) => {
                            setPage(p)
                        },
                    }}
                    loading={isLoading}
                    style={{ marginTop: 16 }}
                    renderItem={(item) => {
                        return (
                            <List.Item key={item.id}>
                                <div className="user-admin-article-item">
                                    <Row justify="space-between">
                                        <Col>
                                            <Row align="middle">
                                                {item.enabled === "未启用" ? <Col><Tag color="orange">草稿</Tag></Col> : null}
                                                <Col>
                                                    <Title
                                                        style={{ cursor: "pointer" }}
                                                        level={4}
                                                        onClick={() => {
                                                            nav("/h/article/" + item.id);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Title>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>

                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row>
                                    <Row justify="space-between">
                                        <Col>
                                            <Row gutter={20}>
                                                <Col><Text style={{ color: "#666" }}><EyeOutlined /> 0</Text></Col>
                                                <Col><Text style={{ color: "#666" }}><LikeOutlined /> 0</Text></Col>
                                                <Col><Text style={{ color: "#666" }}><CommentOutlined /> 0</Text></Col>
                                                <Col><Text style={{ color: "#666" }}><StarOutlined /> 0</Text></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </List.Item>
                        )
                    }}
                >

                </List>
            </Card>

        </>
    )
}

export default ArticleList;