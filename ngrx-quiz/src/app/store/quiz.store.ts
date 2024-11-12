import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed, effect, inject } from '@angular/core';
import { Answer } from '../models/answer.model';
import { withLocalStorage } from '../custom-features/with-local-storage';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustAll, exhaustMap, map, tap } from 'rxjs';
import { ColorQuizGeneratorService } from '../services/color-quiz-generator.service';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => {
    const answersCount = computed(() => store.answers().length);
    const currentQuestionIndex = answersCount;

    return {
      questionsCount: computed(() => store.questions().length),
      answersCount,
      currentQuestionIndex,
      currentQuestion: computed(() => 
        store.questions()[currentQuestionIndex()]),
      isDone: computed(() => answersCount() === store.questions().length), 
      correctCount: computed(() => store.answers()
            .filter(answer => answer.isCorrect)
            .length
        )
    };
  }), 
  withMethods(store => {
    const generator = inject(ColorQuizGeneratorService);
    return {
        answerCurrentQuestion: (userAnswer: number) => {
            const answer: Answer = {
                userAnswer, 
                isCorrect: store.currentQuestion().correctIndex === userAnswer
            }
    
            patchState(store, state => ({answers: [...state.answers, answer]}));
        }, 
        generateNewQuiz: rxMethod<void>(trigger$ => {
            return trigger$.pipe(
                tap(() => patchState(store, {isBusy: true})),
                exhaustMap(() => generator.createRandomQuiz()), 
                tap(questions => patchState(store, {
                    questions, 
                    answers: [],
                    isBusy: false,
                }))
            )
        })    
    }
  }), 
  withLocalStorage('exam'), 
  withDevtools('quiz')
);
