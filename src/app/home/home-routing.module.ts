import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from '../client/componets/client-list/client-list.component';
import { SelectComponent } from './components/select/select.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,
    children:[
      {path:'client',
        loadChildren: () => import ('../client/client.module').then(m => m.ClientModule) 
      },
      {path:'invoice',
      loadChildren: () => import ('../invoice/invoice.module').then(m => m.InvoiceModule) 
      },
      {path:'select',component:SelectComponent}
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
