import { Component,Input, OnInit} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input ('route') route = "";  

  constructor(private router:Router) { }

  ngOnInit(): void {    
  }
  changeRoute(){
    this.router.navigate([this.route]); 
  }



}
