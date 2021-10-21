import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  
  transform(number : any) {
    number = number.charAt(0) != 0 ? "0" + number : "" + number;
  
    let formatNumber = "";
    let i = 0;
  
    for (; i < Math.floor(number.length / 2) - 1; i++) {
      formatNumber = formatNumber + number.substr(i * 2, 2) + "-";
    }
  
    return formatNumber + number.substr(i * 2);
  }
  
}