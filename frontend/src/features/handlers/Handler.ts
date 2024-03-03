import { ActionCreatorWithPayload, ThunkDispatch } from '@reduxjs/toolkit';
import React, { ChangeEvent } from 'react';
import { Toast, ToastState, addToast } from '../slices/toastSlice';
import { ToastTypes } from '../../config/toasts.enums';
import { filesValidate } from './files.validate';
import { inputValidate } from './form.validate';

export interface BaseFormState {
  isValid: boolean[]
}

export interface HandlersForm {
  onSubmit?: (event: React.FormEvent<HTMLFormElement> ) => void,
  onSubmitData?: ( data: any ) => void,
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

export class Handler {
  static onChangeInput = <T extends {}> (
    { target: { name, value } }: React.ChangeEvent<any>, 
    dispatch: React.Dispatch<React.SetStateAction<T>>
  ) => {
    dispatch((prev) => {
      return { ...prev, [name]: value }
    });
  };

  static onPaginationClick = <T extends { limit: number }> (
    i: number, 
    dispatch: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    dispatch((prev) => ({
      ...prev,
      offset: prev.limit * (i - 1),
    }));
  };

  static onChangeFile = <T> (
    { target: { name, files } }: React.ChangeEvent<any>, 
    dispatch: React.Dispatch<React.SetStateAction<T>>,
    errorHandler: any
  ) => {
    const validatedFiles = filesValidate(files, errorHandler)
    const filesPreview = validatedFiles && [...validatedFiles].map(file => URL.createObjectURL(file));
    dispatch(prev => ({ ...prev, [name]: validatedFiles, imagesPreview: filesPreview! }));
  };

  static onDelete = <T extends { images: string[] }> ( 
    index: number,
    dispatch: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    dispatch(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => index !== i),
    }));
  };

  static onDeletePreview = <T extends { imagesFiles?: File[], images: File[] | string[], imagesPreview: string[] }> ( 
    index: number,
    dispatch: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    dispatch( prev => {
      const arrayFiles = prev.imagesFiles ? [...prev.imagesFiles] : [...prev.images];
      const imagesField = prev.imagesFiles ? 'imagesFiles' : 'images';
      return ({
        ...prev,
        [imagesField]: arrayFiles.filter((_, i) => index !== i),
        imagesPreview: prev.imagesPreview.filter((_, i) => index !== i),
      });
    });
  };
}

export const { 
  onChangeInput,
  onPaginationClick,
} = Handler;