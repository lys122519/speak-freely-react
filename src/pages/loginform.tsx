import { Button, Checkbox, Col, Form, Input, Row} from "antd";
import { useState } from "react";
import "./header.less";
import { useForm } from "antd/lib/form/Form";

interface LoginProps {

}

const Login: React.FC<LoginProps> = (props) => {
    const [time, setTime] = useState(0);
    const [form] = useForm();
    return (
        <Form
            name="login"
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
            className="login-form"
        >
            <Form.Item
                label="用户名/邮箱"
                name="username"
                rules={[{ required: false, message: '请输入您的用户名/邮箱' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password1"
                rules={[{ required: false, message: '请输入您的密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
                <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Row>
                <Col offset={2} span={20}>
                    <Button type="primary" block>登录</Button>
                </Col>
            </Row>
        </Form>
    )
}
export default Login;