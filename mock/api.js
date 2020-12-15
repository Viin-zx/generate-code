import Mock from 'mockjs'

const defaultResponse = (data = null) => ({
  code: 0,
  data: data,
  msg: 'ok',
})

export default {
  'POST /api/getList': (req, res) => {
    // console.log('req', req);
    const resData = defaultResponse(
      Mock.mock({
        'list|5': [
          {
            id: () => Mock.Random.id(),
            text: '列表数据',
          },
        ],
      }),
    )

    res.send(resData)
  },
}
