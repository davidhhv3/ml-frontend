import { Component, OnInit } from '@angular/core';
import { City } from '../../models/city';
import { InvoiceService } from '../../services/invoice.service';
import { Client } from "../../../client/models/Client";
import { ClientService } from 'src/app/client/services/client.service';
import { LoadingService } from 'src/app/utils/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DialogComponent} from "../../../utils/dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  cities:City[]=[];
  clients:Client[]=[];
  status:string[]=['Inicial','Primerrecordatorio','Segundorecordatorio','Desactivado'];
  paid:string[]=['Yes','No'];
  invoice:Invoice={
    code:        "",
    client:       "",
    city:         "",
    nit:          0,
    total:        0,
    subTotal:     0,
    iva:          0,
    retention:    0,
    creationDate: "",
    status:       "",
    changeStatus: "",
    paid:         "",
    paymentDate:  "",
    email: ""
  }
  client:Client={
    name:"",
    lastName: "",
    email:    ""
  }
  code:string = "";
  formGroup: FormGroup;
  questionText:string=""; 
   

  constructor(private invoiceService:InvoiceService,
              private clientService:ClientService,
              private loadingService:LoadingService,
              private formBuilder: FormBuilder,
              private activatedRoute:ActivatedRoute,
              private toastr:ToastrService,
              private router:Router,
              private dialog: MatDialog) { 

      this.formGroup = this.formBuilder.group({
              code: ['', []],
              client: ['', [Validators.required]], 
              city: ['', [Validators.required]],
              nit: ['', [Validators.required]],
              total: ['', [Validators.required]],
              subTotal: ['', [Validators.required]],
              iva: ['', [Validators.required]],
              retention: ['', [Validators.required]],
              creationDate: ['', []],
              status: ['', [Validators.required]],
              paid: ['', [Validators.required]],
      });
  }

  async ngOnInit(){    
    this.getClients();
    await this.getCities();
    const params = this.activatedRoute.snapshot.params;  
    this.code=params.code;
    if(this.code){
      this.getInvoice(this.code);             
    }
  }
  public validateForm(e:string) {       
    const clientField = this.formGroup.get('client');
    const cityField = this.formGroup.get('city');
    const nitField = this.formGroup.get('nit');
    const totalField = this.formGroup.get('total');
    const subtotalField = this.formGroup.get('subTotal');
    const ivaField = this.formGroup.get('iva');
    const retentionField = this.formGroup.get('retention');
    const statusField = this.formGroup.get('status');
    const payField = this.formGroup.get('paid');
    if (this.formGroup.valid) {            
      if(e == "save"){        
        this.saveInvoice();
      }else{
        this.openDialog(e);
      }     
    }else if (clientField?.invalid &&  cityField ?.invalid && nitField ?.invalid && totalField?.invalid
             && ivaField?.invalid &&  statusField ?.invalid && payField?.invalid ){
      this.formGroup.markAllAsTouched();
      this.toastr.warning("Ingrese todos los campos requeridos","");      
    }else if (clientField?.invalid) {
      this.toastr.warning("Selecciona el cliente","");          
    }else if (cityField?.invalid) {
      this.toastr.warning("Selecciona una ciudad","");         
    }else if (nitField?.invalid) {     
      this.toastr.warning("Ingresa el nid","");           
    } else if ( totalField?.invalid) {     
      this.toastr.warning("Ingresa el total","");
    } else if (subtotalField?.invalid) {     
      this.toastr.warning("Ingresa el subtotal","");      
    } else if ( retentionField?.invalid) {     
      this.toastr.warning("Ingresa la retención","");           
    }else if ( ivaField?.invalid) {     
      this.toastr.warning("Ingresa el iva","");
    } else if ( retentionField?.invalid) {     
      this.toastr.warning("Ingresa la retención","");            
    }else if (statusField?.invalid) {     
      this.toastr.warning("Seleccione el estado","");           
    }else if (payField ?.invalid) {     
      this.toastr.warning("Especifica si esta pago","");           
    }    
  }
  public openDialog(e:string){ 
    if(e == "delete"){
      this.questionText="¿Está seguro de eliminar esta factura?";
    }
    if(e == "update"){
      this.questionText="¿Está seguro de modificar esta factura?";
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.questionText,confirm:e},  
      panelClass: 'dialog-success'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "delete"){
        this.deleteInvoice();
      } 
    
      if(result == "update"){
        this.getClient(this.formGroup.get('client')?.value);       
     } 
   }); 
  }
  saveInvoice(){
    const date = moment();
    let todayDate = date.format('M/D/YYYY');       
    this.invoice=this.formGroup.value;
    this.invoice.paymentDate="";
    this.invoice.creationDate=todayDate.toString();
    this.invoice.changeStatus=this.invoice.status;
    this.invoice.email="";   
    this.loadingService.setLoading(true); 
    this.invoiceService.saveInvoice(this.invoice)
    .subscribe(
      res=>{
        this.toastr.success("Factura guardada");        
        this.router.navigate(['/home/invoice/list']); 
        this.loadingService.setLoading(false);
      },err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.error("Ha ocurrido un error");
      }
    )
  }
  updateInvoice(){   
          
    this.loadingService.setLoading(true);     
    this.invoiceService.updateOnvoice(this.code,this.invoice)
    .subscribe(
      res=>{        
        this.toastr.success("Factura modificadoa");       
        this.router.navigate(['/home/invoice/list']); 
        this.loadingService.setLoading(false); 
                
      },
      err=>{
        console.log(err);
        this.toastr.error("Ha ocurrido un error");
        this.loadingService.setLoading(false);         
      }
    )
  }
  deleteInvoice(){
    this.loadingService.setLoading(true);
    this.invoiceService.deleteInvoice(this.code)
    .subscribe(
      res=>{
        this.toastr.success("factura eliminada");
        this.router.navigate(['/home/invoice/list']);
        this.loadingService.setLoading(false);       
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.error("Ha ocurrido un error");
      }
    )
  }
  

  getInvoice(id:string){
    this.loadingService.setLoading(true);   
    this.invoiceService.getInvoice(this.code)
    .subscribe(
      res=>{
        this.invoice=res;
        this.fillForm();
        this.loadingService.setLoading(false);        
      },err=>{
        console.log(err);
        this.loadingService.setLoading(false); 
        this.toastr.error("Ha ocurrido un error");
      }
    )
  }

  getClients(){
    this.loadingService.setLoading(true);
    this.clientService.getClients()
    .subscribe(
      res=>{
        this.clients=res;
        this.loadingService.setLoading(false);
      },err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.error("Ha ocurrido un error");
      }
      
    )    
  }
  getClient(id:string){
    this.loadingService.setLoading(true);    
    this.clientService.getClient(id)
    .subscribe(
      res=>{
        var initialState=this.invoice.status;
        this.invoice=this.formGroup.value;
        this.invoice.changeStatus=initialState;
        this.invoice.paymentDate="";  
        this.client=res;
        this.loadingService.setLoading(false);  
        this.invoice.email=this.client.email;        
        this.updateInvoice();      
                  
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false); 
        this.toastr.error(err);
      }
    )
  }
  async getCities(){    
    const dataResponse = await this.invoiceService.getCities();    
    this.cities=dataResponse.cities;     
  }
  public invalidFieldsTwo(field: string) {   
    const fieldName = this.formGroup.get(field);     
    return fieldName?.touched && fieldName?.invalid;    
  }
  private fillForm(){
    this.formGroup.get('code')?.setValue(this.invoice.code);
    this.formGroup.get('client')?.setValue(this.invoice.client);
    this.formGroup.get('city')?.setValue(this.invoice.city);
    this.formGroup.get('nit')?.setValue(this.invoice.nit);
    this.formGroup.get('total')?.setValue(this.invoice.total);
    this.formGroup.get('subTotal')?.setValue(this.invoice.subTotal);
    this.formGroup.get('iva')?.setValue(this.invoice.iva);
    this.formGroup.get('retention')?.setValue(this.invoice.retention);
    this.formGroup.get('creationDate')?.setValue(this.invoice.creationDate);
    this.formGroup.get('status')?.setValue(this.invoice.status);
    this.formGroup.get('paid')?.setValue(this.invoice.paid);
  }

}
