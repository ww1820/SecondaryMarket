import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const auth = getAuthority();
  const isLogin = auth && auth[0] !== 'guest';
  if(isLogin) {
    return request('/api/currentUser');
  }
  
  return request('/api/guest');
  
}
