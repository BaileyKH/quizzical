import { useState, useEffect } from 'react';
import {decode} from 'html-entities';

import { Questions } from '../Components/Questions';

import './Quiz.css'


export const Quiz = () => {

    const [quizData, setQuizData] = useState([]);
    const [count, setCount] = useState(0)

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
                        id: crypto.randomUUID(),
                        question: quiz.question,
                        correctAnswer: quiz.correct_answer,
                        incorrectAnswer: quiz.incorrect_answers,
                        allAnswers: answerArr,
                        chosenAnswer: '',
                    }
                })
                setQuizData(quizResults)
            })
            .catch(err => console.error('Error fetching quiz data:', err));
    }, []);

    function pickAnswer(id, answer) {
        setQuizData(prevData => prevData.map(data => {
            if(data.id === id) {
                return {...data, chosenAnswer: data.chosenAnswer ? data.chosenAnswer : answer}
            }
            console.log(data)
            return data
          }))
    }

    function checkAnswer() {
        quizData.map(answer => {
            if (answer.correctAnswer === answer.chosenAnswer){
                setCount(prevCount => prevCount + 1)
            }
        })
    }

    return(
        <div className="quiz-main">
            {quizData.map(quiz => (
                <Questions 
                    key={quiz.id}
                    id={quiz.id}
                    question={quiz.question}
                    allAnswers={quiz.allAnswers}
                    chosenAnswer={quiz.chosenAnswer} 
                    selectPick={(answer) => pickAnswer(quiz.id, answer)}
                />
            ))}
            <div className="btn-container">
                <p>Correct: {count} / 5</p>
                <button onClick={checkAnswer}>Check Answer</button>
            </div>
        </div>
    );
}