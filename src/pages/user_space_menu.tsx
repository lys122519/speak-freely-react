import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./user_space_menu.less";

const UserSpaceBaseContent: React.FC = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [select, setSelect] = useState("art-list");
    useEffect(() => {
        setSelect(location.pathname.split("/").pop() as string);
    }, [location]);
    const items = [
        { label: '文章列表', key: 'art-list' }, // 菜单项务必填写 key
        { label: '项目列表', key: 'project-list' },
        { label: '基本信息', key: 'base-info' },
        { label: '修改密码', key: 'mod-pass' },
      ];

    return (
        <div className="user-space-base-content">
            <Menu
                onClick={(info) => {
                    setSelect(info.key)
                    if(info.key !== select) {
                        nav(info.key);
                    }
                }}
                style={{ width: 256, height: "100%" }}
                selectedKeys={[select]}
                mode="inline"
                items={items}
            />
        </div>
    )
}

export default UserSpaceBaseContent;