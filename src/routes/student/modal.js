import React from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { callAPI } from '../../lib';
import { API } from '../../config/const';

const { Option } = Select;

const params = {
    nameStudent: '',
    studentClass: {
        idClass: '',
    }
}
export default class StudentModal extends React.Component {
    state = {
        name: '',
        classStudent: '',
        classes: [],
    }

    formRef = React.createRef();

    componentDidMount() {
        this._fetchClassData();
    }

    _handleOk = () => {
        this._onSaveStudent();
        this.props.onCloseModal(false);
    }

    _onCancelModal = () => {
        this.props.onCloseModal(false);
    }

    _fetchClassData = () => {
        new callAPI(API.LIST_CLASS, "GET").call().then(classes => this.setState({ classes }));
    }

    _onSaveStudent = () => {
        params.nameStudent = this.state.name;
        params.studentClass.idClass = this.state.classStudent;
        console.log(params);
        new callAPI(API.ADD_UPDATE_STUDENT, "POST", params).call().then(response => console.log(response));
    }

    render() {
        const { classes, name, classStudent } = this.state;

        return (
            <Modal
                title={"Add New Student"}
                visible={this.props.isOpen}
                onOk={this._handleOk}
                onCancel={this._onCancelModal}
            >
                <Form ref={this.formRef} name="control-ref">
                    <Form.Item
                        name="name"
                        label="Name Student"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input values={name} onChange={value => this.setState({ name: value.target.value })} />
                    </Form.Item>
                    <Form.Item
                        name="class"
                        label="Class"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a class"
                            values={classStudent}
                            onChange={classStudent => this.setState({ classStudent })}
                            allowClear
                        >
                            {classes.map(stdClass => (
                                <Option key={stdClass.nameClass} value={stdClass.idClass}>{stdClass.nameClass}</Option>
                            ))
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}