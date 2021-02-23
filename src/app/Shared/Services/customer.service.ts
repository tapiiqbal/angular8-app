import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService implements OnDestroy {
  private _urlGetAllCustomer = `${environment.apiBaseUrl}/`; //url get all customer
  private _urlPostCustomer = `${environment.apiBaseUrl}/`; //url get all customer
  private _urlUpdateCustomer = `${environment.apiBaseUrl}/`; //url get all customer

  constructor(private http: HttpClient) { 

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  createCustomer({data = null}) {
    const body = new URLSearchParams();
    body.set('data', data);

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http
      .post<any>(this._urlPostCustomer, body.toString(), options)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateCustomer({data = null}) {
    const body = new URLSearchParams();
    body.set('data', data);

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http
      .put<any>(this._urlUpdateCustomer, body.toString(), options)
      .pipe(retry(3), catchError(this.handleError));
  }

  getAllCustomer() {
    const body = new URLSearchParams();

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http
      .post<any>(this._urlGetAllCustomer, body.toString(), options)
      .pipe(retry(3), catchError(this.handleError));
  }



  /**
 * Default Handle Error
 */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}