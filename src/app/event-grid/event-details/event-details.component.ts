import { Component, OnInit, Input } from '@angular/core';
import { EventModel, EventType } from 'src/app/models/event-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  router : Router;
  @Input('event') event : EventModel;
  @Input('eventTypes') eventTypes: Map<number,EventType>;
  constructor() { }

  ngOnInit() {
  }

  
  
}
