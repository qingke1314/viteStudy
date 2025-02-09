import request from '../axios/index'

export const changeName = (payload) => {
  return {
    type: 'CHANGE_NAME',
    payload
  }
}

// 获取完数据再dispatch改变list值
export const getListData = (payload) => {
  return {
    type: 'GET_LIST',
    payload,
  }
}

// 返回一个dispatch为传参的函数
export const getList = () => {
  return (dispatch) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    request({
      url
    })
      .then(res => {
        dispatch(getListData(res.data))
      })
  }
}
const initState = {
  userName: 'Xian Tong',
  userCode: '00001',
  zoneCode: '150601',
  list: []
}
const reducer = (state = initState, action) => {
  console.log('action >>>', action);
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        userName: action.payload
      };
    case 'GET_LIST':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
export default reducer;