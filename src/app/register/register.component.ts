import { Component, OnInit } from '@angular/core';
import {QuizService} from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

userRegistered = false;
  emailPattern = "^[a-z0-9._%=-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  constructor(public quizService: QuizService, private route: Router) { }

  ngOnInit() {
  }

  OnSubmit(name:string, email:string){
  //Normal the above registeredUser method of quizService will return an observable which we will by subscribing it. 
  //This we will continue in our future demos.
    this.userRegistered = this.quizService.registeredUser(name, email);
    if(this.userRegistered){
      var data = '';
      localStorage.clear();
      localStorage.setItem('participant', JSON.stringify(data));
      this.route.navigate(['/quiz']);
    }
  }
}
