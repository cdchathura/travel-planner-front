/* tslint:disable */
import { Links } from './links';
import { Weather } from './weather';
export interface WeatherList {
  _links?: Links;
  cityName?: string;
  countryCode?: string;
  weather?: Array<Weather>;
}
