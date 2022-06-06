import { Avatar, Button, Col, Dropdown, Layout, Menu, Modal, Row, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EditOutlined, PoweroffOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import "./header.less";
import Register from "./rigister";
import Login from "./loginform";
import { UserContext, UserInfo } from "../../../context/user";
import { Link } from "react-router-dom";
import Search from "./search";

const {
    Header
} = Layout;

const {
    TabPane
} = Tabs;

const UserMenu = () => {
    const { setUser } = useContext(UserContext);
    return (
        <Menu
            items={[
                {
                    key: 'logout',
                    label: (
                        <Button type="link" icon={<PoweroffOutlined />} onClick={() => {
                            setUser(undefined);
                            sessionStorage.removeItem("user");
                            localStorage.removeItem("user");
                        }}>
                            退出登录
                        </Button>
                    ),
                },
            ]}
        />
    );
};

const AppHeader: React.FC<any> = (props) => {
    const { userinfo } = useContext(UserContext);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [select, setSelect] = useState("/h/home");
    const navgite = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSelect(location.pathname.split("/").filter((_, index) => index <= 2 ? true : false).join("/"));
    }, [location]);

    const headerMenu = [
        { key: "/h/home", label: "首页" },
        { key: "/h/articles", label: "文章" },
        { key: "/h/projects", label: "项目" },
    ]

    return (
        <Header style={{ background: "#fff" }}>
            <Row align="middle" justify="space-between" className="header-content">
                <Col>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        selectedKeys={[select]}
                        items={headerMenu}
                        onClick={(info) => {
                            if (info.key !== select) {
                                setSelect(info.key);
                                navgite(info.key);
                            }
                        }}
                    />
                </Col>
                <Col span={8} style={{alignItems: "stretch", display: "flex", flexDirection: "column", justifyContent: "center"}}><Search /></Col>
                <Col>
                    <div className="user-content">
                        {
                            !(userinfo && userinfo.status)
                                ? <Button type="link" onClick={() => { setFormVisible(true) }}>登录/注册</Button>
                                : <UserAvatar />
                        }
                    </div>
                </Col>
            </Row>
            <LoginFormBox isShow={formVisible} onCancel={() => { setFormVisible(false) }} />
        </Header>
    )
}


const UserAvatar = () => {
    const { userinfo } = useContext(UserContext);
    return (
        <Row align="middle" gutter={20}>
            <Col>
                <Dropdown overlay={<UserMenu />}>
                    <Link to={`/h/personal/base-info`} >
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} src={userinfo?.avatarUrl} />
                    </Link>
                </Dropdown>
            </Col>
            <Col>
                <Link to="/h/editor">
                    <Button icon={<EditOutlined />} type="primary">写文章</Button>
                </Link>
            </Col>
            {
                userinfo?.role === "ROLE_ADMIN"
                    ? <Col>
                        <Link to="/admin/server-data">
                            <Button icon={<SettingOutlined />} >管理端</Button>
                        </Link>
                    </Col>
                    : null
            }
        </Row>
    )
}


interface LoginFormBoxProps {
    isShow?: boolean
    onCancel: () => void
}

const LoginFormBox: React.FC<LoginFormBoxProps> = (props) => {
    const {
        isShow,
        onCancel
    } = props;

    return (
        <Modal style={{ top: 240 }} width={600} visible={isShow} footer={null} onCancel={onCancel}>
            <Tabs defaultActiveKey="login">
                <TabPane tab="登录" key="login">
                    <Login close={onCancel} />
                </TabPane>
                <TabPane tab="注册" key="register">
                    <Register close={onCancel} />
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default AppHeader;

