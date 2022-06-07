import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
    status: string
}

function ArtStatusText(props: Props) {
    const {status} = props;
    return <InfoCircleOutlined color="" />
}

export default ArtStatusText