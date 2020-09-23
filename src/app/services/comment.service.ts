import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public url;

  constructor(
    private http: HttpClient,
  ) {
    this.url = global.url;
  }

  add(token, comment, topicId): Observable<any> {
    let params = JSON.stringify(comment);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('Authorization', token);
    return this.http.post(this.url + 'comment/topic/' + topicId, params, {headers});                           
  }

  delete(token, topicId, commentId): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', token);
    return this.http.delete(this.url + 'comment/' + topicId + '/' + commentId, {headers});
  }

}
