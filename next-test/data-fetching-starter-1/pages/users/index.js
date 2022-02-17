import Link from 'next/link';
export default function Users({ users, time }) {
  return (
    <div>
      {users.map(user => <div key={user.id}>
        <Link href={`/users/${user.id}`}>
          <a> {user.username} </a>
        </Link>
      </div>)}
      {time}
    </div>
  );
};

export const getStaticProps = async () => {
  const users = await getData();
  console.log('请求 getStaticProps');
  return {
    props: {
      users,
      time: Date.now()
    },
    // revalidate: 10
  };
};

function getData(params) {
  return [{
    id: 1,
    username: 'alias',
    account: 1000000000
  }, {
    id: 2,
    username: 'lisa',
    account: 100000
  }, {
    id: 3,
    username: 'rose',
    account: 10000
  }, {
    id: 4,
    username: 'jack',
    account: 1000
  }]
}
