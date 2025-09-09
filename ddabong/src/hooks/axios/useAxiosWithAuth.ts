import axios from 'axios';

export function UseAxiosWithAuth() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}
