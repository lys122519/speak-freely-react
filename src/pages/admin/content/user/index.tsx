import { CheckCircleOutlined, DeleteOutlined, PauseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Table, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";

const { Text } = Typography;
const { Option } = Select;

const users = new Array(15).fill({
    username: "用户名",
    status: "正常",
    level: "管理员"
});

const columns: ColumnsType<any> = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '身份',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            return <Text style={{ color: "green" }}><CheckCircleOutlined />{status}</Text>
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: () => {
            return <>
                <Button type="link" style={{padding: 0}}><PauseOutlined /></Button>
                <Button type="link" style={{padding: 0}}></Button>
                <Button type="link" style={{padding: 0}} danger><DeleteOutlined /></Button>
            </>
        }
    },
];


const UserAdmin = () => {
    return (
        <>
            <Space size={10} direction="vertical" style={{ width: "100%" }} >
                <TableControlForm
                    fieldValue={{ status: "lock", role: "admin" }}
                    onChange={(f) => { console.log(f) }}
                />
                <Table
                    dataSource={users}
                    columns={columns}
                    pagination={{
                        pageSize: 8
                    }}
                ></Table>
            </Space>
        </>
    )
}

type TableControlField = {
    status?: string
    role?: string
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
                onValuesChange={() => {
                    if(props.onChange) {
                        props.onChange(form.getFieldsValue());
                    }
                }}
            >
                <Form.Item
                    name="status"
                    label="状态"
                >
                    <Select style={{ width: 120 }}>
                        <Option value="pubulic">已发布</Option>
                        <Option value="lock">已锁定</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="状态"
                >
                    <Select style={{ width: 120 }}>
                        <Option value="admin">管理员</Option>
                        <Option value="normal">一般用户</Option>
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

export default UserAdmin;