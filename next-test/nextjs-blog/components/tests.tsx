import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { GetStaticProps } from 'next'

interface ICategory {
  id: number;
  value: string;
}

interface IProps {
  data: ICategory[]
}

const Category: FunctionComponent<IProps> = ({ data = [] }) => {
  console.log(data, '=====')

  const router = useRouter()

  const handleClick = (id: number) => {
    router.push({
      pathname: '/',
      query: {
        category: id
      }
    })
  }
  return (
    <div className="position-sticky">
      {
        data.map(item => {
          <span>{item.value}</span>
        })
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('context', context)

  const data = [
    { id: 1, value: 'javascript' },
    { id: 2, value: 'html/css' },
    { id: 3, value: 'react' },
    { id: 4, value: 'vue' },
    { id: 5, value: 'node' },
    { id: 6, value: 'mysql' }
  ]
  console.log('get data')
  return {
    props: {
      data
    }
  }
}

export default Category