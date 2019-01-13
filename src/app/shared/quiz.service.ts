import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestionsList}  from '../Interface/questionsListInterface';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
//------------------properties-----------
readonly rootUrl = 'http://localhost:2890';
private _url: string = "/assets/data/questionsList.json";
private _urlAns: string = "/assets/data/answersList.json";
qns: any[];
seconds: number;
timer;
qnProgress: number;
correctAnswerCount : number = 0;

//------------------Helper Methods--------
  constructor(private http:HttpClient) { }

  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':' + Math.floor(this.seconds/60) + ':' + Math.floor(this.seconds%60);
  }

  getParticipantName(){
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

//------------------Http Methods----------
registeredUser(name: string, email:string){
  var body = {
    Name: 'Alok Rai',//name,
    Email: 'alokrai319@gmail.com'
  }
  if(name===body.Name && email===body.Email){
    return true;
  }else{
    return false;
  }
/*---In real world apps we will use apis to register a user but for now we are just simply validating it in a function.
return this.http.post(this.rootUrl+ '/api/registeredUser', body);*/
}

getQuestionsList(): Observable<IQuestionsList[]>{

  return this.http.get<IQuestionsList[]>(this._url);
  /*---In real world apps we will use apis to get the questionsList but for now we are just simply getting it from Json Object.
return this.http.get(this.rootUrl+ '/api/getQuestionsList');*/
}

getAnswers(){
//var body = this.qns.map(x=> x.QnID);
return this.http.get(this._urlAns);
}

//The main motive of this funciton is basically to submit the record into the database which we will implement in future.
submitScore(){
  var body = JSON.parse(localStorage.getItem('participant'));
  body.score = this.correctAnswerCount;
  body.Timespent = this.seconds;
  //return this.http.post('some_url', body);
}
}
