import { Avatar, Divider } from "antd";
import "./user_space_card.less";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../context/user";

interface UserSpaceCardProps {

}
const UserSpaceCard: React.FC<UserSpaceCardProps> = (props) =>{
    const {userinfo} = useContext(UserContext);


    return(
        <div className="user-space-card-main">
            <div className="user-space-card-img">
                <Avatar size={80} icon={<UserOutlined />} src={userinfo?.avatarUrl} style={{backgroundColor: "#87d068"}} />
            </div>
            <div  onClick={() => { }} className="user-space-card-name">
                <div>{userinfo?.nickname}</div>
            </div>
            <div className="user-space-card-email">
                <div>{userinfo?.email}</div>
            </div>
            <div className="user-space-card-model1">
                <div onClick={() => { }} className="model">
                    <div className="figure">123</div>
                    <div className="name">关注</div>
                </div>
                <Divider type="vertical" style={{height: 30}} />
                <div onClick={() => { }} className="model">
                    <div className="figure">12</div>
                    <div className="name">文章</div>
                </div>
                <Divider type="vertical" style={{height: 30}} />
                <div onClick={() => { }} className="model">
                    <div className="figure">0</div>
                    <div className="name">项目</div>
                </div>
            </div>
            <Divider />
            <div className="user-space-card-model2">
                <div onClick={() => { }}>待添加</div>
                <div onClick={() => { }}>待添加</div>
                <div onClick={() => { }}>待添加</div>
                <div onClick={() => { }}>待添加</div>
            </div>
        </div>
    )



}


export default UserSpaceCard;