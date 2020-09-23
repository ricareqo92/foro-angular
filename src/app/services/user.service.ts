import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
	public url: string;
	public identity;
	public token;

	constructor(
		private _http: HttpClient,
	) {
		this.url = global.url;
	}

	register(user): Observable<any> {
		// Covertir el objeto user a un json string
		let params = JSON.stringify(user);
		
		// Definir las cabeceras
		let headers = new HttpHeaders().set('Content-type', 'application/json');

		// Hacer petición ajax
		return this._http.post(this.url + 'register', params, {headers});
	}

	signup(user, gettoken = null): Observable<any> {
		// Comprobar si llega el gettoken
		if ( gettoken != null ) {
		user.gettoken = gettoken;
		}

		// Covertir el objeto user a un json string
		let params = JSON.stringify(user);

		// Definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// Hacer petición ajax
		return this._http.post(this.url + 'login', params, {headers});
	}

	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if ( identity && identity != null && identity != undefined && identity != 'undefined' ) {
		this.identity = identity;
		} else {
		this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		let token = localStorage.getItem('token');

		if ( token && token != null && token != undefined && token != 'undefined' ) {
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}

	update(user): Observable<any> {
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.getToken());
		
		return this._http.put(this.url + 'user/update', params, {headers});
	}

	getUsers(): Observable<any> {
		return this._http.get(this.url + 'users');
	}

	getUser(id): Observable<any> {
		return this._http.get(this.url + 'user/' + id);
	}
}
