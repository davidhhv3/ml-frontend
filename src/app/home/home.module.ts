import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SelectComponent } from './components/select/select.component';
import { HttpClientModule } from '@angular/common/http'; 
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [
    HomeComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ]
})
export class HomeModule { }
