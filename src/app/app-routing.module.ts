import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { ItineraryCreateComponent } from './components/itinerary-create/itinerary-create.component';
import { ItinerarySearchComponent } from './components/itinerary-search/itinerary-search.component';

const routes: Routes = [
  { path: '', redirectTo: "/weather", pathMatch: 'full' },
  { path: 'itinerary', component: ItineraryCreateComponent },
  { path: 'itinerary-search', component: ItinerarySearchComponent },
  { path: 'weather', component: WeatherComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
