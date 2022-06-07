import { CommentOutlined, EyeOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Card, Col, List, message, Modal, Row, Segmented, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../../config";
import { UserContext } from "../../../../../context/user";
import { useFetch } from "../../../../../hooks/fetch";
import req from "../../../../../request";
import "./article_set.less"

const { Title, Text } = Typography;

type ArticleData = {
    content: string
    id: number,
    name: string,
    time: string,
    username: string,
    userid: string,
    enabled: string
}

export type fetchResponseData = {
    currents: number
    pages: number
    records: ArticleData[]
    size: number
    total: number
}

enum articleType {
    "全部" = "all",
    "草稿" = "draft",
    "已发布" = "publish"
}

const ArticleSet: React.FC = () => {
    const pageSize = 6;
    const { userinfo } = useContext(UserContext);
    const [type, setType] = useState("all");
    const [page, setPage] = useState(1);
    const [res, refresh, setOps, err, isLoading] = useFetch<fetchResponseData | undefined>({}, undefined);

    console.log(err);

    useEffect(() => {
        setOps({
            path: `/article/self/${type}/${page}/${pageSize}`,
            token: userinfo?.token
        });
    }, [type, page])

    return (
        <>
            <Card>
                <Segmented onChange={(value) => {
                    setType((articleType as any)[value])
                }} options={['全部', '草稿', '已发布']} />
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
                    style={{marginTop: 16}}
                    renderItem={(item) => {
                        return (
                            <List.Item key={item.id}>
                                <div className="user-admin-article-item">
                                    <Row justify="space-between">
                                        <Col>
                                            <Row align="middle">
                                                {item.enabled === "未启用" ? <Col><Tag color="orange">草稿</Tag></Col> : null}
                                                <Col><Title style={{ cursor: "pointer" }} level={4}>{item.name}</Title></Col>
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
                                        <Col>
                                            <Row gutter={10}>
                                                <Col><Link to={`/h/editor/${item.id}`}><Button type="link" size="small">编辑</Button></Link></Col>
                                                <Col><Link to={`/h/article/${item.id}`}><Button type="link" size="small">浏览</Button></Link></Col>
                                                <Col><DeleteModal id={item.id} onFinish={() => {
                                                    refresh();
                                                }} /></Col>
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

interface DeleteModalProps {
    id: number,
    onFinish?: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userinfo } = useContext(UserContext);

    const onDelete = async () => {
        setLoading(true);
        try {
            let res = await req({
                url: config.host + `/article/${props.id}`,
                method: "DELETE",
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("操作成功");
                setVisible(false);

            } else {
                message.error(res.data.msg)
            }
        } catch (err) {
            console.log(err);
            message.error("出现异常，详见控制台");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button type="link" danger size="small" onClick={() => setVisible(true)}>删除</Button>
            <Modal
                title="提示"
                onCancel={() => setVisible(false)}
                footer={(
                    <>
                        <Button onClick={() => setVisible(false)}>取消</Button>
                        <Button type="primary" loading={loading} onClick={onDelete} >确定</Button>
                    </>
                )}
                visible={visible}
            >
                确定要删除吗？
            </Modal>
        </>
    )
}


export default ArticleSet;