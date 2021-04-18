/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Itinerary } from '../models/itinerary';

/**
 * Itinerary Controller
 */
@Injectable({
  providedIn: 'root',
})
class ItineraryControllerService extends __BaseService {
  static readonly getItineraryByNameUsingGETPath = '/itinerary';
  static readonly saveItineraryUsingPOSTPath = '/itinerary';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getItineraryByName
   * @param name name
   * @return OK
   */
  getItineraryByNameUsingGETResponse(name: string): __Observable<__StrictHttpResponse<Itinerary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/itinerary`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Itinerary>;
      })
    );
  }
  /**
   * getItineraryByName
   * @param name name
   * @return OK
   */
  getItineraryByNameUsingGET(name: string): __Observable<Itinerary> {
    return this.getItineraryByNameUsingGETResponse(name).pipe(
      __map(_r => _r.body as Itinerary)
    );
  }

  /**
   * saveItinerary
   * @param itinerary itinerary
   * @return OK
   */
  saveItineraryUsingPOSTResponse(itinerary: Itinerary): __Observable<__StrictHttpResponse<Itinerary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = itinerary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/itinerary`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Itinerary>;
      })
    );
  }
  /**
   * saveItinerary
   * @param itinerary itinerary
   * @return OK
   */
  saveItineraryUsingPOST(itinerary: Itinerary): __Observable<Itinerary> {
    return this.saveItineraryUsingPOSTResponse(itinerary).pipe(
      __map(_r => _r.body as Itinerary)
    );
  }
}

module ItineraryControllerService {
}

export { ItineraryControllerService }
