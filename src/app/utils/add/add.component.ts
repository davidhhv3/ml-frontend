import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input ('route') route:string = "";  

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  changeRoute(){
    this.router.navigate([this.route]);
  }

}
