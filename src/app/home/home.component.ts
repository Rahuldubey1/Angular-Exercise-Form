import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData:any;
  error:any
  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData)
    console.log(this.userData)
  }

  editData(data:any,value:any){
    this.service.setIndex(value)
    this.service.setItem(this.userData[value])
    this.router.navigateByUrl('');
  }
  
  deleteData(data:any,value:any){
    this.userData.splice(value,1)
    localStorage.setItem('user',JSON.stringify(this.userData))
  }

  back(){
    this.router.navigateByUrl('')
  }
}