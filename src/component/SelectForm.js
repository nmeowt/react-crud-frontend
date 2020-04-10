import React, { useState, useEffect } from 'react'
import { Select } from 'antd';
import { callAPI } from '../lib';
import { API } from '../config/const';

const { Option } = Select;
const SelectForm = ({
    studentClass,
    setSelectValue
}) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        new callAPI(API.LIST_CLASS, "GET").call().then(classes => setClasses(classes));
    }

    const onSelected = (data) => {
        setSelectValue(classes.filter(stdClass => stdClass.idClass === data));
    }

    return (
        <Select
            showSearch
            placeholder="Select a class"
            defaultValue={studentClass.idClass}
            onChange={onSelected}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {classes.map(stdClass => (
                <Option
                    key={stdClass.nameClass}
                    value={stdClass.idClass}
                >
                    {stdClass.nameClass}
                </Option>
            ))
            }
        </Select>
    )
}

export default SelectForm;