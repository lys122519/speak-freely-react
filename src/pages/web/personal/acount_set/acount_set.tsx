import { Button, Card, Col, Form, Input, message, Row, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useContext, useState } from "react";
import config from "../../../../config";
import { UserContext } from "../../../../context/user";
import req from "../../../../request";

const AcountSet: React.FC = () => {
    const { userinfo, setUser } = useContext(UserContext);
    const [form] = useForm();
    const [passwordtime, setPTime] = useState(0);
    const [emaiLoading, setEmailLoading] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [emailTime, setETime] = useState(0);
    const [emailCodeLoading, setECodeLoad] = useState(false);
    
    const [emailForm] = useForm();

    const getECode = async () => {
        setECodeLoad(true);
        try {
            let error = emailForm.getFieldError("newemail")
            let email = emailForm.getFieldValue("newemail");
            if (!error.length && email) {
                let res = await req({
                    url: config.host + `/user/emailCode/emailModify/${email}`,
                    method: "POST"
                });
                if (res.data.code === 200) {
                    setETime(60);
                    let timer = setInterval(() => {
                        setETime((time) => {
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
                emailForm.validateFields(["newemail"]);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setECodeLoad(false)
        }
    }

    const onEmailSubmit = async () => {
        setEmailLoading(true);
        try {
            let email = emailForm.getFieldValue("newemail");
            let res = await req({
                url: config.host + "/user/emailModify",
                method: "POST",
                data: {
                    email: email,
                    token: userinfo?.token,
                    code: emailForm.getFieldValue("code")
                }
            });
            if (res.data.code === 200) {
                message.success("修改成功");
                setEmailStatus(false);
                setUser((u) => {
                    return {
                        ...u,
                        email: email,

                    } as any
                })
            } else {
                message.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setEmailLoading(false);
        }
    }
    return (
        <Space direction="vertical" size={10} style={{ width: "100%", display: "flex" }}>

            <Card title="密码">
                <Form
                    form={form}
                    name="mod-pass"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    size="large"
                    style={{ paddingTop: 0 }}
                >
                    <Form.Item
                        label="验证码"
                        name="code"
                    >
                        <Input.Group compact>
                            <Input style={{ width: 'calc(100% - 150px)' }} autoComplete="off" />
                            <Button
                                style={{ width: 150 }}
                                disabled={!!passwordtime}
                                onClick={() => {
                                    setPTime(60);
                                    let timer = setInterval(() => {
                                        setPTime((time) => {
                                            if (time === 0) {
                                                clearInterval(timer);
                                                return 0;
                                            }
                                            return time - 1;
                                        });
                                    }, 1000);
                                }}
                            >
                                {passwordtime ? `${passwordtime}秒后可重新获取` : "获取验证码"}
                            </Button>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newpwd"
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirmpwd"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Button type="primary" htmlType="submit">重置密码</Button>
                    </Form.Item>
                </Form >
            </Card>
            <Card title="邮箱">
                <Form
                    name="email"
                    form={emailForm}
                    labelCol={{ span: 4 }}
                    onFinish={onEmailSubmit}
                    wrapperCol={{ span: 12 }}
                    className="email-form"
                    size="middle"
                >
                    <Form.Item label="邮箱">
                        <Input
                            style={{ color: "#000", cursor: "default" }}
                            disabled
                            bordered={false}
                            value={userinfo?.email}
                        />
                    </Form.Item>
                    {emailStatus ? (
                        <>
                            <Form.Item
                                label="新邮箱"
                                name="newemail"
                                rules={[{ required: true, message: '请输入正确的邮箱', type: "email" }]}
                            >
                                <Input
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 14 }} noStyle>
                                <Row gutter={0}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="验证码"
                                            name="code"
                                            rules={[{ required: true, message: '请输入正确的验证码', pattern: /^[A-Za-z0-9]{4}$/ }]}
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                        >
                                            <Input autoComplete="off" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            disabled={!!emailTime}
                                            onClick={getECode}
                                            block
                                            loading={emailCodeLoading}
                                        >
                                            {emailTime ? `${emailTime}` : "获取验证码"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </>
                    ) : null}
                    <Form.Item
                        wrapperCol={{ offset: 4 }}
                    >
                        {emailStatus ?
                            <>
                                <Button type="link" htmlType={"submit"} loading={emaiLoading}>保存</Button>
                                <Button type="link" onClick={() => {
                                    setEmailStatus(false);
                                }}>取消</Button>
                            </>
                            : <Button type="link" key="email-edit" onClick={() => {
                                setEmailStatus(true);
                            }} >更改</Button>}
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}

export default AcountSet;