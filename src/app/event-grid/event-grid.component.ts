import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../backend-connect.service';
import { EventModel, EventType} from '../models/event-model';
import { Router } from '@angular/router';

import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.css'],

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class EventGridComponent implements OnInit {
  public events: EventModel [];
  public eventTypes : Map<number,EventType>;
  public activeEvent : EventModel;
  public showDetails: boolean;
  public isAdmin: boolean = JSON.parse(window.sessionStorage.getItem("user")).isAdmin;

  constructor(private backend: BackendConnectService, private router: Router) { }

  ngOnInit() {
    this.activeEvent = new EventModel();
    this.backend.getEventTypes()
    .subscribe(data=>{
      this.eventTypes = new Map<number,EventType>();
      data.forEach(element => {
        this.eventTypes.set(element.value,element);
      });

      this.backend.getEvent(false)
      .subscribe(data=>{
        this.events=data.body;
        console.log(this.events);
      },
      err=>{
        this.router.navigate(["/"]);
        console.log(err);
      })
      console.log(this.eventTypes);
    })
   
  }

  getEventType(val){
    //to battle some weird events where type is string
    return this.eventTypes.get(Number.parseInt(val));
  }

  logOut(){
    this.backend.deleteUserData();
    this.router.navigate(["/login"]);
  }

  showEventDetails(event){
    this.showDetails = true;
    console.log('click works');
    this.activeEvent = event;
  }
  hideEventDetails(){
    this.showDetails = false;
  }

  adminView(){
    this.router.navigate(['/events']);
  }
}
