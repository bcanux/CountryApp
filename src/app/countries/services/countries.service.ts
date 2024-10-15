import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriesModule } from '../countries.module';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService  {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore =  {
    byCapital:  {term:  '', countries:[]},
    byCountries:  {term:  '', countries:[]},
    byRegion:  {region: '', countries:[]},
  }

  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      //delay(2000)
    );
  }

  searchCountryByAlphaCode(code: string):Observable<Country | null> {

    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0? countries[0]: null),
        catchError(() => of(null))
        // tap(countries => console.log('Pasó por el tap 1', countries)),
        // map(countries => []),
        // tap(countries => console.log('Pasó por el tap 2', countries)),
      );

  }

  searchCapital(term: string):Observable<Country[]>{

    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries}),
        tap(() => this.saveToLocalSorage()),
      );

    // return this.httpClient.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //   );

  }

  searchCountry(term: string):Observable<Country[]>{

    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(() => this.saveToLocalSorage()),

    );
    // return this.httpClient.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //   );

  }

  searchRegion(region: Region):Observable<Country[]>{

    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(() => this.saveToLocalSorage()),
    );

    // return this.httpClient.get<Country[]>(url)
    //   .pipe(
    //     catchError(() => of([]))
    //   );

  }

  private saveToLocalSorage(){
    localStorage.setItem('cacheSore', JSON.stringify(this.cacheStore))
  }

  private loadToLocalStorage(){
    if(!localStorage.getItem('cacheSore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheSore')!)
  }


}
