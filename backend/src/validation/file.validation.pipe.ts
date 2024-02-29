import { PipeTransform, Injectable, ArgumentMetadata, FileTypeValidator } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value)
    console.log('metadata', metadata)

    return this.validateSize(value) 
        && this.validateMimeType(value)
    
  }

  private validateSize(value: any) {
    const Mb = 1e6;
    return value.size < 10 * Mb;
  }

  private validateMimeType(value: any) {
    const types: string[] = ['image/png', 'image/webp', 'image/jpeg']
    return types.includes(value.mimetype)
  }
}
