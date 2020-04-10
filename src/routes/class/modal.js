import React from 'react';
import { Form, Input, Modal } from 'antd';
import { callAPI } from '../../lib';
import { API } from '../../config/const';

const params = {
    nameClass: ''
}
export default class ClassModal extends React.Component {
    state = {
        name: '',
    }

    formRef = React.createRef();

    _handleOk = () => {
        this._onSaveClass();
        this.props.onCloseModal(false);
    }

    _onCancelModal = () => {
        this.props.onCloseModal(false);
    }

    _onSaveClass = () => {
        params.nameClass = this.state.name;
        new callAPI(API.ADD_UPDATE_CLASS, "POST", params).call().then((response) => console.log(response));
    }

    render() {

        return (
            <Modal
                title={"Add New Class"}
                visible={this.props.isOpen}
                onOk={this._handleOk}
                onCancel={this._onCancelModal}
            >
                <Form ref={this.formRef} name="control-ref">
                    <Form.Item
                        name="name"
                        label="Name Class"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input onChange={value => this.setState({ name: value.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}