import { Button, Checkbox, Col, Form, Input, message, Row} from "antd";
import { useContext, useState } from "react";
import "./header.less";
import { useForm } from "antd/lib/form/Form";
import request from  "../request";
import config from "../config";
import { UserContext } from "../context/user";

interface LoginProps {
    close: () => void
}

const Login: React.FC<LoginProps> = (props) => {
    const {setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const onSubmit = async (v: any) => {
        const data = {
            username: v.username,
            password: v.password
        }
        setLoading(true);
        try {
            let res = await request({
                method: "POST",
                url: config.host + "/user/login",
                data: data,
            });
            if(res.data.code === 200) {
                message.success("登录成功");
                setUser({
                    status: 1,
                    ...res.data.data
                });
                props.close();
            } else {
                message.error(res.data.msg);
            }
        } catch(err: any) {
            message.error(err.text);
        } finally {
            setLoading(false);
        }        

    }
    return (
        <Form
            name="login"
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
            className="login-form"
            onFinish={onSubmit}
            size="large"
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
                name="password"
                rules={[{ required: false, message: '请输入您的密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
                <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Row>
                <Col offset={2} span={20}>
                    <Button loading={loading} type="primary" block htmlType="submit">登录</Button>
                </Col>
            </Row>
        </Form>
    )
}
export default Login;