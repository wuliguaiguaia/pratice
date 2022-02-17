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
  const { username, account } = getData()
  return {
    props: {
      username,
      account,
      time: Date.now()
    },
    // revalidate: 10, // In seconds
  }
}

function getData(params) {
  return {
    username: 'alias',
    account: 10000000000000,
  }
}

