/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { WeatherList } from '../models/weather-list';

/**
 * Weather Controller
 */
@Injectable({
  providedIn: 'root',
})
class WeatherControllerService extends __BaseService {
  static readonly getWeatherDetailsByCityUsingGETPath = '/weather';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getWeatherDetailsByCity
   * @param city city
   * @return OK
   */
  getWeatherDetailsByCityUsingGETResponse(city: string): __Observable<__StrictHttpResponse<WeatherList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (city != null) __params = __params.set('city', city.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/weather`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WeatherList>;
      })
    );
  }
  /**
   * getWeatherDetailsByCity
   * @param city city
   * @return OK
   */
  getWeatherDetailsByCityUsingGET(city: string): __Observable<WeatherList> {
    return this.getWeatherDetailsByCityUsingGETResponse(city).pipe(
      __map(_r => _r.body as WeatherList)
    );
  }
}

module WeatherControllerService {
}

export { WeatherControllerService }
