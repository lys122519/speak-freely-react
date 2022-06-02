import React, { useState } from 'react'
import Editor from 'for-editor'
import { Button } from 'antd';

const ArtEditor: React.FC = (props) => {
    const [editorValue, setEditorValue] = useState("# （在这里输入标题）");
    //const [imageUrl, setImageUrl] = useState("");
    const handleChange = (value: any) => {
        setEditorValue(value);
    }
    const uploadHandler = (params: any) => {
        // fetch.get('getQiniuToken', {
        //     token: JSON.parse(Cookies.get('loginInfo')).token
        // }).then(res => {
        //     utils.uploadFile(params, res.data.qiniuToken).then(res => {
        //         setImageUrl('http://img.xuweijin.com/' + res)
        //         let str = editorValue + '![alt](http://img.xuweijin.com/' + res + ')'
        //         setEditorValue(str);
        //     })
        // })
    }

    return (
        <>
            <div>
                <Button type="primary">发布</Button>
                <Button type="default">保存</Button>
            </div>
            <Editor
                subfield={true}
                preview={true}
                addImg={(file) => uploadHandler(file)}
                value={editorValue}
                onChange={(value) => {
                    console.log(value)
                    handleChange(value)
                }}

            />
        </>
    )
}

export default ArtEditor;