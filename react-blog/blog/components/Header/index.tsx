import styles from './index.module.less'
import { Row, Col, Menu} from 'antd'
import { FunctionComponent } from 'react'
import {
  HomeOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const Header: FunctionComponent = () => {
  return <div className={styles.header}>
    <Row type="flex" justify="space-between">
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        <span className={styles.logo}>小橘子</span>
        <span className={styles.descrtion}>哈密瓜花蜜瓜</span>
      </Col>
      {/* TODO: 小于 768 使用图标代替 */}
      <Col xs={0} sm={0} md={14} lg={8} xl={6} >
        <Menu mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>首页</Menu.Item>
          <Menu.Item key="video" icon={<VideoCameraOutlined />}>视频</Menu.Item>
          <Menu.Item key="life" icon={<SmileOutlined />}>生活</Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
}

export default Header