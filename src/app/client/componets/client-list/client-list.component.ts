import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import {Client} from "../../models/Client";
import { LoadingService } from 'src/app/utils/services/loading.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients:Client[]=[];

  constructor(private clientService:ClientService,
              private loadingService:LoadingService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getClients();    
  }
  getClients(){
    this.loadingService.setLoading(true);
    this.clientService.getClients()
    .subscribe(
      res=>{
        this.clients=res;
        this.loadingService.setLoading(false);        
      },
      err=>{
        this.toastr.error("Ha ocurrido un error");
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )    
  }



}
