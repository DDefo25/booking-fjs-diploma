import instance from '../config/axiosConfig';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

export interface FulfillResponse {
  data: any,
}

export const axiosBaseQuery = 
    ({ baseUrl } : { baseUrl: string } = { baseUrl: '' })
    : BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
    > => 
      async ({ url, method, data, params, headers }) => {
        try {
          const { data: dataResponse } = await instance({
            url: baseUrl + url,
            method,
            data,
            params,
            headers,
          });
          return { data: dataResponse };
        } catch (axiosError) {
          const err = axiosError as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
              statusText: err.response?.statusText,
            },
          };
        }
      };