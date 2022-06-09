import { Button, Card, Col, Form, Input, message, Modal, Row, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useContext, useEffect, useState } from "react";
import config from "../../../../config";
import { UserContext } from "../../../../context/user";
import req from "../../../../request";

const AcountSet: React.FC = () => {
    const { userinfo, setUser } = useContext(UserContext);
    const [form] = useForm();
    const [passwordtime, setPTime] = useState(0);
    const [emaiLoading, setEmailLoading] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [emailTime, setETime] = useState(0);
    const [emailCodeLoading, setECodeLoad] = useState(false);

    const [emailForm] = useForm();

    const getECode = async () => {
        setECodeLoad(true);
        try {
            let error = emailForm.getFieldError("newemail")
            let email = emailForm.getFieldValue("newemail");
            if (!error.length && email) {
                let res = await req({
                    url: config.host + `/user/emailCode/emailModify/${email}`,
                    method: "POST"
                });
                if (res.data.code === 200) {
                    setETime(60);
                    let timer = setInterval(() => {
                        setETime((time) => {
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
        } finally {
            setECodeLoad(false)
        }
    }

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
    return (
        <Space direction="vertical" size={10} style={{ width: "100%", display: "flex" }}>

            <Card title="密码">
                <Form
                    form={form}
                    name="mod-pass"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    style={{ paddingTop: 0 }}
                >
                    <Form.Item
                        label="验证码"
                        name="code"
                    >
                        <Input.Group compact>
                            <Input style={{ width: 'calc(100% - 150px)' }} autoComplete="off" />
                            <Button
                                style={{ width: 150 }}
                                disabled={!!passwordtime}
                                onClick={() => {
                                    setPTime(60);
                                    let timer = setInterval(() => {
                                        setPTime((time) => {
                                            if (time === 0) {
                                                clearInterval(timer);
                                                return 0;
                                            }
                                            return time - 1;
                                        });
                                    }, 1000);
                                }}
                            >
                                {passwordtime ? `${passwordtime}秒后可重新获取` : "获取验证码"}
                            </Button>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newpwd"
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirmpwd"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Button type="primary" htmlType="submit">重置密码</Button>
                    </Form.Item>
                </Form >
            </Card>
            <Card title="邮箱">
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
                                            disabled={!!emailTime}
                                            onClick={getECode}
                                            block
                                            loading={emailCodeLoading}
                                        >
                                            {emailTime ? `${emailTime}` : "获取验证码"}
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
            </Card>
            <Card title="人脸信息">
                <UploadFace />
            </Card>
        </Space>
    )
}

const UploadFace: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<HTMLVideoElement>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const {userinfo} = useContext(UserContext);

    const getEle: React.LegacyRef<HTMLVideoElement> = (e) => { if (e) { setVideo(e) } }
    const getCanvas: React.LegacyRef<HTMLCanvasElement> = (e) => { if (e) { setCanvas(e) } }

    useEffect(() => {
        const videoPaly = async () => {
            let streamPromise = navigator.mediaDevices.getUserMedia({ video: true });
            if (video) {
                video.srcObject = await streamPromise;
                video.play();
            }
        }
        if (video && visible) {
            videoPaly();
        }
        if (video && !visible) {
            const tracks = (video.srcObject as MediaStream).getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
        }
    }, [video, visible]);

    return (
        <>
            <Button onClick={() => setVisible(true)}>上传人脸</Button>
            <Modal title={"上传人脸"} visible={visible} footer={[]} onCancel={setVisible.bind(this, false)}>
                <Row justify="center">
                    <Col>
                        <video style={{ height: 400, width: 400 }} ref={getEle}></video>
                    </Col>
                </Row>

                <canvas style={{ height: 0, width: 0 }} ref={getCanvas}></canvas>
                <Row>
                    <Col offset={2} span={20}>
                        <Button loading={loading} type="primary" block onClick={async () => {
                            if (video && canvas) {
                                canvas?.getContext("2d")?.drawImage(video, 0, 0, 200, 200);
                                const dataURL = canvas.toDataURL('image/png');
                                setLoading(true);
                                try {
                                    let res = await req({
                                        method: "POST",
                                        url: config.host + "/user/faceUpload",
                                        data: {
                                            userFace: dataURL.split("base64,")[1]
                                        },
                                        headers: {
                                            token: userinfo?.token ?? ""
                                        }
                                    });
                                    if (res.data.code === 200) {
                                        message.success("上传成功");
                                        setVisible(false);
                                    } else {
                                        message.error(res.data.msg);
                                    }
                                } catch (err: any) {
                                    message.error(err.text);
                                } finally {
                                    setLoading(false);
                                }
                            }
                        }}>上传</Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default AcountSet;