import React, { ChangeEvent, SyntheticEvent } from "react"

export interface HandlersForm {
    onSubmit?: (event: React.FormEvent<HTMLFormElement> ) => void,
    onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void
    onChangeFile?: (params: React.ChangeEvent<HTMLInputElement>) => void
    onDelete?: (index: number) => void
    onDeletePreview?: (index: number) => void
}

export interface IHandlers {
    onSubmitFrom: (event: React.FormEvent<HTMLFormElement> ) => void,
    onChangeInput: (params: React.ChangeEvent<HTMLInputElement>) => void
    onChangeFile: (params: React.ChangeEvent<HTMLInputElement>) => void
    onDelete: (index: number) => void
    onDeletePreview: (index: number) => void
}

// export class Handler<T> implements IHandlers {
//     constructor( 
//         private readonly dispatch: React.Dispatch<React.SetStateAction<T>>
//     ) {
//     }
//     onChangeInput = ({ target: { name, value }}: React.ChangeEvent<any>) => {
//         this.dispatch((prev) => ({...prev, [name]: value}))
//     }

//     onSubmitFrom = (event: React.FormEvent<any>, ) => {
//         event.preventDefault()

//     };
//     onChangeFile = (params: React.ChangeEvent<HTMLInputElement>) => {};
//     onDelete = (index: number) => {}
//     onDeletePreview = (index: number) => {}
    
// }

export class Handler {
    static onChangeInput = <T> (
        { target: { name, value }}: React.ChangeEvent<any>, 
        dispatch: React.Dispatch<React.SetStateAction<T>>
    ) => {
        dispatch((prev) => ({...prev, [name]: value}))
    }

    static onPaginationClick = <T extends {limit: number}> (
        i: number, 
        dispatch: React.Dispatch<React.SetStateAction<T>>
    ) => {
        dispatch((prev) => ({
            ...prev,
            offset: prev.limit * (i - 1),
        }))
    };

    static onChangeFile = <T> (
        { target: { name, files } }: React.ChangeEvent<any>, 
        dispatch: React.Dispatch<React.SetStateAction<T>>
    ) => {
        const filesPreview = files && [...files].map(file => URL.createObjectURL(file))
        dispatch(prev => ({...prev, [name]: files, imagesPreview: filesPreview!}))
    };

    static onDelete = <T extends { images: string[] }> ( 
        index: number,
        dispatch: React.Dispatch<React.SetStateAction<T>>
    ) => {
        dispatch(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => index !== i)
        }))
    }

    static onDeletePreview = <T extends { imagesFiles?: File[], images: File[] | string[], imagesPreview: string[] }> ( 
        index: number,
        dispatch: React.Dispatch<React.SetStateAction<T>>
    ) => {
        dispatch( prev => {
            const arrayFiles = prev.imagesFiles ? [...prev.imagesFiles] : [...prev.images]
            const imagesField = prev.imagesFiles ? 'imagesFiles' : 'images'
            return ({
                ...prev,
                [imagesField]: arrayFiles.filter((_, i) => index !== i),
                imagesPreview: prev.imagesPreview.filter((_, i) => index !== i)
            })
        })
    }
}

export const { 
    onChangeInput,
    onPaginationClick
} = Handler