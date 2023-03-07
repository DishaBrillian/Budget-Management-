import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../loginservice';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-budgethome',
  templateUrl: './budgethome.component.html',
  styleUrls: ['./budgethome.component.css'],
})
export class BudgethomeComponent {
  userDetails: any;
  public updateForm !: FormGroup
  updatedobject: any = 
  {
    "fullname": "riya",
    "email": "riya12@gmail.com",
    "password": "babuchak",
    "mobile": 9987654321,
    "id": 1,
    "income": 60,
    "threshold": 40,
    "currentexpenditure": 4200
  }
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private login: LoginService) {
    this.login.userobs.subscribe((result) => {
      this.userDetails = result;
      console.log(result)
    });
  }
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      updateamount: [''],
      updatethreshold: ['']
    })
  }
  updateamt() {
    this.updatedobject = this.login.userSource.getValue()
    this.updatedobject.income = this.updateForm.value['updateamount']
    this.updatedobject.threshold = this.updateForm.value['updatethreshold']
    this.http.put<any>("http://localhost:3000/RegisteredUsers/" + this.userDetails.id, this.updatedobject)
      .subscribe(res => {
        console.log(res)
      }, err => {
        alert("Something went Wrong!")
      })
  }
}