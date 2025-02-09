const initState = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : {
  colorPrimary: '#00b96b',
  borderRadius: 5,
  colorBgContainer: '#e1faeb'
}
export const changeTheme = (payload) => {
  return {
    type: 'CHANGE_THEME',
    payload
  }
}
const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'CHANGE_THEME':
      if(typeof action.payload !== 'object' || action.payload === null) return state;
      const newState = {
        ...state,
        ...action.payload
      };
      localStorage.setItem('theme', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
export default reducer;