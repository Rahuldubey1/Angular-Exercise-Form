import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() myinputMsg:any;
  constructor(private service:ServicesService, private router:Router, private _location: Location) { }

  ngOnInit(): void {
    console.log(this.myinputMsg)
  }

  editData(value:any){
    this.service.setIndex(value)
    this.service.setItem(this.myinputMsg[value])
    // this.router.navigateByUrl('');
    this._location.back();
  }
  
  deleteData(value:any){
    if(confirm("Are you sure to delete")) {
      this.myinputMsg.splice(value,1)
      localStorage.setItem('user',JSON.stringify(this.myinputMsg))

    }
  }
}
