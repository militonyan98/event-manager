export class EventModel {
    public name: string;
    public description: string;
    public date: Date;
    public eventType: number;
    public id : number;
    public image: string;
    constructor()
    {}
    public getShortDescription(): string
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
    public value: number;
    public type: string;
}