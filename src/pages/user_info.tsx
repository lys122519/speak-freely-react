import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, message, PageHeader, Row, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useContext, useEffect, useState } from "react";
import config from "../config";
import { UserContext } from "../context/user";
import req from "../request";
import "./user_info.less";


const UserInfo: React.FC = () => {
    const [baseInfoForm] = useForm();
    const { userinfo, setUser } = useContext(UserContext);
    const [time, setTime] = useState(0);
    const [emailForm] = useForm();
    const [baseInfoStatus, setBaseInfoStatus] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [baseLoading, setBaseLoading] = useState(false);
    const [emaiLoading, setEmailLoading] = useState(false);

    useEffect(() => {
        baseInfoForm.setFieldsValue(userinfo)
    }, [userinfo, baseInfoForm])

    const onEmailSubmit = async () => {
        setEmailLoading(true);
        try {
            let email = emailForm.getFieldValue("newemail");
            let res = await req({
                url: config.host + "/user/emailModify",
                method: "POST",
                data: {
                    email: email,
                    token: userinfo?.token,
                    code: emailForm.getFieldValue("code")
                }
            });
            if (res.data.code === 200) {
                message.success("修改成功");
                setEmailStatus(false);
                setUser((u) => {
                    return {
                        ...u,
                        email: email,
                        
                    } as any
                })
            } else {
                message.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
        } finally {
            setEmailLoading(false);
        }
    }

    const onBaseInfoSubmit = async () => {
        setBaseLoading(true);
        try {
            let res = await req({
                url: config.host + "/user/infoModify",
                method: "POST",
                data: {
                    ...baseInfoForm.getFieldsValue(),
                    token: userinfo?.token
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

    const uploadButton = (
        <div>
            {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );

    const getCode = async () => {
        try {
            let error = emailForm.getFieldError("newemail")
            let email = emailForm.getFieldValue("newemail");
            if (!error.length && email) {
                let res = await req({
                    url: config.host + `/user/emailCode/emailModify/${email}`,
                    method: "POST"
                });
                if (res.data.code === 200) {
                    setTime(60);
                    let timer = setInterval(() => {
                        setTime((time) => {
                            if (time === 0) {
                                clearInterval(timer);
                                return 0;
                            }
                            return time - 1;
                        });
                    }, 1000);
                } else {
                    message.error(res.data.msg);
                }
            } else {
                emailForm.validateFields(["newemail"]);
            }
        } catch (err) {
            console.log(err);
            message.error("发生异常，详见控制台");
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
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info.file)
            const mod = async () => {
                let res = await req({
                    url: config.host + "/user/infoModify",
                    method: "POST",
                    data: {
                        avatarUrl: info.file.response.data,
                        token: userinfo?.token
                    }
                });
                if (res.data.code === 200) {
                    setUser((u) => {
                        return {
                            ...u,
                            avatar_url: info.file.response.data
                        } as any
                    });
                }
                setAvatarLoading(false);
            }
            mod();
        }
        if (info.file.status === "error") {
            setAvatarLoading(false);
            message.error("上传失败,请稍后重试");
            console.log(info.file)
        }
    };


    return (
        <div className="user-info-app">
            <PageHeader
                className="site-page-header"
                title="头像"
            />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                size="small"
            >
                <Form.Item
                    label="头像"
                >
                    <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={config.host + "/files/upload"}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}

                    >
                        {userinfo?.avatarUrl ? <Avatar src={userinfo.avatarUrl} size={80} /> : uploadButton}
                    </Upload>

                </Form.Item>
            </Form>

            <PageHeader
                className="site-page-header"
                title="基本信息"
            />
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
            <PageHeader
                className="site-page-header"
                title="邮箱"
            />
            <Form
                name="email"
                form={emailForm}
                labelCol={{ span: 4 }}
                onFinish={onEmailSubmit}
                wrapperCol={{ span: 12 }}
                className="email-form"
                size="middle"
            >
                <Form.Item label="邮箱">
                    <Input
                        style={{ color: "#000", cursor: "default" }}
                        disabled
                        bordered={false}
                        value={userinfo?.email}
                    />
                </Form.Item>
                {emailStatus ? (
                    <>
                        <Form.Item
                            label="新邮箱"
                            name="newemail"
                            rules={[{ required: true, message: '请输入正确的邮箱', type: "email" }]}
                        >
                            <Input
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 14 }} noStyle>
                            <Row gutter={0}>
                                <Col span={12}>
                                    <Form.Item
                                        label="验证码"
                                        name="code"
                                        rules={[{ required: true, message: '请输入正确的验证码', pattern: /^[A-Za-z0-9]{4}$/ }]}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                    >
                                        <Input autoComplete="off" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        disabled={!!time}
                                        onClick={getCode}
                                        block
                                    >
                                        {time ? `${time}` : "获取验证码"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </>
                ) : null}
                <Form.Item
                    wrapperCol={{ offset: 4 }}
                >
                    {emailStatus ?
                        <>
                            <Button type="link" htmlType={"submit"} loading={emaiLoading}>保存</Button>
                            <Button type="link" onClick={() => {
                                setEmailStatus(false);
                            }}>取消</Button>
                        </>
                        : <Button type="link" key="email-edit" onClick={() => {
                            setEmailStatus(true);
                        }} >更改</Button>}
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserInfo;