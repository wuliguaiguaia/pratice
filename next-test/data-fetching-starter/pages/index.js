import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home(props) {
  const { username, account, time } = props
  return (
    <div>
      <h1>hello {username}</h1>
      <p>您的银行卡余额是 {account}</p>
      <p>{time}</p>
    </div>
  )
}

export async function getServerSideProps() {
  const { username, account, time } = getData()
  return {
    props: {
      username,
      account,
      time
    }
  }
}

function getData(params) {
  return {
    username: 'alias',
    account: 10000000000000,
    time: Date.now()
  }
}

