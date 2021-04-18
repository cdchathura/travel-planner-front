import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ItineraryCreateComponent } from './components/itinerary-create/itinerary-create.component';
import { ItinerarySearchComponent } from './components/itinerary-search/itinerary-search.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ItineraryCreateComponent,
    ItinerarySearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
