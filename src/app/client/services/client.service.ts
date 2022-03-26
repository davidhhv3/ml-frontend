import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Client} from "../models/Client";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url:string=environment.api+"/User";

  constructor(private http:HttpClient) { }

  getClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.url);
  }
  getClient(id:any):Observable<Client>{
    return this.http.get<Client>(this.url+"/"+id);
  }
  updateClient(id: string, client:Client){           
    return this.http.put(this.url+"/"+id,client);    
  }
  deleteClient(id: string) {                         
    return this.http.delete(this.url+"/"+id);
  }
  saveClient(client:Client){
    return this.http.post(this.url,client);
  }



}
