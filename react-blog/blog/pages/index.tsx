import Head from 'next/head'
import Image from 'next/image'
import { Col, Row, List } from 'antd'
import Header from '../components/Header'
import { useState } from 'react'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router'

export default function Home() {
  const [mylist, setMylist] = useState(
    [
      { title: '第一', context: 'desc', id: 1 },
      { title: '第而', context: 'desc', id: 2 },
    ]
  )
  const router = useRouter()
  const routeChange = (id: number) => {
    router.push({
      pathname: '/detail',
      query: { id }
    } )
  }

  return (
  <>
    <Head>
      <title>Home</title> 
    </Head>
    <Header/>
    <Row className="main" type="flex" justify="center">
      <Col className="main-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <List
          header={<div>最新日志</div>}
          dataSource={mylist}
          itemLayout="vertical"
          renderItem={item => (
            <List.Item onClick={() => { routeChange(item.id)}}>
              <div className="list-title">{item.title}</div>
              <div className="list-context">{item.context}</div>
              <div className="list-keys">
                <span>2019-06-28</span>
              </div>
            </List.Item>
          )}
        />
      </Col>
      <Col className="main-right" xs={24} sm={24} md={7} lg={5} xl={5}>
        <Author/>
      </Col>
    </Row>
    <Footer/>
  </>
  )
}
