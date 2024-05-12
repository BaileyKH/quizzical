import { useState, useEffect } from 'react';
import {decode} from 'html-entities';

import './Quiz.css'

export const Quiz = () => {

    const [quizData, setQuizData] = useState([]);
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`API call failed with status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setQuizData(data.results))
            .catch(err => console.error('Error fetching quiz data:', err));
    }, []);

    return(
        <div className="quiz-main">
            {quizData.map(quiz => (
                <div key={crypto.randomUUID()}>
                    <h1>{decode(quiz.question)}</h1>
                    <div>
                        <p>{decode(quiz.correct_answer)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}