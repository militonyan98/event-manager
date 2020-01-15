export class LoginModel {
    public token : string;
    public user : LoginUser;
}

export class LoginUser {
    public id : Number;
    public name : String;
    public srName : String;
    public email : String;
    public password: String;
    public isAdmin : boolean;
}