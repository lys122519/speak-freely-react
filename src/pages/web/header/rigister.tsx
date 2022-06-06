import { Button, Col, Form, Input, message, Row } from "antd";
import { useContext, useState } from "react";
import "./header.less";
import { useForm } from "antd/lib/form/Form";
import req from "../../../request";
import config from "../../../config";
import { UserContext } from "../../../context/user";

interface RegisterProps {
    close: () => void
}

const Register: React.FC<RegisterProps> = (props) => {
    const { setUser } = useContext(UserContext);
    const [time, setTime] = useState(0);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    const getCode = async () => {
        try {
            let error = form.getFieldError("newemail")
            let email = form.getFieldValue("newemail");
            if (!error.length && email) {
                let res = await req({
                    url: config.host + `/user/emailCode/emailRegister/${email}`,
                    method: "POST"
                });
                if (res.data.code === 200) {
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
                } else {
                    message.error(res.data.msg);
                }
            } else {
                form.validateFields(["newemail"]);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        }
    }

    const onSubmit = async () => {
        let formData = form.getFieldsValue();
        setLoading(true);
        try {
            let res = await req({
                url: config.host + "/user/register",
                method: "POST",
                data: {
                    username: formData.newusername,
                    email: formData.newemail,
                    password: formData.newpassword1,
                    code: formData.code
                }
            });
            if (res.data.code === 200) {
                message.success("注册成功");
                setUser({
                    status: 1,
                    ...res.data.data
                });
                props.close();
            } else {
                message.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form
            name="register"
            form={form}
            labelCol={{ offset: 1, span: 4 }}
            onFinish={onSubmit}
            wrapperCol={{ span: 17 }}
            className="register-form"
            size="large"
        >
            <Form.Item
                label="用户名"
                name="newusername"
                rules={[{ required: true, message: '用户名必须以字母开头，长5-16，只允许字母数字下划线', pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ }]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="newemail"
                rules={[{ required: true, message: '请输入正确的邮箱', type: "email" }]}
            >
                <Input autoComplete="off" />
            </Form.Item>
            <Form.Item wrapperCol={{span: 24}} noStyle>
                <Row gutter={0}>
                    <Col span={16} offset={1}>
                        <Form.Item
                            label="验证码"
                            name="code"
                            rules={[{ required: true, message: '请输入正确的验证码', pattern: /^[A-Za-z0-9]{4}$/ }]}
                            labelCol={{span: 6}}
                        >
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Button
                            disabled={!!time}
                            onClick={getCode}
                            block
                        >
                            {time ? `${time}` : "获取验证码"}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                label="密码"
                name="newpassword1"
                rules={[{ required: true, message: '密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线', pattern: /^[a-zA-Z]\w{5,17}$/ }]}
            >
                <Input.Password autoComplete="off" />
            </Form.Item>
            <Form.Item
                label="确认密码"
                name="newpassword2"
                rules={[{
                    required: true, message: '密码不一致', validator: (_, v) => {
                        if (v === form.getFieldValue("newpassword1")) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject();
                        }
                    }
                }]}
            >
                <Input.Password autoComplete="off" />
            </Form.Item>
            <Row style={{ marginTop: 36 }}>
                <Col offset={2} span={20}>
                    <Button type="primary" block htmlType="submit" loading={loading} >注册并登录</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Register;