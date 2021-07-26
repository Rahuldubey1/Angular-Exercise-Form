import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  createUser:FormGroup;
  submitted:boolean = false
  
  constructor() { }

  ngOnInit(): void {
    this.createUser = new FormGroup({
      'eventName' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.maxLength(100)]),
      'date' : new FormControl('',Validators.required),
      'time' : new FormControl('',Validators.required),
      'address' : new FormControl('',Validators.required),
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required)
    });
  }

  submitUser(){
    this.submitted = true
    console.log(this.createUser)
  }
  get f(){
    return this.createUser.controls
  }
}
