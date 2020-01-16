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
  public eventTypes : EventType[];
  public eventTypesMap : Map<number,EventType>;
  public activeEvent : EventModel;
  public editVisible : boolean;
  public createVisible: boolean;
  public deleteVisible : boolean;
  public loading: boolean;
  public countEvents: number = 0;
  public currentPage: number = 1;
  private minPage = 1;
  private maxPage = 1;
  private selectedFile : File;
  constructor(private backend: BackendConnectService, private router: Router) { }

  ngOnInit() {
    if(!JSON.parse(window.sessionStorage.getItem("user")).isAdmin)
    {
      this.router.navigate(['/error']);
      return;
    }
    this.loading=true;
    this.backend.getEventTypes().subscribe(data=>{
      this.eventTypes = data;
      this.eventTypesMap = new Map<number,EventType>();
      data.forEach(element => {
        this.eventTypesMap.set(element.value,element);
      });
      this.getEvents();
    })
   
  }

  public prevPage()
  {
    if(this.currentPage-1<this.minPage)
      return;
    this.currentPage--;
    this.getEvents();

  }
 

  public nextPage()
  {
    if(this.currentPage+1>this.maxPage)
      return;
    this.currentPage++;
    this.getEvents();

  }

  private getEvents() {
    this.backend.getEvent(this.currentPage).subscribe(data => {
      this.updatePageLimits(data.headers.get('Link'));
      this.events = data.body;
      this.countEvents = this.events.length;
      this.events.forEach(element => {
        if(element.image){
          this.backend.getImage(element.image).subscribe((data)=>{
            console.log(data)
          },
          (err)=>{
            console.log(err.url)
          });
        }
        
      });
      console.log(this.events);
      this.loading = false;
    }, err => this.router.navigate(["/"]));
  }


  getEventType(val){
    //to battle some weird events where type is string
    return this.eventTypesMap.get(Number.parseInt(val));
  }

  private updatePageLimits(linkParams)
  {
    let parts = linkParams.split(',').reduce((acc, link) => {
      let match = link.match(/<(.*)>; rel="(\w*)"/)
      if(match){
        let url = match[1]
        let rel = match[2]
        acc[rel] = url
        return acc;
      }
      return undefined;
     
   }, {})
   if(parts){
    let first = parts['first'];
    let last = parts['last'];
    this.minPage = this.extractPage(first);
    this.maxPage = this.extractPage(last);

   }
   else{
    this.minPage = 1;
    this.maxPage = 1;
   }
    
   
  }

  private extractPage(url)
  {
    let match = url.match(/_page=(\d+)/);
    console.log(match);
    return Number.parseInt(match[1]);
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
          
          this.backend.imageUpload(this.selectedFile,data.id).subscribe((event)=>console.log(event));
          this.events.push(data);
        });
      }
      else{
        this.backend.updateEvent(this.activeEvent)
        .subscribe(data=>{
          
          this.backend.imageUpload(this.selectedFile,data.id).subscribe((event)=>console.log(event));
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    this.activeEvent.image = this.selectedFile.name;
  }

}
