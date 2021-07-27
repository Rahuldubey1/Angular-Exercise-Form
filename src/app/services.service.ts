import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  data:any
  constructor() { }

  setItem(value:any){
    this.data = value
    console.log(this.data)
  }
  getItem(){
    return this.data
  }
}
