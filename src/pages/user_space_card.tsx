import { Avatar, Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";
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
                <Avatar size={80} icon={<UserOutlined />} src={userinfo?.avatar_url} style={{backgroundColor: "#87d068"}} />
            </div>
            <div  onClick={() => { }} className="user-space-card-name">
                <a>{userinfo?.nickname}</a>
            </div>
            <div className="user-space-card-email">
                <a>{userinfo?.email}</a>
            </div>
            <div className="user-space-card-model1">
                <a onClick={() => { }} className="model">
                    <div className="figure">123</div>
                    <div className="name">关注</div>
                </a>
                <Divider type="vertical" style={{height: 30}} />
                <a onClick={() => { }} className="model">
                    <div className="figure">12</div>
                    <div className="name">文章</div>
                </a>
                <Divider type="vertical" style={{height: 30}} />
                <a onClick={() => { }} className="model">
                    <div className="figure">0</div>
                    <div className="name">项目</div>
                </a>
            </div>
            <Divider />
            <div className="user-space-card-model2">
                <a onClick={() => { }}>待添加</a>
                <a onClick={() => { }}>待添加</a>
                <a onClick={() => { }}>待添加</a>
                <a onClick={() => { }}>待添加</a>
            </div>
        </div>
    )



}


export default UserSpaceCard;