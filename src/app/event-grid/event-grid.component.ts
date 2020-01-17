import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../backend-connect.service';
import { EventModel, EventType} from '../models/event-model';
import { Router } from '@angular/router';

import { trigger, transition, animate, style } from '@angular/animations';
import { LoginUser } from '../models/login-model';

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
  public eventImages : Map<number,string>;
  public activeEvent : EventModel;
  public showDetails: boolean;
  public isAdmin: boolean = JSON.parse(window.sessionStorage.getItem("user")).isAdmin;
  private defaultImage = "https://www.muralswallpaper.com/app/uploads/soft-pastel-pink-marble-room-820x532.jpg";
  private user : LoginUser;
  constructor(private backend: BackendConnectService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    this.activeEvent = new EventModel();
    this.eventImages = new Map<number,string>();
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
        this.loadImages();
      },
      err=>{
        this.router.navigate(["/"]);
        console.log(err);
      })
      console.log(this.eventTypes);
    })
   
  }

  loadImages(){
    
    this.events.forEach(element => {
      this.eventImages.set(element.id,this.defaultImage);
      if(element.image){
        this.backend.getImage(element.image).subscribe((data)=>{
          
        },
        (err)=>{
          if(err.status == 200)
            this.eventImages.set(element.id,err.url);
        });
      }
      
    });
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

  getDateFormat(date){
    if(date.includes('T'))
      return date.replace('T',' ');
    return date;
  }
}
