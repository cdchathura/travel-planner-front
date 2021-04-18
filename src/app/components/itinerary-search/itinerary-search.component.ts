import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Itinerary } from 'src/api/generated/models';
import { ItineraryControllerService } from 'src/api/generated/services';
import { ItineraryMO } from 'src/app/models/itinerary';

@Component({
  selector: 'app-itinerary-search',
  templateUrl: './itinerary-search.component.html',
  styleUrls: ['./itinerary-search.component.css']
})
export class ItinerarySearchComponent implements OnInit {

  itineraryForm: FormGroup;
  displayedColumns: string[];
  dataSource: MatTableDataSource<ItineraryMO>;
  isSubmited: boolean = false;
  error: boolean = false;
  errorMsg: string = "";

  constructor(private itineraryService: ItineraryControllerService) {
    this.itineraryForm = new FormGroup({
      name: new FormControl("", Validators.required)
    });

    this.displayedColumns = ['city', 'date', 'summary'];
    this.dataSource = new MatTableDataSource<ItineraryMO>();
  }

  ngOnInit(): void {
  }

  public get name() {
    return this.itineraryForm.get("name");
  }

  search(): void {
    this.isSubmited = true;

    if (this.itineraryForm.valid) {
      this.itineraryService.getItineraryByNameUsingGET(this.itineraryForm.value.name).subscribe({

        next: (itineraryData) => {
          let itineraryList: ItineraryMO[] = [];

          if(itineraryData != null) {
            let itinaryName = itineraryData.name;

            itineraryData.cityDateEntries?.forEach(data => {
              let obj = <ItineraryMO>{
                name: itinaryName,
                city: data.name,
                date: data.date
              }
              itineraryList.push(obj);
            });

            this.dataSource.data = itineraryList;
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

  generateSummary(): void {
    alert("Generate Summary..");
    //TODO: call the backend and get the data
  }

}

