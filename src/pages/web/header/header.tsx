import { Avatar, Button, Col, Dropdown, Image, Layout, Menu, message, Modal, Row, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EditOutlined, PoweroffOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import "./header.less";
import Register from "./rigister";
import Login, { FaceLogin } from "./loginform";
import { UserContext } from "../../../context/user";
import { Link } from "react-router-dom";
import Search from "./search";
import req from "../../../request";
import config from "../../../config";
import logo from "../../../image/logo.png";

const {
    Header
} = Layout;

const {
    TabPane
} = Tabs;

const UserMenu = () => {
    const { userinfo, setUser } = useContext(UserContext);
    return (
        <Menu
            items={[
                {
                    key: 'logout',
                    label: (
                        <Button type="link" icon={<PoweroffOutlined />} onClick={() => {
                            setUser(undefined);
                            req({
                                url: config.host + "/user/signOut",
                                headers: {
                                    token: userinfo?.token ?? ""
                                },
                                method: "POST"
                            })
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
                <Col><Image src={logo} height={40} /></Col>
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
                <Col span={8} style={{ alignItems: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}><Search /></Col>
                <Col>
                    <div className="user-content">
                        {
                            !(userinfo && userinfo.status)
                                ? <LoginFormBox />
                                : <UserAvatar />
                        }
                    </div>
                </Col>
            </Row>

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




const LoginFormBox: React.FC = (props) => {
    const [isVisible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const [select, setSelect] = useState("login");
    
    const onCancel = () => {
        setSelect("login");
        setVisible(false);
    }

    return (
        <>
            <Button type="link" onClick={() => setVisible(true)}>登录/注册</Button>
            <Modal destroyOnClose={true} style={{ top: 240 }} afterClose={() => {setSelect("login")}} width={600} visible={isVisible} footer={null} onCancel={onCancel}>
                <Tabs activeKey={select} onChange={(act) => { setSelect(act) }} >
                    <TabPane tab="登录" key="login">
                        <Login visible={isVisible ?? false} close={onCancel} />
                    </TabPane>
                    <TabPane tab="人脸识别" key="face">
                        <FaceLogin visible={isVisible && select === "face"} loading={loading} onLogin={async (base) => {
                            setLoading(true);
                            try {
                                let res = await req({
                                    method: "POST",
                                    url: config.host + "/user/login",
                                    data: { userFace: base.split("base64,")[1] },
                                });
                                if (res.data.code === 200) {
                                    message.success("登录成功");
                                    setUser({
                                        status: 1,
                                        ...res.data.data
                                    });
                                    onCancel()
                                } else {
                                    message.error(res.data.msg);
                                }
                            } catch (err: any) {
                                message.error(err.text);
                            } finally {
                                setLoading(false);
                            }
                        }} />
                    </TabPane>
                    <TabPane tab="注册" key="register">
                        <Register close={onCancel} />
                    </TabPane>
                </Tabs>
            </Modal>
        </>

    )
}

export default AppHeader;

