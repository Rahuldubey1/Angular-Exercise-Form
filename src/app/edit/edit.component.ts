import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ServicesService } from '../services.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  createUser:FormGroup;
  submitted:boolean = false;
  date:any;
  message='';
  editData:any
  
  constructor(private router:Router,private service: ServicesService) { }

  ngOnInit(): void {
    this.createUser = new FormGroup({
      'eventName' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.maxLength(100)]),
      'date' : new FormControl('',[Validators.required]),
      'time' : new FormControl('',Validators.required),
      'address' : new FormControl('',Validators.required),
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required)
    });
    this.editData= this.service.getItem()
    if(this.editData){
      this.createUser.patchValue({
        eventName: this.editData.eventName,
        date : this.editData.date,
        time : this.editData.time,
        address: this.editData.address,
        city : this.editData.city,
        country : this.editData.country
      })
    }
  }

  submitUser(){
    this.submitted = true
    console.log(this.createUser)
    const errorMessage = this.checkValidDate(this.createUser.value.date)
    if(errorMessage) {
      this.message = errorMessage;
    } else {
      this.message = '';
    }
    var data={
      eventName: this.createUser.value.eventName,
      date : this.createUser.value.date,
      time : this.createUser.value.time,
      address: this.createUser.value.address,
      city : this.createUser.value.city,
      country : this.createUser.value.country
    }
    var value:any = []
    var item = localStorage.getItem('user')
    if(item){
      var length = JSON.parse(item)
      for(let i =0 ; i<length ; i++){
        var rahul = []
        rahul.push(item[i])
      }console.log(rahul)
    }
    if(item){
      value.push(JSON.parse(item))
    }
    value.push(data)

    if(this.createUser.valid == true && this.message == ''){
      this.router.navigateByUrl('/home') 
      localStorage.setItem('user',JSON.stringify(value))
    }
  }
  get f(){
    return this.createUser.controls
  }
  checkValidDate(data:any) {
    let currentDate = new Date();
    data = data.split('-');
    if(data[0] < currentDate.getFullYear()){
      return "Please don't enter date from past";
    }
    if(data[2] < currentDate.getDate() && (data[1] < currentDate.getMonth()+1) && ((data[0] < currentDate.getFullYear()))){

      return "Please don't enter date from past";
    }
    if((data[2] < currentDate.getDate()) && (data[1] < currentDate.getMonth()+1) && (data[0] == currentDate.getFullYear())){
      return "Please don't enter date from past";
    }
    if((data[2] < currentDate.getDate()) && (data[1] == currentDate.getMonth()+1) && (data[0] == currentDate.getFullYear())){
      return "Please don't enter date from past";
    }
    return null;
  }
  cancel(){
    this.createUser.patchValue({
      eventName: '',
      date : '',
      time : '',
      address: '',
      city : '',
      country : ''
    })
  }
  
}
