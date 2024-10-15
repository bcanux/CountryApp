import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesRoutingModule } from './countries/countries-routing.module';
import { CountriesModule } from './countries/countries.module';


const routes: Routes = [
// {
//   path: '',
//   component: HomePagesComponent
// },
{
  path: 'about',
  component: AboutPageComponent
},
{
  path: 'contact',
  component: ContactPageComponent
},
{
  path: 'countries',
  loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
},
{
  path: '**',
  redirectTo: 'countries/by-capital'
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CountriesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
