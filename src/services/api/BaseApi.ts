import { PaginatedResult } from "@/models/pagination";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';

const toast = useToast();

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user') || 'null');
  const headers: { [key: string]: string } = { 'Content-type': 'application/json' };

  if (user && user.accessToken) {
    headers['Authorization'] = `Bearer ${user.accessToken}`;
  }

  return headers;
}

const instance: AxiosInstance = axios.create({
  // baseURL: 'api',
  baseURL: '/api',
  // withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const headers = authHeader();
  for (const key in headers) {
    config.headers[key] = headers[key];
  }
  return config;
});

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (import.meta.env.NODE_ENV === 'development') await sleep(1000);

    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<any>>;
    }

    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;

    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data?.errors?.hasOwnProperty('id')) {
          // router.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          toast.error(modalStateErrors.flat()[0]);
        }
        break;
      case 401:
        if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
          const authStore = useAuthStore();
          authStore.resetUserData();
          // router.push('/account/login');
          toast.error('Session expired - please login again');
        } else {
          toast.error(data.title || 'Unauthorized');
        }
        break;
      case 404:
        // router.push('/system/not-found');
        toast.error(data.title);
        break;
      case 405:
        router.push('/');
        break;
      case 500:
        const appStore = useAppStore();
        appStore.setServerError(data);
        // router.push('/system/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const sleep = (delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

export const requests = {
  get: <T>(url: string, params?: Record<string, any>) => instance.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) => instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string, params?: Record<string, any>) => instance.delete<T>(url, { params }).then(responseBody),
};
