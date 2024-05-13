import { useState, useEffect } from 'react';
import {decode} from 'html-entities';

import './Quiz.css'
import { Questions } from '../Components/Questions';

export const Quiz = () => {

    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`API call failed with status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const quizResults = data.results.map(quiz => {
                    let answerArr = [...quiz.incorrect_answers, quiz.correct_answer]

                    answerArr.sort(() => Math.random() -0.5)

                    return {
                        id: crypto.randomUUID,
                        question: quiz.question,
                        correctAnswer: quiz.correct_answer,
                        incorrectAnswer: quiz.incorrect_answers,
                        allAnswers: answerArr,
                        chosenAnswer: ''
                    }
                })
                setQuizData(quizResults)
            })
            .catch(err => console.error('Error fetching quiz data:', err));
    }, []);

    return(
        <div className="quiz-main">
            {quizData.map(quiz => (
                <Questions 
                    id={quiz.id}
                    question={quiz.question}
                    allAnswers={quiz.allAnswers}
                />
            ))}
            <div className="btn-container">
                <button>Check Answer</button>
            </div>
        </div>
    );
}