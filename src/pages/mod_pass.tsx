import { Form, Input } from "antd"
import { useForm } from "antd/lib/form/Form"

const ModPass: React.FC = () => {
    const [form] = useForm();
    return (
        <Form
            form={form}
            name="mod-pass"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
        >
            <Form.Item
                label="旧密码"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="新密码"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="确认密码"
            >
                <Input.Password />
            </Form.Item>
        </Form>
    )
}

export default ModPass;