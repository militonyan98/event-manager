import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { EventResponse, EventModel, EventType } from './models/event-model';
import { LoginModel } from './models/login-model';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectService {
 
  public apiBase = "https://volo-test.herokuapp.com";
  constructor(private http: HttpClient) {}

  login(username, password){
    console.log(username, password);
    return this.http.post<LoginModel>(this.getEndpoint('login'),{email:username, password:password});
  }

  createEvent(event: EventModel){
    return this.http.post<EventModel>(this.getEndpoint('events'), event, {headers: this.getTokenHeader()});
  }

  getEvent(page){
    let url = 'events';
    if(page)
    {
      url = 'events?_page='+page;
    }
    return this.http.get<any>(this.getEndpoint(url), {headers: this.getTokenHeader(), observe:"response"});
  }

  updateEvent(event : EventModel)
  {
    return this.http.patch<EventModel>(this.getEndpoint('events/'+event.id), event, {headers: this.getTokenHeader()});
  }

  deleteEvent(event: EventModel){
    return this.http.delete(this.getEndpoint('events/'+event.id), {headers: this.getTokenHeader()});
  }
  // something new
  getEventTypes(){
    return this.http.get<EventType[]>(this.getEndpoint('eventTypes'), {headers: this.getTokenHeader()});
  }

  getEndpoint(method)
  {
    return this.apiBase+"/"+method;
  }

  getTokenHeader()
  {
    var token = window.sessionStorage.getItem('token');
    const headers=new HttpHeaders({"Authorization": "Bearer " + token});
    return headers;
  }

  setToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  deleteUserData(){
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
  }
}
