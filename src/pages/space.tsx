import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./space.less";
import UserSpaceMenu from "./user_space_menu";
import UserSpaceCard from "./user_space_card";

const { Header, Content } = Layout;

const UserSpace: React.FC = () => {
    return (
        <div>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header>222</Header>
                <Content style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div className="user-space-content">
                        <div className="left">
                            <div className="user-card">
                                <UserSpaceCard/>
                            </div>
                        </div>
                        <div className="right">
                            <div className="menu-box">
                                <UserSpaceMenu />
                            </div>
                            <div className="content-page">
                                    <Outlet />
                                </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default UserSpace;