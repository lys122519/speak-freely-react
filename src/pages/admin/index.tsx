import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminMenu from "./menu";

const { Content, Sider } = Layout;

const AdminIndex: React.FC = () => {
    return <>
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <AdminHeader />
            <Layout>
                <Sider style={{width:260}}>
                    <AdminMenu />
                </Sider>
                <Content style={{padding: 10, minWidth: 1500}}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </>
}

export default AdminIndex;