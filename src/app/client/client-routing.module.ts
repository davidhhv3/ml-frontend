import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './componets/client-form/client-form.component';
import { ClientListComponent } from './componets/client-list/client-list.component';

const routes: Routes = [
  {path:"list",component:ClientListComponent},
  {path:"form/:id",component:ClientFormComponent},
  {path:"form",component:ClientFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
