import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { UtilsModule } from '../utils/utils.module';
import { MaterialDesingModule } from '../material-desing/material-desing.module';


@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    UtilsModule,
    ReactiveFormsModule, 
    FormsModule,
    MaterialDesingModule
  ]
})
export class InvoiceModule { }
