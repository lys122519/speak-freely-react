import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./space.less";
import UserSpaceCard from "./user_space_card";

const { Header, Content } = Layout;

const UserSpace: React.FC = () => {
    return (
        <div>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header>222</Header>
                <Content style={{ flexGrow: 1 }}>
                    <div className="user-space-content">
                        <div className="left">
                            <div className="user-card">
                                <UserSpaceCard/>
                            </div>
                        </div>
                        <div className="right">
                            <div className="user-act-content">

                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default UserSpace;