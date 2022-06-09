
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, List, message, Modal, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../../config";
import { UserContext } from "../../../../../context/user";
import { useFetch } from "../../../../../hooks/fetch";
import req from "../../../../../request";
import { CommentFetchData } from "../../../../../types/comment";

const CommentSet: React.FC = () => {
    const pageSize = 6;
    const [page, setPage] = useState(1);
    const [res, refresh, setOps, err, isLoading] = useFetch<CommentFetchData | undefined>({}, undefined);

    console.log(err);

    useEffect(() => {
        setOps({
            path: `/comment/findUserComment`,
            data: {
                pageSize: 6,
                pageNum: page
            }
        });
    }, [page, setOps])

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
                                <Row style={{width: "100%"}}>
                                    <Col span={24}>
                                        <Row>
                                            <Col>
                                                <Link to={`/h/article/${item.articleId}`}>{item.articleName}</Link>
                                            </Col>
                                        </Row>
                                        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
                                            <Col>
                                                <Row gutter={5}>
                                                    <Col>
                                                        {item.pUserId ? <Link to={`/h/space/${item.pUserId}`}>@{item.pNickName}</Link> : null}
                                                    </Col>
                                                    <Col>
                                                        {item.content}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <DeleteModal id={item.id} onFinish={() => {refresh()}} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
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
                url: config.host + `/comment/${props.id}`,
                method: "DELETE",
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("操作成功");
                setVisible(false);
                if (props.onFinish) {
                    props.onFinish();
                }
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
            <Button type="link" style={{ padding: 0 }} danger onClick={() => setVisible(true)}><DeleteOutlined /></Button>
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


export default CommentSet;