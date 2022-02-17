import Link from 'next/link';
import { useRouter } from 'next/router'
export default function User({ user }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {user.username}
      <br />
      {user.account}
      <br />
      {/* {user.time} */}
      <Link href='/users'>返回</Link>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllIds()  /* 可动态获取， ['/users/1', '/users/2'] */
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: true,
  }
}

// 
export async function getStaticProps(context) {
  console.log(context);
  const { params } = context
  const user = getData(params)
  user.time = Date.now()
  console.log(user, '----');
  return {
    props: { user },
    // revalidate: 10,
  }
}

function getAllIds() {
  return ['/users/1', '/users/2']
}

function getData({id}) {
  if (id == 1) {
    return {
      id: 1,
      username: 'alias',
      account: 1000000000

    }
  } else if (id == 2) {
    return {
      id: 2,
      username: 'lisa',
      account: 100000
    }
  }
  else if (id == 3) {
    return {
      id: 3,
      username: 'lisa',
      account: 100000
    }
  } else {
    return {
      id: 4,
      username: 'jack',
      account: 1000
    }
  }
}