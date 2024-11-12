import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { QuizStore } from './store/quiz.store';
import { QuestionPresenterComponent } from "./components/question-presenter/question-presenter.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { DoneComponent } from "./components/done/done.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent, ProgressComponent, DoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
})
export class AppComponent {
  readonly store = inject(QuizStore);

  readonly questionsLength = computed(() => 
    this.store.questions().length);
}
