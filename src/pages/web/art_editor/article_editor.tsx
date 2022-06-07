import React, { useContext, useEffect, useRef, useState } from 'react'
import Editor from 'for-editor'
import { Button, Card, Col, Form, Input, InputRef, message, Modal, Row, Tag, Tooltip } from 'antd';
import "./article_editor.less"
import req from '../../../request';
import config from '../../../config';
import { UserContext } from '../../../context/user';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/fetch';

const ArtEditor: React.FC = (props) => {
    const { articleId } = useParams();
    const [saveId, setSaveId] = useState(articleId);
    const [editorValue, setEditorValue] = useState("");
    const { userinfo } = useContext(UserContext);
    const [ModalLoading, setModalLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<TagData[]>([]);
    const [art] = useFetch<{content: string, tags: TagData[], name:string}>(articleId ? {
        path: `/article/${articleId}`,
        token: userinfo?.token
    } : {}, {content: "", tags: [], name: ""});

    useEffect(() => {
        setEditorValue(art.content);
        setTitle(art.name)
        if(art.tags) {
            setTags(art.tags);
        }
    }, [art])



    const handleChange = (value: any) => {
        setEditorValue(value);
    }
    const uploadHandler = async (file: any) => {
        const hide = message.loading("正在上传...");
        try {
            let formData = new FormData();
            formData.append('file', file);
            let res = await req({
                url: config.host + "/files/upload",
                headers: {
                    token: userinfo ? userinfo.token : ''
                },
                method: "POST",
                data: formData,
            });
            if (res.data.code === 200) {
                message.success("上传成功");
                let str = editorValue + `\n![alt](${res.data.data})`;
                setEditorValue(str);
            } else {
                message.error(res.data.msg)
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            hide();
        }
    }

    const onPublic = async (tags: TagData[]) => {
        setModalLoading(true);
        try {
            let res = await req({
                url: config.host + "/article/action/publish",
                headers: {
                    token: userinfo ? userinfo.token : ''
                },
                method: "POST",
                data: {
                    content: editorValue,
                    name: title,
                    tags: tags.map((item) => {
                        if(typeof item.id === 'number') {
                            return {
                                id: item.id,
                            }
                        } else {
                            return {
                                content: item.content
                            }
                        }
                    }),
                    id: saveId ? parseInt(saveId) : null
                },
            });
            if (res.data.code === 200) {
                message.success("发布成功");
                setSaveId(res.data.data.id);
            } else {
                message.error(res.data.msg)
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setModalLoading(false);
        }
    }

    const onSave = async (tags: TagData[]) => {
        if(editorValue.length < 10 || !title) {
            message.warning("文章质量过差");
            return;
        }

        setModalLoading(true);
        try {
            let res = await req({
                url: config.host + "/article/action/draft",
                headers: {
                    token: userinfo ? userinfo.token : ''
                },
                method: "POST",
                data: {
                    content: editorValue,
                    name: title,
                    tags: tags.map((item) => {
                        if(typeof item.id === 'number') {
                            return {
                                id: item.id,
                            }
                        } else {
                            return {
                                content: item.content
                            }
                        }
                    }),
                    id: saveId ? parseInt(saveId) : null
                },
            });
            if (res.data.code === 200) {
                message.success("保存成功");
                setSaveId(res.data.data.id);
            } else {
                message.error(res.data.msg)
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setModalLoading(false);
        }
    }

    return (
        <div className='editor-page'>
            <div className="content">
                <Input
                    placeholder='在此输入标题'
                    bordered={false}
                    style={{
                        fontSize: 30,
                        fontWeight: 900,
                        background: "#fff"
                    }}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <Editor
                    subfield={true}
                    preview={true}
                    addImg={(file) => uploadHandler(file)}
                    value={editorValue}
                    onChange={(value) => {
                        handleChange(value)
                    }}
                    toolbar={{
                        save: false,
                        expand: true,
                        h1: true,
                        h2: true,
                        h3: true,
                        h4: true,
                        code: true,
                        redo: true,
                        undo: true,
                        img: true,
                        preview: true,
                        subfield: true,
                        link: true,
                    }}
                />
            </div>
            <div className='editor-controls'>
                <Row align='middle' style={{ height: "100%" }} gutter={10}>
                    <Col span={2}>
                        <Row>
                            <Col>
                                共{editorValue.length}字
                            </Col>
                        </Row>
                    </Col>
                    <Col span={22}>
                        <ArticleSet
                            onConfirm={(tags, type) => {
                                if(type === "save") {
                                    return onSave(tags);
                                } else if(type === "public") {
                                    return onPublic(tags);
                                } else {
                                    return Promise.resolve();
                                }
                            }}
                            loading={ModalLoading}
                            onChange={(tags) => {
                                setTags(tags);
                            }}
                            tags={tags}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

interface ArticleSetProps {
    onConfirm: (formFileds: any, actionType: "save" | "public" | "set" | undefined) => void
    loading: boolean
    onChange: (tags: TagData[]) => void
    tags: TagData[]
}

export type TagData = {
    id: number | string
    content: string
}

const ArticleSet: React.FC<ArticleSetProps> = (props) => {
    const { userinfo } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const tags = props.tags;
    const [type, setType] = useState<"save" | "public" | "set" | undefined>();
    const [hotTagsRes] = useFetch<any>({
        path: "/tags/top100",
        token: userinfo?.token
    }, []);

    let hotTags: TagData[] = [];

    for(let key in hotTagsRes) {
        hotTags.push(hotTagsRes[key]);
    }


    return (
        <>
            <Row justify='end' gutter={10}>
                <Col>
                    <Button type="link" onClick={() => {
                        setModalVisible(true);
                        setType("set");
                    }}>文章设置</Button>
                </Col>
                <Col>
                    <Button loading={props.loading} onClick={() => {
                        props.onConfirm(tags, "save");
                    }}>保存</Button>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => {
                        setModalVisible(true);
                        setType("public");
                    }}>发布</Button>
                </Col>
            </Row>
            <Modal
                title="文章设置"
                onCancel={() => setModalVisible(false)}
                footer={
                    (
                        <>
                            <Button onClick={() => setModalVisible(false)}>取消</Button>
                            <Button type='primary' loading={props.loading} onClick={async () => { await props.onConfirm(tags, type); setModalVisible(false) }}>确定</Button>
                        </>
                    )
                }
                visible={modalVisible}
            >
                <Form
                    name='article-set'
                >
                    <Form.Item
                        label="文章标签"
                    >
                        <TagsControl
                            tags={tags}
                            onChange={(tags) => {
                                props.onChange(tags);
                            }} />
                    </Form.Item>
                </Form>
                <Card title="常用标签" bodyStyle={{height: 300, overflowY: "scroll"}}>
                    <Row gutter={[10, 10]}>
                        {hotTags.map((item) => {
                            return <Tag key={`s-${item.id}`} style={{cursor: "pointer"}} onClick={() => {
                                if (tags.map((item) => item.id).indexOf(item.id) === -1 && tags.length < 5) {
                                    props.onChange([...tags, {
                                        content: item.content,
                                        id: item.id
                                    }])
                                } else if(tags.map((item) => item.id).indexOf(item.id) !== -1) {
                                    message.warning("不能重复选择标签");
                                } else {
                                    message.warning("最多可选5个标签");
                                }
                            }} >{item.content}</Tag>
                        })}
                    </Row>
                </Card>
            </Modal>
        </>
    )
}


interface TagsControlProps {
    onChange: (tags: TagData[]) => void
    tags: TagData[]
}

const TagsControl: React.FC<TagsControlProps> = (props) => {
    const [tags] = [props.tags];
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag: number) => {
        tags.splice(removedTag, 1);
        props.onChange(tags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.map((item) => item.content).indexOf(inputValue) === -1) {
            props.onChange([...tags, {id: `u-${inputValue}`, content: inputValue}]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    return (
        <>
            {tags.map((tag, index) => {

                const isLongTag = tag.content.length > 20;

                const tagElem = (
                    <Tag
                        className="edit-tag"
                        key={tag.id}
                        closable={true}
                        onClose={() => handleClose(index)}
                    >
                        <span>
                            {isLongTag ? `${tag.content.slice(0, 20)}...` : tag.content}
                        </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag.content} key={tag.id}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible && (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && tags.length < 5 && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> 新标签
                </Tag>
            )}
        </>
    );
};

export default ArtEditor;