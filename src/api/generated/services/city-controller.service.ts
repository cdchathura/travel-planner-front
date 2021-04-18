/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { City } from '../models/city';

/**
 * City Controller
 */
@Injectable({
  providedIn: 'root',
})
class CityControllerService extends __BaseService {
  static readonly getAllUsingGETPath = '/city';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Returns all the cities which are in city_list.json
   * @return OK
   */
  getAllUsingGETResponse(): __Observable<__StrictHttpResponse<Array<City>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/city`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<City>>;
      })
    );
  }
  /**
   * Returns all the cities which are in city_list.json
   * @return OK
   */
  getAllUsingGET(): __Observable<Array<City>> {
    return this.getAllUsingGETResponse().pipe(
      __map(_r => _r.body as Array<City>)
    );
  }
}

module CityControllerService {
}

export { CityControllerService }
