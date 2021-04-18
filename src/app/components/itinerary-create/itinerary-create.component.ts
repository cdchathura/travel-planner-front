import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { City, Itinerary } from 'src/api/generated/models';
import { CityDateEntry } from 'src/api/generated/models/city-date-entry';
import { CityControllerService, ItineraryControllerService } from 'src/api/generated/services';

@Component({
  selector: 'app-itinerary-create',
  templateUrl: './itinerary-create.component.html',
  styleUrls: ['./itinerary-create.component.css']
})

export class ItineraryCreateComponent implements OnInit {
  itineraryForm: FormGroup;
  isSubmited: boolean = false;
  reponseRecieved: boolean = false;
  error: boolean = false;
  message: string = "";
  cityList: City[] = [];

  constructor(private itineraryService: ItineraryControllerService, private cityService: CityControllerService) {
    this.itineraryForm = new FormGroup({
      name: new FormControl("", Validators.required),
      itinerary: new FormArray([this.createItem()])
    });
  }

  ngOnInit(): void {
    this.cityService.getAllUsingGET().subscribe(cityData => {
      this.cityList = cityData;
    });
  }

  createItem(): FormGroup {
    return new FormGroup({
      city: new FormControl("", Validators.required),
      date: new FormControl(new Date())
    });
  }

  get name() {
    return this.itineraryForm.get("name");
  }

  get itinerary(): FormArray {
    return this.itineraryForm.get("itinerary") as FormArray;
  }

  addLocation(): void {
    this.itinerary.push(this.createItem());
  }

  removeLocation(index: number): void {
    this.itinerary.removeAt(index);
  }



  submitForm(): void {
    this.isSubmited = true;
    this.reponseRecieved = false;

    if (this.itineraryForm.valid) {
      let itinary: Itinerary;
      let citiesList: CityDateEntry[] = [];

      this.itinerary.value.forEach((locationData: { city: any; date: any; }) => {
        let dateObj = new Date(locationData.date);
        let formatedDateStr = ((dateObj.getMonth() > 8) ? (dateObj.getMonth() + 1) : ('0' + (dateObj.getMonth() + 1))) + '/' + ((dateObj.getDate() > 9) ? dateObj.getDate() : ('0' + dateObj.getDate())) + '/' + dateObj.getFullYear();

        citiesList.push({
          name: locationData.city,
          date: formatedDateStr
        })
      });

      itinary = <Itinerary>{
        name: this.itineraryForm.value.name,
        cityDateEntries: citiesList
      }

      this.itineraryService.saveItineraryUsingPOST(itinary).subscribe({
        next: (reponse) => {
          this.error = false;
          this.message = "Successfully added the Itinerary!!";
          this.reponseRecieved = true;
        },
        error: (error) => {
          this.error = true;
          this.message = "Error occure while adding the Itinerary!!";
          this.reponseRecieved = true;
        }
      });
    }

  }

}
