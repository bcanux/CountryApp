import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: `
    img{
    width: 25px;
  }
  `
})
export class ByCountryPageComponent implements OnInit {
  public countries:Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService:CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term:string){
    this.countriesService.searchCountry(term)
    .subscribe(countries => {
      this.countries = countries;
    });

  }


}
