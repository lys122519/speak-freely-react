import { AutoComplete, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/fetch";
import { TagData } from "../art_editor/article_editor";

const Search: React.FC = () => {
    const [hotTagsRes] = useFetch<any>({
        path: "/tags/top100",
    }, []);
    const [value, setValue] = useState("");
    const [select, setSelect] = useState<TagData | undefined>(undefined);
    const nav = useNavigate();

    useEffect(() => {
        if(select) {
            setValue("");
        }
        if(select || value) {
            nav(`/h/search?${select ? `tag=${select.id}&` : ""}search=${select ? "" : value}`);
        }
    }, [select, nav]);

    let hotTags: TagData[] = [];

    for(let key in hotTagsRes) {
        hotTags.push(hotTagsRes[key]);
    }

    const handleSearch = (value: string) => {
        console.log(1)
        if(select || value) {
            nav(`/h/search?${select ? `tag=${select.id}&` : ""}search=${value}`);
        } 
    }

    const onSelect = (_: any, option: any) => {
        setSelect({
            content: option.label,
            id: option.value
        });
        return false;
    }


    return (
        <>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                
                options={hotTags.map((item) => {
                    return {
                        label: item.content,
                        value: item.id,
                    }
                })}
                filterOption={(inputValue, option) => {
                    if(option?.label.includes(inputValue)) {
                        return true;
                    } else {
                        return false;
                    }
                }}
                value={value}
                onChange={(value) => setValue(value)}
                onSelect={onSelect}
                backfill={false}
            >
                <Input.Search prefix={select ? <Tag color="blue"
                onClose={() => {
                    setSelect(undefined);
                }} closable>{select?.content}</Tag> : null} onSearch={handleSearch} style={{width: "100%"}} size="large" placeholder="搜索" enterButton />
            </AutoComplete>
        </>
    )
}

export default Search;