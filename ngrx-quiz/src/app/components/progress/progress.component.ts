import { Component, computed, inject, input, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  readonly store = inject(QuizStore);
  readonly value = this.store.answersCount;
  readonly of = this.store.questionsCount;

  readonly ratio = computed(() => this.value() / this.of());
}
