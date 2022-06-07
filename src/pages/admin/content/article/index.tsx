import { CheckCircleOutlined, DeleteOutlined, PauseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Space, Table, Typography, Input, Modal, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ColumnsType } from "antd/lib/table";
import { useContext, useEffect, useState } from "react";
import config from "../../../../config";
import { UserContext } from "../../../../context/user";
import { useFetch } from "../../../../hooks/fetch";
import req from "../../../../request";
import { fetchResponseData } from "../../../web/personal/content_set/article_set/article_set";
import ArtStatusText from "./status_text";

const { Text } = Typography;
const { Option } = Select;

const arts = new Array(15).fill({
    title: "文章标题",
    status: "已发布",
});

type ArtType = {
    name: string
    authorNickname: string
    enabled: string
    time: string
}


const ArtAdmin = () => {
    const { userinfo } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("all");
    const [res, refresh, setOps, err, isLoading] = useFetch<fetchResponseData | undefined>({}, undefined);

    const columns: ColumnsType<any> = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "作者",
            dataIndex: "authorNickname",
            key: "authorNickname"
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled) => {
                return <ArtStatusText status={enabled} />
            }
        },
        {
            title: "时间",
            dataIndex: "time",
            key: "time"
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (_, item) => {
                return <>
                    <Button type="link" style={{ padding: 0 }}><PauseOutlined /></Button>
                    <Button type="link" style={{ padding: 0 }}></Button>
                    <DeleteModal id={item.id} onFinish={() => {refresh()}} />
                </>
            }
        },
    ];

    useEffect(() => {
        setOps({
            path: `/article/${type}/${page}/8`,
            token: userinfo?.token
        });
    }, [page, type])

    return (
        <>
            <Space size={10} direction="vertical" style={{ width: "100%" }} >
                <TableControlForm
                    fieldValue={{ status: type }}
                    onChange={(f) => { setType(f.status ?? "all") }}
                />
                <Table
                    dataSource={res?.records}
                    columns={columns}
                    pagination={{
                        pageSize: 8,
                        total: res?.total
                    }}
                    rowKey={(item) => item.id}
                ></Table>
            </Space>
        </>
    )
}

type TableControlField = {
    status?: string
}

interface TableControlFormProps {
    onChange?: (filed: TableControlField) => void
    fieldValue?: TableControlField
    onSearch?: (search: string) => void
}

const TableControlForm: React.FC<TableControlFormProps> = (props) => {
    const [form] = useForm();

    useEffect(() => {
        form.setFieldsValue(props.fieldValue);
    }, [form, props.fieldValue])

    return (
        <Card>
            <Form
                layout="inline"
                form={form}
                onValuesChange={(v) => {
                    if (props.onChange) {
                        props.onChange(form.getFieldsValue());
                    }
                }}
            >
                <Form.Item
                    name="status"
                    label="状态"
                >
                    <Select style={{ width: 120 }}>
                        <Option value="all">全部</Option>
                        <Option value="publish">已发布</Option>
                        <Option value="draft">未发布</Option>
                        <Option value="lock">已锁定</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="搜索标题"
                >
                    <Input.Search onSearch={(v) => {
                        if (props.onSearch) {
                            props.onSearch(v);
                        }
                    }} />
                </Form.Item>
            </Form>
        </Card>
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
                if(props.onFinish) {
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

export default ArtAdmin;