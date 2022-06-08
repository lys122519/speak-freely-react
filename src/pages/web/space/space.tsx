import { Col, Menu, MenuProps, Row, Space } from "antd";
import { useState } from "react";
import ArticleList from "./article_list";
import UserSpaceCard from "./user_space_card";

const items: MenuProps['items'] = [
    {
        label: '文章',
        key: 'articles',
    },
];

const UserSpace: React.FC = () => {
    const [current, setCurrent] = useState('articles');

    const onClickMenu: MenuProps['onClick'] = e => {
        setCurrent(e.key);
    };

    return (
        <div style={{ marginTop: 10 }}>
            <Row justify="center" gutter={10}>
                <Col span={4} style={{minWidth: 320}}>
                    <UserSpaceCard />
                </Col>
                <Col span={16}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Menu onClick={onClickMenu} selectedKeys={[current]} mode="horizontal" items={items} />
                        <ArticleList />
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default UserSpace;