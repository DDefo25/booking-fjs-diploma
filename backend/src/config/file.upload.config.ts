import { FileTypeValidator, FileValidator, MaxFileSizeValidator } from "@nestjs/common";
import { IFile } from "@nestjs/common/pipes/file/interfaces";

export const maxImageCount: number = 10

export const validatorImageOption: FileValidator<Record<string, any>, IFile>[] = [
    new MaxFileSizeValidator({ maxSize: 10e6, message: ((maxSize: number) => `Максимальный размер файла ${maxSize} Байт`) }),
    new FileTypeValidator({ fileType: new RegExp('image\/(png|jpeg|jpg|webp)') }),
]