import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./user_space_menu.less";

const UserSpaceBaseContent: React.FC = () => {
    const nav = useNavigate();
    const [select, setSelect] = useState("art-list");
    const location = useLocation();

    useEffect(() => {
        setSelect(location.pathname.split("/").pop() as string);
    }, [location]);
    const items = [
        { label: '基本信息', key: 'base-info' },
        { label: '账户设置', key: 'acount-set' },
        {
            label: '内容管理',
            key: 'content-admin',
            children: [
                { label: '文章管理', key: 'article-set' },
                { label: '评论管理', key: 'comment-set' }
            ]
        }
    ];

    return (
        <div className="user-space-base-content">
            <Menu
                onClick={(info) => {
                    setSelect(info.key)
                    if (info.key !== select) {
                        nav(info.key);
                    }
                }}
                style={{ width: 256, height: "100%" }}
                selectedKeys={[select]}
                items={items}
                mode="inline"
            />
        </div>
    )
}

export default UserSpaceBaseContent;