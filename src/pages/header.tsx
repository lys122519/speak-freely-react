import { Avatar, Button, Layout, Menu, Modal, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import "./header.less";
import Register from "./rigister";
import { useForm } from "antd/lib/form/Form";
import Login from "./loginform";
import { UserContext, UserInfo } from "../context/user";
import { Link } from "react-router-dom";

const {
    Header
} = Layout;

const {
    TabPane
} = Tabs;


const AppHeader: React.FC<any> = (props) => {
    const { userinfo, setUser } = useContext(UserContext);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [select, setSelect] = useState("/h/home");
    const navgite = useNavigate();
    useEffect(() => {
        navgite(select);
    }, [select])
    const headerMenu = [
        { key: "/h/home", label: "首页" },
        { key: "/h/articles", label: "文章" },
        { key: "/h/projects", label: "项目" },
    ]

    return (
        <Header style={{ background: "#fff" }}>
            <div className="header-content">
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[select]}
                    items={headerMenu}
                    onClick={(info) => {
                        if (info.key !== select) {
                            setSelect(info.key);
                        }
                    }}
                />
                <div className="user-content">
                    {
                        !(userinfo && userinfo.status)
                            ? <Button type="link" onClick={() => { setFormVisible(true) }}>登录/注册</Button>
                            : <UserAvatar />
                    }
                </div>
            </div>
            <LoginFormBox isShow={formVisible} onCancel={() => { setFormVisible(false) }} />
        </Header>
    )
}


const UserAvatar = () => {
    const {userinfo} = useContext(UserContext);
    return (
        <Link to={`/space/${(userinfo as UserInfo).id}/art-list`} >
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Link>
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
        <Modal style={{ top: 240 }} visible={isShow} footer={null} onCancel={onCancel}>
            <Tabs defaultActiveKey="login">
                <TabPane tab="登录" key="login">
                    <Login close={onCancel} />
                </TabPane>
                <TabPane tab="注册" key="register">
                    <Register />
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default AppHeader;

