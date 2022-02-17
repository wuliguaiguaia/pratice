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
  const time = Date.now()
  while (Date.now() - time < 3000) {} /* 假设获取数据需要3s */
  const { username, account } = getData()
  return {
    props: {
      username,
      account,
      time: Date.now()
    },
  }
}

function getData(params) {
  return {
    username: 'alias',
    account: 10000000000000,
  }
}

