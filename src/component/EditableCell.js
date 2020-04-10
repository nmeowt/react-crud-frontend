import React from 'react';
import { Input, Form } from 'antd';
import SelectForm from './SelectForm';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    setSelectValue,
    ...restProps
}) => {
    const inputNode = inputType === 'object' ? <SelectForm studentClass={record.studentClass} setSelectValue={setSelectValue} /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

export default EditableCell;