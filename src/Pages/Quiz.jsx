import { useState, useEffect } from 'react';

import { Questions } from '../Components/Questions';

import './Quiz.css'


export const Quiz = () => {

    const [quizData, setQuizData] = useState([]);
    const [count, setCount] = useState(0)
    const [playAgain, setPlayAgain] = useState(false)
    const [reset, setReset] = useState(false)
    const [checkedAnswers, setCheckedAnswers] = useState(false);

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
    }, [reset]);

    function pickAnswer(id, answer) {
        setQuizData(prevData => prevData.map(data => {
            if(data.id === id) {
                return {...data, chosenAnswer: data.chosenAnswer ? data.chosenAnswer : answer}
            }
            return data
          }))
    }

    function checkAnswer() {
        quizData.map(answer => {
            if (answer.correctAnswer === answer.chosenAnswer){
                setCount(prevCount => prevCount + 1)
            }
        })
        setCheckedAnswers(true);
        setPlayAgain(prevPlay => !prevPlay)
    }

    function resetGame() {
        if (playAgain) {
            setCount(0)
            setPlayAgain(prev => !prev)
            setReset(prevPlay => !prevPlay)
            setCheckedAnswers(false);
        }
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
                    correctAnswer={quiz.correctAnswer}
                    checkedAnswers={checkedAnswers}
                    selectPick={(answer) => pickAnswer(quiz.id, answer)}
                />
            ))}
            <div className="btn-container">
                <p>{playAgain ? `You scored ${count} / 5 correct answers` : ""}</p>
                <button onClick={() => {playAgain ? resetGame() : checkAnswer()}}>{playAgain ? "Play Again" : "Check Answer"}</button>
            </div>
        </div>
    );
}