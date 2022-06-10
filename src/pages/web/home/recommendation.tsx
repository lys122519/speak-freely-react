import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Skeleton, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch, useTestFetch } from "../../../hooks/fetch";
import { ArticleData, ArticleDataFetchResponseData } from "../../../types/article";

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `文章标题 ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        '我是用户名',
    content:
        '我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容',
}));

const Recommendation: React.FC = () => {
    const [page, setPage] = useState(1);
    const [arts, , setOps , , isLoading] = useFetch<ArticleDataFetchResponseData | undefined>({
    }, undefined);

    useEffect(() => {
        setOps({path: `/article/top/${page}/${5}`});
    }, [page])

    return isLoading
        ?  <Skeleton active />
        : < List
            itemLayout="vertical"
            size="large"
            pagination={{
                total: arts?.total,
                pageSize: 5,
                onChange:(p) => {
                    setPage(p)
                },
                current: page
            }}
            dataSource={arts?.records}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={item.tagsID?.split(";").map((tagId, index) => {
                        return <Link key={tagId} to={`/h/search?tag=${tagId}&tag_content=${item.tagsContent?.split(";")[index]}`}><Tag>{item.tagsContent?.split(";")[index]}</Tag></Link>
                    })}
                // extra={
                //     <img
                //         width={272}
                //         alt="logo"
                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                //     />
                // }
                >
                    <List.Item.Meta
                        avatar={<Link to={"/h/space/" + item.userId}><Avatar src={item.authorAvatarUrl} /></Link>}
                        title={<Link to={`/h/article/${item.id}`}>{item.name}</Link>}
                        description={item.authorNickname}
                    />
                    {item.content}
                </List.Item>
            )}
        />
}

export default Recommendation;