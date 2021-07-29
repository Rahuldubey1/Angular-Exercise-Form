import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData:any;
  error:any
  constructor(private service:ServicesService,private router:Router, private _location:Location) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData)
  }

  back(){
    this._location.back();
    // this.router.navigateByUrl('')
  }
}