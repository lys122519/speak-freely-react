import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Card, Col, List, Row, Skeleton } from "antd";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTestFetch } from "../../../hooks/fetch";

const SearchResult: React.FC = () => {
    return (
        <>
            <div className="content" style={{marginTop: 10}}>
                <Row justify="center">
                    <Col span={18}>
                        <Card>
                            <ArtList />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `文章标题 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        '我是用户名',
    content:
        '我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容',
}));

const ArtList: React.FC = () => {
    const [listData, loading] = useTestFetch(data, []);
    const [p] = useSearchParams();

    useEffect(() => {
        console.log(p.get("tag"))
    }, [p])

    return loading
        ? <Skeleton active />
        : < List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }
            }
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <Button type="link" size="small" icon={<StarOutlined />} key="list-vertical-star-o">156</Button>,
                        <Button type="link" size="small" icon={<LikeOutlined />} key="list-vertical-like-o">156</Button>,
                        <Button type="link" size="small" icon={<MessageOutlined />} key="list-vertical-message">2</Button>,
                    ]}
                // extra={
                //     <img
                //         width={272}
                //         alt="logo"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                // }
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
}

export default SearchResult;