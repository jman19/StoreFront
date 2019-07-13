import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})

export class PhonePipe implements PipeTransform{
    transform(val:string):string{
        let newVal='';
        if (val) {
            val=val.replace(/-/g,'');
            if(val.length===4 || val.length===6 || val.length===5){
                newVal=newVal+val.slice(0,3)+'-'+val.slice(3);
                return newVal;
            } else if(val.length===7 || val.length>7){
                newVal=newVal+val.slice(0,3)+'-'+val.slice(3,6)+'-'+val.slice(6);
                return newVal;
            } else{
                return val;
            }
        }
    }
}