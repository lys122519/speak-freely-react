import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import "./header.less";
import { useForm } from "antd/lib/form/Form";

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = (props) => {
    const [time, setTime] = useState(0);
    const [form] = useForm();
    return (
        <Form
            name="register"
            form={form}
            labelCol={{ offset:1, span: 4 }}
            
            wrapperCol={{ span: 17 }}
            className="register-form"
            size="large"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入您的用户名' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="e-mail"
                rules={[{ required: true, message: '请输入您的邮箱' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="验证码"
                name="e-mail"
                rules={[{ required: true, message: '请输入验证码' }]}
            >
                <Input.Group compact>
                    <Input style={{ width: 'calc(100% - 150px)' }} />
                    <Button
                        style={{ width: 150 }}
                        disabled={!!time}
                        onClick={() => {
                            setTime(60);
                            let timer = setInterval(() => {
                                setTime((time) => {
                                    if (time === 0) {
                                        clearInterval(timer);
                                        return 0;
                                    }
                                    return time - 1;
                                });
                            }, 1000);
                        }}
                    >
                        {time ? `${time}秒后可重新获取` : "获取验证码"}
                    </Button>
                </Input.Group>
            </Form.Item>
            <Form.Item
                label="密码"
                name="password1"
                rules={[{ required: true, message: '请输入您的密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="确认密码"
                name="password2"
                rules={[{ required: true, message: '请输入您的邮箱' }]}
            >
                <Input />
            </Form.Item>
            <Row style={{marginTop: 36}}>
                <Col offset={2} span={20}>
                    <Button type="primary" block>注册</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Register;