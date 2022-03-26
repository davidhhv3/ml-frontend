import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button/back-button.component';
import { HttpClientModule } from '@angular/common/http'; 
import { InlineSVGModule } from 'ng-inline-svg';
import { AddComponent } from './add/add.component';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialDesingModule } from '../material-desing/material-desing.module';


@NgModule({
  declarations: [
    BackButtonComponent,
    AddComponent,
    FormButtonsComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MaterialDesingModule
  ],
  exports:[
    BackButtonComponent,
    AddComponent,
    FormButtonsComponent,
    DialogComponent
  ]
})
export class UtilsModule { }
