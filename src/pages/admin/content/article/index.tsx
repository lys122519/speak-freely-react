import { CheckCircleOutlined, DeleteOutlined, PauseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Space, Table, Typography, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";

const { Text } = Typography;
const { Option } = Select;

const arts = new Array(15).fill({
    title: "文章标题",
    status: "已发布",
});

const columns: ColumnsType<any> = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
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
                <Button type="link" style={{ padding: 0 }}><PauseOutlined /></Button>
                <Button type="link" style={{ padding: 0 }}></Button>
                <Button type="link" style={{ padding: 0 }} danger><DeleteOutlined /></Button>
            </>
        }
    },
];


const ArtAdmin = () => {

    return (
        <>
            <Space size={10} direction="vertical" style={{ width: "100%" }} >
                <TableControlForm
                    fieldValue={{ status: "lock" }}
                    onChange={(f) => { console.log(f) }}
                />
                <Table
                    dataSource={arts}
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

export default ArtAdmin;