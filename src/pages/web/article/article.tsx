import { Card, Col, Row, Typography } from "antd";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { useFetch } from "../../../hooks/fetch";
import { TagData } from "../art_editor/article_editor";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./article.less"

const { Title } = Typography;

const MDArticle: React.FC = () => {
    const { articleId } = useParams();
    const [art] = useFetch<{ content: string, tags: TagData[], name: string }>({
        path: `/article/${articleId}`,
    }, { content: "", tags: [], name: "" });

    return (
        <Row justify="center" style={{ marginTop: 10 }}>
            <Col style={{ width: 1000 }}>
                <Card>
                    <Title level={2}>{art.name}</Title>
                </Card>
                <Card style={{ width: "100%" }}>
                    <ReactMarkdown
                        children={art.content}
                        className="art-md"
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={duotoneLight as any}
                                        
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            h1({children, className}) {
                                return <h1 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h1>
                            },
                            h2({children, className}) {
                                if(String(children) === "Table of contents") {
                                    return <h2 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>目录</h2>;
                                }
                                return <h2 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h2>
                            },
                            h3({children, className}) {
                                return <h3 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h3>
                            },
                            h4({children, className}) {
                                return <h4 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h4>
                            },
                            h5({children, className}) {
                                return <h5 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h5>
                            },
                            h6({children, className}) {
                                return <h6 className={className} id={String(children).toLowerCase().replaceAll(" ", "-")}>{children}</h6>
                            }
                        }}
                        remarkPlugins={[remarkToc.bind(this, {heading: ""}), remarkGfm]}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default MDArticle;