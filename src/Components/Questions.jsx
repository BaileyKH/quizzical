import '/src/Pages/Quiz.css'

import {decode} from 'html-entities';

export const Questions = (props) => {
    return(
        <div key={props.id} className="quiz-outer">
            <h1>{decode(props.question)}</h1>
            <div className="answers">
                {props.allAnswers.map(answers => (
                    <div>
                        <p>{decode(answers)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}