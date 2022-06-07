import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

interface Props {
    status: string
}

function ArtStatusText(props: Props) {
    const { status } = props;
    return (
        <>{(() => {
            if (status == "未启用") {
                return <Text style={{ color: "#ffa940" }}><InfoCircleOutlined />{status}</Text>
            }
            else if (status == "启用") {
                return <Text style={{ color: "green" }}><CheckCircleOutlined />{status}</Text>
            }
        })()}</>
    )
}

export default ArtStatusText