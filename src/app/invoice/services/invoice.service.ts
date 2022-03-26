import { Injectable } from '@angular/core';
import {Invoice} from "../models/invoice";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { citiesCollection} from "../models/cityCollection";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private url:string=environment.api+"/Invoices";

  constructor(private http:HttpClient) { }

  public getInvoices():Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.url);
  }
  public getInvoice(code:string):Observable<Invoice>{
    return this.http.get<Invoice>(this.url+'/'+code);
  }

  public saveInvoice(invoice:Invoice){
    console.log(invoice);
    return this.http.post(this.url,invoice);
  }
  public updateOnvoice(code: string, invoice:Invoice){  
    return this.http.put(this.url+'/'+code,invoice);    
  }
  public deleteInvoice(code:string){
    return this.http.delete(this.url+'/'+code);
  }


  public getCities():Promise<citiesCollection>{
    return this.http.get<citiesCollection>('../../../assets/data/cityData.json').toPromise();    
  }
}
