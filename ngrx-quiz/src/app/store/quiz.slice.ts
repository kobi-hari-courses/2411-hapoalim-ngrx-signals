import { QUESTIONS } from "../data/questions";
import { Answer } from "../models/answer.model";
import { Question } from "../models/question.model";

export interface QuizSlice {
    readonly questions: Question[];
    readonly answers: Answer[];
    readonly isBusy: boolean;
}

export const initialQuizSlice: QuizSlice = {
    questions: QUESTIONS,
    answers: [], 
    isBusy: false
}