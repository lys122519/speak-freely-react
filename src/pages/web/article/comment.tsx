import { AlertOutlined, CommentOutlined, PropertySafetyTwoTone } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Comment, Form, Input, message, Modal, Pagination, Row, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import config from '../../../config';
import { UserContext } from '../../../context/user';
import { useFetch } from '../../../hooks/fetch';
import req from '../../../request';
import { CommentData, CommentFetchData } from '../../../types/comment';

const { TextArea } = Input;


interface CommentItemProps {
    data: CommentData
    children?: React.ReactNode[]
    reFresh?: () => void
}

const CommentItem: React.FC<CommentItemProps> = ({ data, children, reFresh }) => {
    const [editorVisible, setVisible] = useState(false);
    const [editorValue, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const { userinfo } = useContext(UserContext);
    const [all, setAll] = useState(false);
    const [page, setPage] = useState(1);
    const [reportLoading, setReportLoading] = useState(false);

    const onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = async () => {
        setReportLoading(true);
        try {
            let res = await req({
                url: config.host + "/comment",
                method: "POST",
                data: {
                    articleId: data.articleId,
                    content: editorValue,
                    pid: data.id
                },
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("发布成功");
                setVisible(false);
                if (reFresh) {
                    reFresh();
                }
            } else {
                message.error(res.data.msg)
            }
        } catch (err) {
            console.log(err);
            message.error("出现异常，详见控制台");
        } finally {
            setReportLoading(false);
        }
    }

    const onReport = async (value: string) => {
        setLoading(true);
        try {
            let res = await req({
                url: config.host + "/report",
                method: "POST",
                data: {
                    articleId: data.articleId,
                    content: value,
                    commentId: data.id
                },
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("举报成功");
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
            <Comment
                actions={[<span key="comment-nested-reply-to" onClick={() => { setVisible((v) => !v) }}>回复</span>, <Report loading={reportLoading} key="report" onReport={onReport} render="举报" />]}
                author={<Link to={`/h/space/${data.userId}`}>{data.nickname}</Link>}
                avatar={<Avatar src={data.avatarUrl} alt="Han Solo" />}
                content={
                    <p>
                        <Space size={5}>
                            <span>{data.pNickName && data.pid !== data.originId ? <Link to={`/h/space/${data.pUserId}`}>@ {data.pNickName}</Link> : null}</span>
                            <span>{data.content}</span>
                        </Space>
                    </p>
                }
                datetime={data.time}
            >
                {children && children?.length > 2 && !all ? children?.slice(0, 2) : children?.slice((page - 1) * 5, page * 5)}
                {children && children?.length > 2 && !all ? <a onClick={() => setAll(true)}>查看全部</a> : null}
                {children && children?.length > 2 && all ? <Pagination defaultCurrent={page} onChange={(p) => setPage(p)} total={children.length} pageSize={5} size="small" /> : null}
                {children && children?.length > 2 && all ? <a onClick={() => setAll(false)}>收起</a> : null}
            </Comment>
            {editorVisible ? <Editor submitting={loading} value={editorValue} onChange={onChange} onSubmit={onSubmit} /> : null}
        </>
    )
};

interface ReportProps {
    onReport: (reson: string) => void
    loading?: boolean
    render?: React.ReactNode
}

const Report: React.FC<ReportProps> = ({ onReport, loading, render }) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("");
    return (
        <>
            <span onClick={() => {
                setVisible(true);
            }} key="report">{render}</span>
            <Modal
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                title="举报"
                footer={[
                    <Button onClick={() => setVisible(false)}>取消</Button>,
                    <Button loading={loading} type="primary" onClick={async () => {
                        await onReport(value);
                        setVisible(false);
                    }}>确定</Button>
                ]}
            >
                <Form>
                    <Form.Item
                        label="举报理由"
                    >
                        <Input.TextArea onChange={(e) => { setValue(e.target.value) }} value={value}></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}



const CommentControl: React.FC = () => {
    const [data, refresh, setOps] = useFetch<CommentFetchData | undefined>({}, undefined);
    const [page, setPage] = useState(1);
    const [commentShow, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editorValue, setValue] = useState("");
    const { userinfo } = useContext(UserContext);
    const { articleId } = useParams();

    useEffect(() => {
        setOps({
            path: `/comment/tree/${articleId}`,
            token: userinfo?.token,
            data: {
                pageNum: page,
                pageSize: 5
            }
        });
    }, [page]);

    const onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            let res = await req({
                url: config.host + "/comment",
                method: "POST",
                data: {
                    articleId: articleId ? parseInt(articleId) : undefined,
                    content: editorValue
                },
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("发布成功");
                setValue("");
                setShow(false);
                refresh();
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

    const renderTree = (list: CommentData[]) => {
        return list.map((item) => {
            return <CommentItem key={item.id} data={item} reFresh={refresh}>
                {item.children ? renderTree(item.children) : undefined}
            </CommentItem>
        });
    }

    const onReport = async (value: string) => {
        setLoading(true);
        try {
            let res = await req({
                url: config.host + "/report",
                method: "POST",
                data: {
                    articleId: articleId,
                    content: value,
                },
                headers: {
                    token: userinfo?.token ?? ""
                }
            });
            if (res.data.code === 200) {
                message.success("举报成功");
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
            <Card>
                <Row gutter={10}>
                    <Col>
                        <Button type='link' onClick={() => {
                            setShow((isShow) => {
                                return !isShow;
                            })
                        }}><CommentOutlined />评论</Button>
                    </Col>
                    <Col>
                        <Report onReport={onReport} render={<Button type="link"><AlertOutlined />举报</Button>}/>
                    </Col>
                </Row>
            </Card>
            {commentShow ? <Editor submitting={loading} value={editorValue} onChange={onChange} onSubmit={onSubmit} /> : null}
            <Card>
                {renderTree(data?.records ?? [])}
                <div style={{ margin: "10px 0" }}>
                    <Pagination defaultCurrent={1} total={data?.total} pageSize={5} onChange={(p) => setPage(p)}></Pagination>
                </div>
            </Card>

        </>
    )
};

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting?: boolean;
    value: string;
}


const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发布
            </Button>
        </Form.Item>
    </>
);



export default CommentControl;