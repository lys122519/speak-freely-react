import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, List, Row, Skeleton, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { useFetch, useTestFetch } from "../../../hooks/fetch";
import { ArticleDataFetchResponseData } from "../../../types/article";

const { Text, Title } = Typography;


const SearchResult: React.FC = () => {
    return (
        <>
            <div className="content" style={{ marginTop: 10 }}>
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

const ArtList: React.FC = () => {
    const [listData, , setOps, loading] = useFetch<ArticleDataFetchResponseData | undefined>({}, undefined);
    const [p] = useSearchParams();
    const [page, setPage] = useState(1);
    const { userinfo } = useContext(UserContext);

    useEffect(() => {
        setOps({
            path: `/article/search/${page}/${10}`,
            data: {
                searchTagID: p.get("tag"),
                searchArticleTitle: p.get("search"),
            },
            method: "GET",
            token: userinfo?.token
        });
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
            dataSource={listData?.records}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Text key="list-vertical-star-o"><StarOutlined /> 156</Text>,
                        <Text key="list-vertical-like-o"><LikeOutlined /> 156</Text>,
                        <Text key="list-vertical-message"><MessageOutlined /> 2</Text>,
                    ]}
                // extra={
                //     <img
                //         width={272}
                //         alt="logo"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                // }
                >
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Link to={`/h/article/${item.id}`}><Title level={4}>{item.name}</Title></Link>
                            {item.tagsContent.split(";").map((tag, index) => {
                                return <Link key={item.tagsID.split(";")[index]} to={`/h/search?tag=${item.tagsID.split(";")[index]}&tag_content=${tag}`}><Tag>{tag}</Tag></Link>
                            })}
                        </Col>
                        <Col style={{ color: "#999" }}>作者：<Link to={`/h/space/${item.userId}`}>{item.authorNickname}</Link></Col>
                    </Row>
                </List.Item>
            )}
        />
}

export default SearchResult;