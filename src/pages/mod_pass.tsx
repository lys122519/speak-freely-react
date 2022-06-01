import { Button, Divider, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useContext, useState } from "react";
import { UserContext } from "../context/user";

const ModPass: React.FC = () => {
    const {userinfo} = useContext(UserContext);
    const [form] = useForm();
    const [time, setTime] = useState(0);
    return (
        <Form
            form={form}
            name="mod-pass"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            size="large"
        >
            <PageHeader
                className="site-page-header"
                title="旧密码"
            />
            <Divider />
            <Form.Item
                label="旧密码"
                initialValue={userinfo?.password}
            >
                <Input.Password disabled value={userinfo?.password}/>
            </Form.Item>
            <PageHeader
                className="site-page-header"
                title="修改密码"
            />
            <Divider />
            <Form.Item
                label="验证码"
                name="code"
            >
                <Input.Group compact>
                    <Input style={{ width: 'calc(100% - 150px)' }} autoComplete="off" />
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
            <Form.Item wrapperCol={{offset: 4}}>
                <Button type="primary" htmlType="submit">重置密码</Button>
            </Form.Item>
        </Form>
    )
}

export default ModPass;