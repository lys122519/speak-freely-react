import { RightOutlined } from "@ant-design/icons";
import { Menu, MenuProps, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTestFetch } from "../../../hooks/fetch";
import "./home.less";

const { Title, Text } = Typography;


const tag = new Array(30).fill("计算机");
const talks: { title: string, describe: string }[] = new Array(5).fill({ title: "肖战致使全球变暖，环保少女表示:'how dare you!'", describe: "肖战竟然引起了海平面上升，这究竟是怎么一回事呢？就让小编带你一起了解吧！" });

const Home: React.FC<any> = () => {
    const [tagsdata, tagLoading] = useTestFetch<any[]>(tag, []);
    const [talksdata, talkLoading] = useTestFetch(talks, []);


    return (
        <div className="page-content">
            <div className="tags-and-hot">
                <div className="tags-card">
                    {
                        tagLoading
                            ? <Skeleton paragraph={{ rows: 2, width: "100%" }} title={false} active />
                            : <div className="tags-content">
                                {tagsdata.map((item, index) => {
                                    return <div key={index} className="tags-item" >{item}</div>
                                })}
                            </div>
                    }
                </div>
                <div className="hot-card">
                    <div className="hot-talk">
                        <div className="card-title">
                            <Title ellipsis={true} level={3}>热点讨论</Title>
                            <RightOutlined size={24} color="#f7f7f7" />
                        </div>
                        {
                            talkLoading
                                ? new Array(5).fill(0).map((_, index) => {
                                    return <Skeleton paragraph={{ rows: 1, width: "100%" }} key={index} active />
                                })
                                : talksdata.map((item, index) => {
                                    return (
                                        <div className="list-item">
                                            <Title ellipsis={true} level={5} key={index}>{item.title}</Title>
                                            <Text ellipsis={true} key={index} type="secondary">{item.describe}</Text>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="hot-article">
                        <div className="card-title">
                            <Title ellipsis={true} level={3}>精选文章</Title>
                            <RightOutlined size={24} color="#f7f7f7" />
                        </div>
                        {
                            talkLoading
                                ? new Array(5).fill(0).map((_, index) => {
                                    return <Skeleton paragraph={{ rows: 1, width: "100%" }} key={index} active />
                                })
                                : talksdata.map((item, index) => {
                                    return (
                                        <div className="list-item">
                                            <Title ellipsis={true} level={5} key={index}>{item.title}</Title>
                                            <Text ellipsis={true} key={index} type="secondary">{item.describe}</Text>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="hot-project">
                        <div className="card-title">
                            <Title ellipsis={true} level={3}>优秀项目</Title>
                            <RightOutlined size={24} color="#f7f7f7" />
                        </div>
                        {
                            talkLoading
                                ? new Array(5).fill(0).map((_, index) => {
                                    return <Skeleton paragraph={{ rows: 1, width: "100%" }} key={index} active />
                                })
                                : talksdata.map((item, index) => {
                                    return (
                                        <div className="list-item">
                                            <Title ellipsis={true} level={5} key={index}>{item.title}</Title>
                                            <Text ellipsis={true} key={index} type="secondary">{item.describe}</Text>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <Content />
                </div>
            </div>
        </div>
    )
}

const Content: React.FC<any> = (props) => {
    const [menuSelect, setSelect] = useState("recommendation");
    const nav = useNavigate();
    useEffect(() => {
        nav(`/h/home/${menuSelect}`);
    }, [menuSelect, nav])
    const items: MenuProps['items'] = [
        {
            label: '关注',
            key: 'focus',
        },
        {
            label: '推荐',
            key: 'recommendation',
        },
        {
            label: '热榜',
            key: 'hot',
        }
    ];
    return (
        <div style={{background: "#fff"}}>
            <Menu onClick={(info) => { setSelect(info.key) }} selectedKeys={[menuSelect]} mode="horizontal" items={items} />
            <Outlet />
        </div>
    )
}





export default Home;