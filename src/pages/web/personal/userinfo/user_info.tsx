import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, message, PageHeader, Row, Upload, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useContext, useEffect, useState } from "react";
import config from "../../../../config";
import { UserContext } from "../../../../context/user";
import req from "../../../../request";
import "./user_info.less";


const { Title, Text } = Typography;

const UserInfo: React.FC = () => {
    const [baseInfoForm] = useForm();
    const { userinfo, setUser } = useContext(UserContext);

    const [baseInfoStatus, setBaseInfoStatus] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    const [baseLoading, setBaseLoading] = useState(false);


    useEffect(() => {
        baseInfoForm.setFieldsValue(userinfo)
    }, [userinfo, baseInfoForm])

   

    const onBaseInfoSubmit = async () => {
        setBaseLoading(true);
        try {
            let res = await req({
                url: config.host + "/user/infoModify",
                method: "POST",
                headers: {
                    token: userinfo ? userinfo.token : ""
                },
                data: {
                    ...baseInfoForm.getFieldsValue(),
                }
            });
            if (res.data.code === 200) {
                message.success("修改成功");
                setBaseInfoStatus(false);
                setUser((u) => {
                    return {
                        ...u,
                        ...baseInfoForm.getFieldsValue()
                    }
                })
            } else {
                message.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setBaseLoading(false);
        }
    }

    

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        
        if (info.file.status === 'uploading') {
            setAvatarLoading(true);
            return;
        }
        if (info.file.status === 'done' && info.file.response.code === 200) {
            // Get this url from response in real world.
            console.log(info.file)
            const mod = async () => {
                let res = await req({
                    url: config.host + "/user/infoModify",
                    method: "POST",
                    headers: {
                        token: userinfo ? userinfo.token : ""
                    },
                    data: {
                        avatarUrl: info.file.response.data,
                    }
                });
                
                if (res.data.code === 200) {
                    message.success("更改成功");
                    setUser((u) => {
                        return {
                            ...u,
                            avatarUrl: info.file.response.data
                        } as any
                    });
                } else {
                    message.error(res.data.msg);
                }
                setAvatarLoading(false);
            }
            mod();
        }
        if (info.file.status === "error") {
            setAvatarLoading(false);
            message.error("上传失败,请稍后重试");
        }
        if(info.file.response.code !== 200 && info.file.response.msg) {
            message.error(info.file.response.msg);
        }
    };


    return (
        <div className="user-info-app">
            <Card className="card">
                <Row gutter={50}>
                    <Col>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 10 }}
                            size="small"
                        >
                            <Form.Item
                            >
                                <Upload
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action={config.host + "/files/upload"}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    headers={{
                                        token: userinfo ? userinfo.token : ""
                                    }}
                                >
                                    {
                                        userinfo?.avatarUrl
                                            ? <Avatar style={{ cursor: "pointer" }} src={userinfo.avatarUrl} size={80} />
                                            : <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} size={80} />
                                    }
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col>
                        <Title level={3}>{userinfo?.nickname}</Title>
                    </Col>
                </Row>
            </Card>

            <Card title="基本信息" className="card">
                <Form
                    form={baseInfoForm}
                    name="base-info"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
                    size="middle"
                    onFinish={onBaseInfoSubmit}
                >
                    <Form.Item
                        label="用户名"
                    >
                        <Input
                            style={!baseInfoStatus ? { color: "#000", cursor: "default" } : undefined}
                            bordered={baseInfoStatus}
                            disabled={!baseInfoStatus}
                            value={userinfo?.username}
                        />
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        name="nickname"
                        initialValue={userinfo?.nickname}
                    >
                        <Input
                            style={!baseInfoStatus ? { color: "#000", cursor: "default" } : undefined}
                            disabled={!baseInfoStatus}
                            bordered={baseInfoStatus}
                            value={userinfo?.nickname}
                        />
                    </Form.Item>
                    <Form.Item
                        label="手机"
                        name="phone"
                        initialValue={userinfo?.phone}
                    >
                        <Input
                            style={!baseInfoStatus ? { color: "#000", cursor: "default" } : undefined}
                            disabled={!baseInfoStatus}
                            bordered={baseInfoStatus}
                            value={userinfo?.phone}
                        />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                        initialValue={userinfo?.address}
                    >
                        <Input
                            style={!baseInfoStatus ? { color: "#000", cursor: "default" } : undefined}
                            disabled={!baseInfoStatus}
                            bordered={baseInfoStatus}
                            value={userinfo?.address}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 4 }}
                    >

                        {baseInfoStatus ?
                            <>
                                <Button type="link" htmlType={"submit"} loading={baseLoading}>保存</Button>
                                <Button type="link" onClick={() => {
                                    setBaseInfoStatus(false);
                                }}>取消</Button>
                            </>
                            : <Button type="link" key="edit" onClick={() => {
                                setBaseInfoStatus(true);
                            }} >编辑</Button>}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UserInfo;