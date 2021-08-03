import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { MESSAGES,PATTERN } from '../displayErrorMsg';

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
  index:any;
  address:any = [];
  data:any
  errorMessages = MESSAGES;
  validPattern = PATTERN;
  
  constructor(private router:Router,private service: ServicesService) { }

  ngOnInit(): void {
    this.getPlace()
    
    this.createUser = new FormGroup({
      'eventName' : new FormControl('',[Validators.required,Validators.pattern((this.validPattern.alphaNum)),Validators.maxLength(100),this.blankSpace.bind(this)]),
      'date' : new FormControl('',[Validators.required]),
      'time' : new FormControl('',Validators.required),
      'address' : new FormControl('',[Validators.required,this.autoFill.bind(this)]),
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required)
    });
    this.editData= this.service.getItem()
    this.index= this.service.getIndex()
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

  getPlace(){
    this.service.getData().subscribe(result=>{
      for(let i = 0; i<result.results.length ; i++){
        if(result.results[i].plus_code){
          this.address.push(result.results[i].plus_code.compound_code)
        }
      }
    })
  }

  home(){
    this.router.navigateByUrl('/home')
  }

  submit(){
    this.submitted = true
    console.log(this.createUser)
    const errorMessage = this.checkValidDate(this.createUser.value.date)
    if(errorMessage) {
      this.message = errorMessage;
    } else {
      this.message = '';
    }
    var data = {
      eventName: this.createUser.value.eventName.trim(),
      date : this.createUser.value.date,
      time : this.createUser.value.time,
      address: this.createUser.value.address,
      city : this.createUser.value.city,
      country : this.createUser.value.country
    }
    var value:any = []
    var item = localStorage.getItem('user')
    if(item){
      var value= JSON.parse(item)
      for (let i = 0; i < value.length; i++) {
        value.push(value[i])
      }
    }
    if(this.editData){
      value[this.index] = data
    } else{
      value.push(data)
    }
    if(this.createUser.valid == true && this.message == ''){
      this.router.navigateByUrl('/home') 
      localStorage.setItem('user',JSON.stringify(value))
    }
  }
  
  blankSpace(control:FormControl){
    if(control.value.trim() == ""){
      return{'blankspace':true}
    }
    return null;
  }

  get f(){
    return this.createUser.controls
  }

  autoFill(control:FormControl){
    this.data = control.value
    this.data = this.data.split(",")
    if(this.data.length == 3){
    this.createUser.patchValue({
      city : this.data[1],
      country : this.data[2]
    })
  }
    return null;
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
    this.createUser.reset(); 
  }
}
