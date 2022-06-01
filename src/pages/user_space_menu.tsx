import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./user_space_menu.less";

const UserSpaceBaseContent: React.FC = () => {
    const nav = useNavigate();
    const [select, setSelect] = useState("art-list");
    useEffect(() => {
    }, [select])
    const items = [
        { label: '文章列表', key: 'art-list' }, // 菜单项务必填写 key
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
                style={{ width: 200, height: "100%" }}
                defaultSelectedKeys={['art-list']}
                mode="inline"
                items={items}
            />
        </div>
    )
}

export default UserSpaceBaseContent;