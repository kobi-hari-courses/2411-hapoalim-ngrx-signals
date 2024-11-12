import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { Question } from '../../models/question.model';
import { SharedModule } from '../../shared.module';
import { FormControl, Validators } from '@angular/forms';
import { QuizStore } from '../../store/quiz.store';

@Component({
  selector: 'app-question-presenter',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './question-presenter.component.html',
  styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  readonly store = inject(QuizStore);
  readonly question = this.store.currentQuestion;

  form = new FormControl<number | null>(null, Validators.required);
  submittedAnswer: number | null = null;

  get isAnswered() { return this.submittedAnswer !== null}


  reset() {
    this.form.reset(null);
    this.form.enable();
    this.submittedAnswer = null;
  }

  submit() {
    const res = this.form.value;
    if (res === null) return;

    this.submittedAnswer = res;
    this.form.disable();
    setTimeout(() => {
      this.reset();
      this.store.answerCurrentQuestion(res);
      
    }, 1500);


  }


}
