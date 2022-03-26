import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public title:string="";
  public confirm:string="";
  buttonAction:string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: '',confirm:'' } ) { }

  ngOnInit(): void {
    this.title=this.data.title;      
    this.confirm=this.data.confirm;
    if(this.confirm == 'delete'){
      this.buttonAction = "Eliminar";
    }   
    if(this.confirm == 'update'){
      this.buttonAction = "Modificar";
    }  
  }

}
