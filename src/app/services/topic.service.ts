import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  public url;

  constructor(
    private http: HttpClient,
  ) {
    this.url = global.url;
  }

  addTopic(token, topic): Observable<any> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', token);
    return this.http.post(this.url + 'topic', params, {headers});                           
  }

  getTopicsByUser(userId): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    
    return this.http.get(this.url + 'user-topics/' + userId, {headers} );
  }

  getTopic(id): Observable<any> {
    return this.http.get(this.url + 'topic/' + id);
  }

  update(token, id, topic): Observable<any> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', token);
    return this.http.put(this.url + 'topic/' + id, params, {headers});
  }

  delete(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', token);
    return this.http.delete(this.url + 'topic/' + id, {headers});
  }

  getTopics(page = 1): Observable<any> {
    return this.http.get(this.url + 'topics/' + page);
  }

  search(searchString): Observable<any> {
    return this.http.get(this.url + 'search/' + searchString);
  }
}
