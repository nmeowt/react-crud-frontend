import React from 'react';
import { Col, Tabs, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ContentTypeEnum } from '../config/type';
import StudentModal from './student/modal';
import ClassModal from './class/modal';
import ListStudent from './student/list';
import ListClass from './class/list';

const { TabPane } = Tabs;

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ContentTypeEnum.STUDENT,
            visible: false,
        }
    }

    _callback = (key) => {
        this.setState({ key });
    }

    _onCloseModal = (value) => {
        this.setState({ visible: value, reload: true })
    }

    _onIsDone = (value) => {
        this.setState({ reload: false })
    }

    render() {
        const { key, visible } = this.state;
        return (
            <Col span={12} offset={6}>
                <Tabs defaultActiveKey="student" onChange={this._callback}>
                    <TabPane tab="Student" key={ContentTypeEnum.STUDENT}>
                        <ListStudent />
                    </TabPane>
                    <TabPane tab="Class" key={ContentTypeEnum.CLASS}>
                        <ListClass />
                    </TabPane>
                </Tabs>
                <div className="add-button">
                    <Button icon={<PlusOutlined />} onClick={() => this.setState({ visible: true })}>ADD</Button>
                </div>
                {
                    key === ContentTypeEnum.STUDENT
                        ? <StudentModal isOpen={visible} onCloseModal={this._onCloseModal} />
                        : <ClassModal isOpen={visible} onCloseModal={this._onCloseModal} />
                }
            </Col>
        )
    }
}