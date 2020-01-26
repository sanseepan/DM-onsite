import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ColorManagementComponent } from './components/color-management/color-management.component';
import { EditDictionaryComponent } from './components/edit-dictionary/edit-dictionary.component';
import { AddDictionaryComponent } from './components/add-dictionary/add-dictionary.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/products'},
  { path: 'products', component: ProductListComponent},
  { path: 'admin', component: ColorManagementComponent},
  { path: 'edit/:id', component: EditDictionaryComponent},
  { path: 'add', component: AddDictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
