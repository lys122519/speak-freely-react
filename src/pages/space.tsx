import { Layout } from "antd";
import { Outlet } from "react-router-dom";


const { Header, Content } = Layout;

const UserSpace: React.FC = () => {
    return (
        <div>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header>222</Header>
                <Content style={{ flexGrow: 1 }}>
                    <div className="user-space-content">
                        <Outlet />
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default UserSpace;