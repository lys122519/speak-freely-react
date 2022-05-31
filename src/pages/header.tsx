import { Avatar, Button, Col, Form, Input, Layout, Menu, Modal, Row, Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import "./header.less";
import { useForm } from "antd/lib/form/Form";


const {
    Header
} = Layout;

const {
    TabPane
} = Tabs;


const AppHeader: React.FC<any> = (props) => {
    const [user, setUser] = useState<any>();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const navgite = useNavigate();
    const headerMenu = [
        { key: "/h/home", label: "首页" },
        { key: "/h/articles", label: "文章" },
        { key: "/h/projects", label: "项目" },
    ]

    return (
        <Header>
            <div className="header-content">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["/"]}
                    items={headerMenu}
                    onClick={(info) => {
                        navgite(info.key)
                    }}
                />
                <div className="user-content">
                    {
                        !user
                            ? <Button type="link" onClick={() => { setFormVisible(true) }}>登录/注册</Button>
                            : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    }
                </div>
            </div>
            <LoginFormBox isShow={formVisible} onCancel={() => { setFormVisible(false) }} />
        </Header>
    )
}


interface LoginFormBoxProps {
    isShow?: boolean
    onCancel?: () => void
}

const LoginFormBox: React.FC<LoginFormBoxProps> = (props) => {
    const {
        isShow,
        onCancel
    } = props;

    return (
        <Modal visible={isShow} footer={null} onCancel={onCancel}>
            <Tabs defaultActiveKey="login">
                <TabPane tab="登录" key="login">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="注册" key="register">
                    <Register />
                </TabPane>
            </Tabs>
        </Modal>
    )
}

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = (props) => {
    const [time, setTime] = useState(0);
    const [form] = useForm();
    return (
        <Form
            name="register"
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
            className="register-form"
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
                                    if(time === 0) {
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
            <Row>
                <Col offset={2} span={20}>
                    <Button type="primary" block>注册</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default AppHeader;

