export class EventModel {
    public name: String;
    public description: String;
    public date: Date;
    public eventType: Number;
    public id : Number;
    constructor()
    {}
    public getShortDescription(): String
    {
        if(this.description.length<20){
            return this.description;
        }
        return this.description.slice(0, 20)+"...";
    }
}

export class EventResponse {
    public events: EventModel [];
}

export class EventType {
    public value: Number;
    public type: String;
}