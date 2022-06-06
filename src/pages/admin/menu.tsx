import { BarChartOutlined, FileTextOutlined, InfoCircleOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminMenu: React.FC = () => {
    const nav = useNavigate();
    const [select, setSelect] = useState("");
    const location = useLocation();

    useEffect(() => {
        setSelect(location.pathname.split("/").pop() as string);
    }, [location]);
    const items = [
        {
            label: '网站数据',
            key: 'site-data',
            icon: <BarChartOutlined />,
            children: [
                {
                    label: '服务器数据',
                    key: 'server-data',
                    icon: <BarChartOutlined />,
                },
                {
                    label: '业务数据',
                    key: 'business-data',
                    icon: <BarChartOutlined />,
                }
            ]
        },
        { label: '文章管理', key: 'article', icon: <FileTextOutlined /> },
        { label: '评论管理', key: 'comment', icon: <MessageOutlined /> },
        {
            label: '举报',
            key: 'report',
            icon: <InfoCircleOutlined />
        },
        {
            label: '用户管理',
            key: 'user',
            icon: <UserOutlined />
        }
    ];

    return (
        <div className="admin-menu-box">
            <Menu
                onClick={(info) => {
                    setSelect(info.key)
                    if (info.key !== select) {
                        nav(info.key);
                    }
                }}
                defaultOpenKeys={["site-data"]}
                selectedKeys={[select]}
                items={items}
                mode="inline"
                theme="dark"
            />
        </div>
    )
}

export default AdminMenu;