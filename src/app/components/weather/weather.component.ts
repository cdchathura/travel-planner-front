import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { WeatherControllerService } from 'src/api/generated/services';
import { WeatherMO } from 'src/app/models/weather';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  displayedColumns: string[];
  dataSource: MatTableDataSource<WeatherMO>;
  isSubmited: boolean = false;
  error: boolean = false;
  errorMsg: string = "";


  constructor(private weatherService: WeatherControllerService) {
    this.weatherForm = new FormGroup({
      city: new FormControl("", Validators.required)
    });

    this.displayedColumns = ['city', 'country', 'temperature', 'cloud'];
    this.dataSource = new MatTableDataSource<WeatherMO>();
  }

  ngOnInit(): void {
  }

  get city() {
    return this.weatherForm.get("city");
  }

  submitForm(): void {
    this.isSubmited = true;
    this.error = false;
    this.errorMsg = "";

    if (this.weatherForm.valid) {
      this.weatherService.getWeatherDetailsByCityUsingGET(this.weatherForm.value.city).subscribe({

        next: (weatherData) => {
          let weatherList: WeatherMO[] = [];

          if(weatherData != null) {
            let cityName = weatherData.cityName;
            let countryName = weatherData.countryCode;
            weatherData.weather?.forEach(data => {
              let obj = <WeatherMO>{
                city: cityName,
                country: countryName,
                temp: data.temperature,
                cloud: data.clouds,
                date: data.date
              }
              weatherList.push(obj);
            });

            this.dataSource.data = weatherList;
          }else {
            this.error = true;
            this.errorMsg = "No results found!!";
          }

        },
        error: () => {
          this.error = true;
          this.errorMsg = "Error occure while processing the request!!";
        }
      });
    }
  }

}



