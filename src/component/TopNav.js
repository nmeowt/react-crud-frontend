import React from 'react';
import styles from './style/topnav.module.scss'
import { Col } from 'antd';

export default class TopNav extends React.Component {
    render() {
        return (
            <div className={styles.topNav}>
                <Col span={18} offset={3}>
                    <div className={styles.navItems}>
                        <span className={styles.logo}>Crud App</span>
                    </div>
                </Col>
            </div>
        )
    }
}