import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss']
})
export class FormButtonsComponent implements OnInit {
  @Input ('left-btn') leftButton = "";  
  @Input ('right-btn')  rightButton = "";  
  @Output() updateElement = new EventEmitter<string>();  
  @Output() deleteElement = new EventEmitter<string>();  
  a:boolean=false;

  constructor() { }

  ngOnInit(): void {   
  }
  public update(){    
    this.updateElement.emit("update");
  }
  public delete(){
    this.deleteElement.emit("delete");    
  }
  public prueba(){
    return false;
  }

}
