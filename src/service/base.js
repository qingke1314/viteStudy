import fetch from '@/js/axios';

export const handleLogin = data => {
  return fetch({
    url: '/gateway/login',
    method: 'POST',
    data
  })
};

export const getMenuList = () => {
  return fetch({
    url: '/gateway/getMenu',
    method: 'POST'
  })
}