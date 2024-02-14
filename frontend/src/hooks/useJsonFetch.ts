import { useState, useEffect, useReducer } from "react";
import { reducer } from "../reducers/common.reducer";


interface JsonStoredData {
    data: any,
    isLoading: boolean,
    error: any
}

interface requestParamsDto {
    url: string,
    opts?: any,
    dependencies?: React.DependencyList
}

export default function useJsonFetch(params: requestParamsDto) {
    const {url, opts, dependencies} = params


    const initialState: JsonStoredData = {
        data: null,
        isLoading: true,
        error: null
    }

    const [storedData, dispatch] = useReducer(reducer, initialState )

    useEffect(() => {
        (async function json () {
            try {
                const response = await fetch(url, {...opts}, );
                if (response.status >= 200 && response.status < 300) {
                    dispatch({
                        type: 'HANDLE ADD ITEM TO ARRAY',
                        field: storedData.data,
                        payload: await response.json(),
                    })
                } else {
                  throw new Error(response.statusText)
                }
            } catch (e) {
                dispatch({
                    type: 'HANDLE ADD ITEM TO ARRAY',
                    field: storedData.error,
                    payload: e
                })
            } finally {
                dispatch({
                    type: 'HANDLE ADD ITEM TO ARRAY',
                    field: storedData.isLoading,
                    payload: false
                })
            }
        })()
    }, dependencies)
    return storedData
}