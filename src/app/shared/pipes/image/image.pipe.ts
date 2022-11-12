import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string) {
    const imageString = `https://${environment.bucketname}.s3.${environment.s3region}.amazonaws.com/${value}`;
    return imageString;
  }
}
