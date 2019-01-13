import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 10) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

      this.quizService.getAnswers().subscribe(
        (data: any) => {
          console.log(data);
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e, i) => {
            if (e.answer == data[i]) {
              this.quizService.correctAnswerCount++;
              e.correct = data[i];
            }
          })
        }
      )
    } else {
      this.router.navigate(['/quiz']);
    }
  }

  onSubmit() {
    //call this.quizService.submitScore() method here to submit the record.
    this.restart();
  }

  restart() {
    localStorage.setItem("qnProgress", "0");
    localStorage.setItem("qns", "");
    localStorage.setItem("seconds", "0");
    this.router.navigate(['/quiz']);
  }
}
