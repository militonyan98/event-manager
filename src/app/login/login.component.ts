import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../backend-connect.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  bigError = false;
  bigErrorMessage = "";
  constructor(private backendConnect : BackendConnectService, private router: Router, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
    });
    if(window.sessionStorage.getItem('token'))
        this.processLogin();
  }
  get formControls() { return this.registerForm.controls; }

  loginUser(event){
    event.preventDefault();
    this.submitted=true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      return;
    }
    const target=event.target;
    let email=target.querySelector("#email").value;
    let password=target.querySelector("#password").value;
    console.log(this.backendConnect);
    this.backendConnect.login(email, password)
      .subscribe(data=>{
        console.log(data);
          this.backendConnect.setToken(data.token);
          window.sessionStorage.setItem('user', JSON.stringify(data.user));
          this.processLogin();
        }, 
        error=>{
          this.bigError = true; 
          this.bigErrorMessage=error.error.message
        });
  }

  private processLogin() {
    var user = JSON.parse(window.sessionStorage.getItem('user'));
    if (user.isAdmin) {
      this.router.navigate(["/events"]);
    }
    else {
      this.router.navigate(["/view-events"]);
    }
  }

  changed(){
    console.log('changed');
    
  }

}
