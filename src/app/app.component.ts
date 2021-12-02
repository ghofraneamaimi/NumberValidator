import {Component, OnInit} from '@angular/core';
import {CountrieService} from './Services/countrie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Task';
  // tslint:disable-next-line:ban-types
  countries = {};
  data = {};
  checkForm: FormGroup;
  spiner = false;
  valid = false;
  invalid = false;
  errorMessage = '';
  countryName = '';
  carrier = '';
  lineType = '';
  internationalFormat = '';
  flag = '';
  constructor(private  countrieService: CountrieService, private formBuilder: FormBuilder ) {
  }

  ngOnInit(): void {
    this.checkForm = this.formBuilder.group({
      number      : ['', ],
      country     : ['', ]
    });
    this.countrieService.getCountries().subscribe( ( data ) => {
      this.countries = data;
    });
   }


  // tslint:disable-next-line:typedef
  onSubmitForm(){
    this.invalid = false;
    this.valid = false;
    this.spiner = true ;
    
    this.countrieService.checkNumber(this.checkForm.value.number, this.checkForm.value.country)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        // @ts-ignore
        this.spiner = false;
        // @ts-ignore
        this.countryName = data.country_name;
        // @ts-ignore
        this.carrier = data.carrier;
        // @ts-ignore
        this.lineType = data.line_type;
        // @ts-ignore
        this.internationalFormat = data.international_format;
        
        // @ts-ignore
        if ( data.error ){
          this.invalid = true; 
            // @ts-ignore
            if (data.error.code === 404){
            // @ts-ignore
            this.errorMessage = (data.error.info);
          }else { // @ts-ignore
            if (data.error.code === 101){
              // @ts-ignore
              this.errorMessage = (data.error.info);
              }else { // @ts-ignore
              if (data.error.code === 103){
                // @ts-ignore
                this.errorMessage = (data.error.info);
              }else { // @ts-ignore
                if (data.error.code === 210){
                  // @ts-ignore
                  this.errorMessage = (data.error.info);
                    }else { // @ts-ignore
                  if (data.error.code === 211){
                    // @ts-ignore
                    this.errorMessage = (data.error.info);
                   }else { // @ts-ignore
                    if (data.error.code === 310){
                      // @ts-ignore
                      this.errorMessage = (data.error.info);
                     }
                    }
                  }
                } 
            }
          }
          
        }else {
          // @ts-ignore
          if (data.valid) {
                    this.valid = true;
                    // @ts-ignore
                    this.flag = 'flag-icon flag-icon-' + (this.data.country_code).toLowerCase() + ' flag-icon-squared' ;
                  }else { 
                    this.invalid = true;
                  }
        }
      });
  }
}
