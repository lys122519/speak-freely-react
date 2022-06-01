import { Avatar, Button, Checkbox, Col, Form, Input, Row} from "antd";
import "./user_space_card.less";
import { UserOutlined } from "@ant-design/icons";

interface UserSpaceCardProps {

}
const UserSpaceCard: React.FC<UserSpaceCardProps> = (props) =>{
    return(
        <div className="user-space-card-main">
            <div className="user-space-card-img">
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div  onClick={() => { }} className="user-space-card-name">
                <a>用户名</a>
            </div>
            <div className="user-space-card-email">
                <a>00000000000@163.com</a>
            </div>
            <div className="user-space-card-model1">
                <a onClick={() => { }} className="model">
                    <div className="figure">123</div>
                    <div className="name">关注</div>
                </a>
                <a onClick={() => { }} className="model">
                    <div className="figure">12</div>
                    <div className="name">文章</div>
                </a>
                <a onClick={() => { }} className="model">
                    <div className="figure">0</div>
                    <div className="name">项目</div>
                </a>
            </div>
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