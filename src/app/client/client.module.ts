import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './componets/client-list/client-list.component';
import { ClientFormComponent } from './componets/client-form/client-form.component';
import { MaterialDesingModule } from '../material-desing/material-desing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { InlineSVGModule } from 'ng-inline-svg';
import { UtilsModule } from '../utils/utils.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [   
    ClientListComponent, ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialDesingModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    UtilsModule ,
    ReactiveFormsModule, 
    FormsModule
    
  ]
})
export class ClientModule { }
