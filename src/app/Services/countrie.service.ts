import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountrieService {

  countries: object [] = [];

  constructor(private router: Router, private httpClient: HttpClient) { }


  // tslint:disable-next-line:typedef
  getCountries(){
    return  this.httpClient.get('https://apilayer.net/api/countries?access_key=eb588dbf70cb81df1c8d374269db9d18');

  }

  // tslint:disable-next-line:typedef
  checkNumber(nbr: number, country: string){

    // @ts-ignore
    return this.httpClient
      .get('https://apilayer.net/api/validate?access_key=eb588dbf70cb81df1c8d374269db9d18&number=' + nbr + '&country_code=' + country);
  }
}

