import { Component, computed, inject, input, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { computeMsgId } from '@angular/compiler';
import { QuizStore } from '../../store/quiz.store';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent {
  readonly store = inject(QuizStore);
  readonly correct = this.store.correctCount;
  readonly total = this.store.questionsCount;

  readonly score = computed(() => this.correct() / this.total());

}
