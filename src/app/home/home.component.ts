import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData:any;
  constructor() { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    console.log(this.userData)
  }

  editData(){
    
  }
}
