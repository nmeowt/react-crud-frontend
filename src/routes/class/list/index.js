import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Form, Modal, Button } from 'antd';
import { callAPI } from '../../../lib';
import { API } from '../../../config/const';
import EditableCell from '../../../component/EditableCell';


import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const ListClass = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        new callAPI(API.LIST_CLASS, "GET").call().then(classes => {
            let keys = [];
            for (let i = 0; i < classes.length; i++) {
                keys.push({
                    keys: i.toString()
                });
            }
            const mergeKey = classes.map((e, i) => {
                e.key = keys[i].keys;
                return e;
            })
            setClasses(mergeKey);
        });
    }

    const updateData = (params) => {
        new callAPI(API.ADD_UPDATE_CLASS, "POST", params).call().then(response => console.log(response));
    }

    const deleteData = (params) => {
        new callAPI(API.DELETE_CLASS, "POST", params).call().then(response => console.log(response));
    }

    const isEditing = record => record.key === editingKey;

    const setSelectValue = value => {
        form.setFieldsValue({ studentClass: value[0] });
    }

    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const deleteRecord = record => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: record.nameClass,
            onOk() {
                deleteData(record);
                fetchData();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const studentClass = classes.filter(stdClass => stdClass.key === key);
            const data = studentClass.map((e) => {
                e.nameClass = row.nameClass;
                return e;
            })
            updateData(data[0]);
            setEditingKey('');
            fetchData();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: '#',
            width: '10%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'nameClass',
            key: 'name',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="link" size="small"
                            onClick={() => save(record.key)}>
                            Save
                        </Button>
                        <Button type="link" size="small"
                            onClick={cancel}>
                            Cancel
                        </Button>
                    </span>
                ) : (
                        <div>
                            <Button type="link" size="small"
                                disabled={editingKey !== ''}
                                onClick={() => edit(record)}
                                style={{
                                    marginRight: 8,
                                }}>
                                Edit
                            </Button>
                            <Button type="link" size="small" danger disabled={editingKey !== ''} onClick={() => deleteRecord(record)}>
                                Delete
                            </Button>
                        </div>
                    );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                setSelectValue: setSelectValue
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={classes}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default ListClass;