import { MAX_IMAGE_FILES_COUNT, MAX_IMAGE_FILE_SIZE } from "../../config/config"
import { ToastTypes } from "../../config/toasts.enums"
import { addToast } from "../slices/toastSlice"

export const filesValidate = (files: any[], errorHandler: any) => {
  const throwToast = (message: string) => {
    errorHandler( addToast({
      type: ToastTypes.Notify,
      data: {
        title: 'Некорректные файлы',
        message
        },
    }))
  }

  if ( files.length > MAX_IMAGE_FILES_COUNT ) {
    files = []
    throwToast('Превышено количество файлов')
  }

  if ( [...files].some( file => file.size > MAX_IMAGE_FILE_SIZE ) ) {
    files = []
    throwToast(`Превышен максимальный размер файла ${MAX_IMAGE_FILE_SIZE} Байт`)
  }

  return files
}