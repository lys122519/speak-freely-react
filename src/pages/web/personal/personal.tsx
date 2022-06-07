import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./personal.less";
import UserSpaceMenu from "./user_space_menu";

const { Content } = Layout;

const Personal: React.FC = () => {
    return (
        <div>
            <Layout style={{ display: "flex", flexDirection: "column", minWidth: 1500 }}>
                <Content style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div className="user-space-content">
                        {/* <div className="left">
                            <div className="user-card">
                                <UserSpaceCard />
                            </div>
                        </div> */}
                        <div className="right">
                            <div className="content">
                                <div className="menu-box">
                                    <UserSpaceMenu />
                                </div>
                                <div className="content-page">
                                    <Outlet />
                                </div>
                            </div>

                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default Personal;