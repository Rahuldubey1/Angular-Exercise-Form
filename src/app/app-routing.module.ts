import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:"", component:EditComponent},
  {path:"home", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  EditComponent,
  HomeComponent
]
