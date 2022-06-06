import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;


const AdminHeader:React.FC = () => {
    return <Header>
        <Link to="/h">返回首页</Link>
    </Header>
}

export default AdminHeader;