
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { pipe, switchMap, tap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { SearchResponse } from '../../../../../../03-gifs-app/src/app/gifs/interfaces/gif.interfaces';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router: Router,
 ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
      )
    )
      .subscribe((country) => {
        if(!country){
          return this.router.navigateByUrl('');
        }
        return this.country = country;
        //return;
    });
  }


  searchCountry(code:string){

  }

}
