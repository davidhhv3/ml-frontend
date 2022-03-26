import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/utils/services/loading.service';
import {Invoice} from "../../models/invoice";
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoices:Invoice[]=[];

  constructor(private invoiceService:InvoiceService,
              private loadingService:LoadingService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getInvoices();
  }
  getInvoices(){
    this.loadingService.setLoading(true);
    this.invoiceService.getInvoices()
    .subscribe(
      res=>{
        this.invoices=res;
        this.loadingService.setLoading(false);        
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.error("Ha ocurrido un error");
      }

    )
  }

}
