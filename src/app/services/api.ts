import { Http, Headers, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(@Inject('api') public api, private http: Http) {}

  setHeader() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'access-token': window.sessionStorage.getItem('kidney_access_token')
    })
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      throw error;
    }
  }

  /**
   * HTTP GET METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  get(path: string): Observable < any > {
    return this.http.get(`${this.api.BASE_URL}${path}`, {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP GET METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  getURL(path: string): Observable < any > {
    return this.http.get(`${path}`, {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable} 
   */
  post(path: string, body: any): Observable < any > {
    return this.http.post(`${this.api.BASE_URL}${path}`,
        JSON.stringify(body), {
          headers: this.headers
        }
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @param  {[type]}     body
   * @return {Observable} 
   */
  postURL(path: string, body): Observable < any > {
    let data;
    if (typeof body == 'object') {
      data = JSON.stringify(body);
    } else {
      data = body;
    }

    return this.http.post(`${path}`,
        data, {
          headers: this.headers
        }
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }


  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  postParma(path: string): Observable < any > {
    return this.http.post(`${this.api.BASE_URL}${path}`,
        JSON.stringify({}), {
          headers: this.headers
        })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }


  /**
   * HTTP POST METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  postParmaURL(path: string): Observable < any > {
    return this.http.post(`${path}`,
        JSON.stringify({}), {
          headers: this.headers
        })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }


  /**
   * HTTP PUT METHOD
   * @param  {string}     path
   * @param  {any}        body
   * @return {Observable} 
   */
  put(path: string, body: any): Observable < any > {
    return this.http.put(`${this.api.BASE_URL}${path}`,
        JSON.stringify(body), {
          headers: this.headers
        }
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP PUT METHOD
   * @param  {string}     path
   * @param  {[type]}     body
   * @return {Observable} 
   */
  putURL(path: string, body): Observable < any > {
    return this.http.put(`${path}`,
        JSON.stringify(body), {
          headers: this.headers
        }
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP PUT METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  putParma(path: string): Observable < any > {
    return this.http.put(`${this.api.BASE_URL}${path}`, {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP DELETE METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  delete(path: string): Observable < any > {
    return this.http.delete(`${this.api.BASE_URL}${path}`, {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  /**
   * HTTP DELETE METHOD
   * @param  {string}     path
   * @return {Observable} 
   */
  deleteURL(path: string): Observable < any > {
    return this.http.delete(`${path}`, {
        headers: this.headers
      })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }


  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

}
