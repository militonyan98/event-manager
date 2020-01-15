import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../backend-connect.service';
import { EventModel, EventType } from '../models/event-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public events: EventModel [];
  public eventTypes : EventType [];
  public activeEvent : EventModel;
  public editVisible : boolean;
  public createVisible: boolean;
  public deleteVisible : boolean;
  public loading: boolean;
  public countEvents: Number = 0;

  constructor(private backend: BackendConnectService, private router: Router) { }

  ngOnInit() {
    if(!JSON.parse(window.sessionStorage.getItem("user")).isAdmin)
    {
      this.router.navigate(['/error']);
      return;
    }
    this.loading=true;
    this.backend.getEventTypes().subscribe(data=>{
      this.eventTypes=data;
      this.backend.getEvent().subscribe(data=>{
        this.events=data;
        this.countEvents=this.events.length;
        console.log(this.events);
        this.loading=false;
      },
      err=>
      this.router.navigate(["/"])
      );
    })
   
  }

  public showEdit(event){
    this.activeEvent = event;
    this.editVisible = true;
  }

  public hideEdit(save){
    if(save){
      console.log("saving");
  
      if(this.createVisible){
        this.backend.createEvent(this.activeEvent)
        .subscribe(data=>{
          console.log(data);
          this.events.push(data);
        });
      }
      else{
        this.backend.updateEvent(this.activeEvent)
        .subscribe(data=>{
          
          console.log(data);

        });
      }
    }

    this.editVisible = false;
    this.createVisible = false;
  }

  public createEvent(){
    this.createVisible = true;
    this.activeEvent = new EventModel();
  }

  public deleteEvent(event){
    this.backend.deleteEvent(event)
    .subscribe(data=>
      {
         this.events = this.events.filter(x=>x!=event);
      });
  }

  public updateEventType(event)
  {
     this.activeEvent.eventType = Number.parseInt(event.target.value);
  }

  public logOut(){
    this.backend.deleteUserData();
    this.router.navigate(["/login"])
  }

  public userView(){
    this.router.navigate(["/view-events"])
  }
}
