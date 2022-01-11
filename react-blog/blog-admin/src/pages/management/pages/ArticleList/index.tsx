
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import cns from 'classnames'
import {
  Button,
  Input,
  message,
  Popconfirm,
  Table, Tag, Tooltip,
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.scss'
import $http from '@/common/api'
import { getDateDetail } from '@/common/utils'
import EditArticleModal from '../../components/EditArticleModal'
import { RootState } from '@/store/reducers/interface'
import { getCategoryList } from '@/store/reducers/editor'
import { ICategory } from '@/common/interface'

interface IProps {
}

const defaultPerpage = 20
const ArticleList: FunctionComponent<IProps> = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pagesize, setPagesize] = useState(20)
  const [total, setTotal] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [cates, setCates] = useState<any>([])
  const [columns, setColumns] = useState<any>([])
  const [curCates, setCurCates] = useState([])
  const [sorter, setSorter] = useState({})
  const [published, setPublished] = useState<null | number>(null)
  const [editArticleModalVisible, setEditArticleModalVisible] = useState(false)
  const [editType, setEditType] = useState(0)
  const [editData, setEditData] = useState({title: '', categories: [], id: 0})
  const dispatch = useDispatch()

  const fetchData = useCallback(async ({
    page: _page = page,
    prepage = pagesize,
    categories = curCates,
    sorter: _sorter = sorter,
    published: _published = published,
  }: {
    page?: number,
    prepage?: number,
    categories?: number[],
    sorter?: any,
    published?: number | null
  }) => {
    setLoading(true)
    const params = {
      page: _page,
      prepage,
      categories,
      published: _published,
      sorter: _sorter,
    }

    let ilist
    let itotal
    let data
    let response

    if (!searchValue) {
      response = await $http.getarticlelist(params)
      data = response.data
      ilist = data.list
      itotal = data.total
    } else {
      response = await $http.search({...params, words: searchValue, columns: ['title']})
      data = response.data
      // eslint-disable-next-line no-underscore-dangle
      ilist = data.list.map((item: { _source: any }) => item._source)
      itotal = data.total
    }
    if (itotal !== 0 && ilist.length === 0) {
      /* 处理删除最后一页数据异常 */
      fetchData({
        page: _page - 1, prepage, categories, sorter: _sorter, published: _published,
      })
      setPage(_page - 1)
    } else {
      setTotal(itotal)
      setList(ilist)
      setLoading(false)
    }
  }, [searchValue])

  const { categoryList } = useSelector((state: RootState) => state.editor)
  useEffect(() => {
    dispatch(getCategoryList())
  }, [])
  useEffect(() => {
    const fetch = async () => {
      const data = categoryList.map(({ id, name }) => ({ text: name, value: id }))
      setCates(data)
    }
    fetch()
  }, [categoryList])

  useEffect(() => {
    setColumns([
      {
        title: 'id',
        dataIndex: 'id',
        width: 100,
        className: styles.small,
      },
      {
        title: '名称',
        dataIndex: 'title',
        className: styles.title,
        width: 180,
        onCell: (record: any) => ({
          className: `cell-${record.id}`,
        }),
        render: (title: string) => (
          <Tooltip title={title}>
            <div className={cns([styles.title, 'text-ellipsis'])} style={{ width: 200 }}>
              {title}
            </div>
          </Tooltip>
        ),
      },
      {
        title: '所属分类',
        dataIndex: 'categories',
        width: 140,
        filters: cates,
        render: (categories: any[]) => (
          <span>
            {categories.map((item, index) => {
              const color = 'green'
              return (
                <Tag color={color} key={index} className={styles.categories}>
                  {item.name.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        ),
      },
      {
        title: '发布',
        dataIndex: 'published',
        className: styles.small,
        width: 80,
        filterMultiple: false,
        filters: [
          {
            text: '是',
            value: 1,
          },
          {
            text: '否',
            value: 0,
          },
        ],
        render: (_published: number | undefined) => (_published ? '是' : '否'),
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        className: styles.small,
        width: 150,
        sorter: (a, b) => a - b,
        render: (updateTime: string) => getDateDetail(updateTime),
      },
      {
        title: '操作',
        width: 160,
        fixed: 'right',
        render: (_, record: any) => {
          const handlePublish = async () => {
            try {
              const data = await $http.publisharticle({ id: record.id })
              if (data.errNo === 0) {
                message.success('发布成功！')
                fetchData({
                  page,
                  prepage: pagesize,
                  categories: curCates,
                  sorter,
                  published,
                })
              } else {
                message.error('发布失败！')
              }
            } catch (e) {
              message.error('发布失败！')
            }
          }
          const handleDelete = async () => {
            try {
              const data = await $http.deletearticle({ id: record.id })
              if (data.errNo === 0) {
                message.success('删除成功！')
                fetchData({
                  page,
                  prepage: pagesize,
                  categories: curCates,
                  sorter,
                  published,
                })
              } else {
                message.error('删除失败！')
              }
            } catch (e) {
              message.error('删除失败！')
            }
          }

          const handleEdit = () => {
            const { id, title, categories } = record
            setEditData({ id, title, categories: categories.map((item: ICategory) => item.id) })
            setEditType(1)
            setEditArticleModalVisible(true)
          }
          return (
            <div className={styles.operateContent}>
              <span className={styles.operate} onClick={handleEdit}>修改</span>
              <span className={styles.operate}><Link to={`/article/${record.id}/preview`} target="_blank">查看</Link></span>
              {!record.published ? (
                <Popconfirm
                  title="请再次确认是否发布？"
                  onConfirm={handlePublish}
                  okText="是"
                  cancelText="否"
                >
                  <span className={styles.operate}>发布</span>
                </Popconfirm>
              ) : null}
              <Popconfirm
                title="请再次确认是否删除？"
                onConfirm={handleDelete}
                okText="是"
                cancelText="否"
              >
                <span className={styles.operate}>删除</span>
              </Popconfirm>
            </div>
          )
        },
      },
    ])
  }, [cates, curCates, fetchData, page, pagesize, published, sorter])


  useEffect(() => {
    fetchData({
      page: 1, prepage: defaultPerpage, categories: [], sorter: null, published: null,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTableChange = (
    pagination: any,
    filters: any,
    { field, order }: {field: string, order: null | 'string'},
  ) => {
    const convertSorter = field ? { [field]: { order: order?.slice(0, -3) } } : {}
    fetchData({
      page: pagination.current,
      prepage: pagination.pageSize,
      categories: filters.categories,
      sorter: convertSorter,
      published: filters.published ? filters.published[0] : null,
    })
    setPage(pagination.current)
    setPagesize(pagination.pageSize)
    setCurCates(filters.categories)
    setSorter(convertSorter)
    setPublished(filters.published ? filters.published[0] : null)
  }
  const handleInputEnter = () => {
    if (!searchValue) return
    fetchData({
      page,
      prepage: pagesize,
      categories: curCates,
      published,
      sorter,
    })
    setPage(1)
  }
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim()
    setSearchValue(value)
  }
  const handleReset = () => window.location.reload()

  const handleAddArticle = () => {
    setEditData({})
    setEditType(0)
    setEditArticleModalVisible(true)
  }

  return (
    <>
      <div className={cns([styles.articlelist])}>
        <div className={styles.header}>
          <Button type="primary" onClick={handleAddArticle}>
            <PlusOutlined />
            <span className={styles.addBtn}>添加文章</span>
          </Button>
          <div className="flex">
            <Input
              placeholder="请输入..."
              value={searchValue}
              onChange={handleValueChange}
              suffix={<SearchOutlined style={{ cursor: 'pointer' }} onClick={handleInputEnter} />}
              onPressEnter={handleInputEnter}
            />
            <Button className={styles.resetBtn} type="primary" onClick={handleReset} size="middle">重置</Button>
          </div>
        </div>
        <Table
          className={styles.table}
          dataSource={list}
          loading={loading}
          size="small"
          columns={columns}
          scroll={{ y: '70vh' }}
          rowKey="id"
          onChange={handleTableChange}
          pagination={{
            position: ['bottomRight'],
            total,
            showSizeChanger: true,
            defaultPageSize: pagesize,
            showTotal: (_total) => `共 ${_total} 条数据`,
          }}
        />
      </div>
      <EditArticleModal
        type={editType}
        initialData={editData}
        refresh={fetchData}
        modalVisible={editArticleModalVisible}
        setModalVisible={setEditArticleModalVisible}
      />
    </>
  )
}

export default ArticleList
