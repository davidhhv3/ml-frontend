import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DialogComponent} from "../../../utils/dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/utils/services/loading.service';




@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {  
  client:Client={
    name:"",
    lastName: "",
    email:    ""
  }
  id:string = "";
  FormGroup: FormGroup;  
  questionText:string="";
  private emailValidate= '[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$'; // Pattern Email 

  constructor(private activatedRoute: ActivatedRoute,
              private clientService:ClientService ,
              private formBuilder: FormBuilder,
              private router:Router,
              private dialog: MatDialog,
              private toastr:ToastrService,
              private loadingService:LoadingService) { 

    this.FormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],   
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailValidate)]] 
  });

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;  
    this.id=params.id;      
    if(this.id){
      this.getClient(this.id);             
    }
    
  }
  private getClient(id:string){ 
    this.loadingService.setLoading(true);   
    this.clientService.getClient(id)
    .subscribe(
      res=>{
        this.client=res;
        this.fillForm();
        this.loadingService.setLoading(false); 
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )   
  }
  public updateClient(){      
    this.client=this.FormGroup.value;  
    this.loadingService.setLoading(true);    
    this.clientService.updateClient(this.id,this.client)
    .subscribe(
      res=>{        
        this.toastr.success("Cliente modificado");       
        this.router.navigate(['/home/client/list']); 
        this.loadingService.setLoading(false);  
      },
      err=>{
        this.toastr.error("Ha ocurrido un error");
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )
  }
  public validateForm(e:string) {       
    const nameField = this.FormGroup.get('name');
    const lastNameField = this.FormGroup.get('lastName');
    const emailField = this.FormGroup.get('email');
    if (this.FormGroup.valid) {            
      if(e == "save"){        
        this.saveClient();
      }else{
        this.openDialog(e);
      }
    }else if (nameField?.invalid &&  lastNameField ?.invalid && emailField ?.invalid){
      this.FormGroup.markAllAsTouched();
      this.toastr.warning("Ingrese todos los Campos","");      
    }else if (nameField?.invalid) {
      this.toastr.warning("Ingresa tu Nombre Completo","");          
    }else if (lastNameField?.invalid) {
      this.toastr.warning("Ingresa tu apellido Completo","");         
    }else if (emailField?.invalid) {     
      this.toastr.warning("Ingresa un email válido","");           
    }
  }
  public saveClient(){
    this.client=this.FormGroup.value;
    this.loadingService.setLoading(true);  
    this.clientService.saveClient(this.client)
    .subscribe(
      res=>{        
        this.toastr.success("Cliente guardado");        
        this.router.navigate(['/home/client/list']); 
        this.loadingService.setLoading(false);  
      },
      err=>{
        this.toastr.error("Ha ocurrido un error");
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )  
  }

  public deleteClient(e:string){
    this.loadingService.setLoading(true);  
    this.clientService.deleteClient(this.id)
    .subscribe(
      res=>{               
        this.toastr.success("cliente eliminado");
        this.router.navigate(['/home/client/list']);
        this.loadingService.setLoading(false);  
      },err=>{
        this.toastr.error("Ha ocurrido un error");
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )
        
  }
  public invalidFieldsTwo(field: string) {   
    const fieldName = this.FormGroup.get(field);     
    return fieldName?.touched && fieldName?.invalid;    
  }
  private fillForm(){
    this.FormGroup.get('name')?.setValue(this.client.name);
    this.FormGroup.get('lastName')?.setValue(this.client.lastName);
    this.FormGroup.get('email')?.setValue(this.client.email);
  }
  public openDialog(e:string){    
    if(e == "delete"){
      this.questionText="¿Está seguro de eliminar este cliente?";
    }
    if(e == "update"){
      this.questionText="¿Está seguro de modificar este cliente?";
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.questionText,confirm:e},  
      panelClass: 'dialog-success'
    });    
    dialogRef.afterClosed().subscribe(result => {
       if(result == "delete"){
         this.deleteClient("");
       }    
       if(result == "update"){
        this.updateClient();
      } 
    });        
    
  }



}
