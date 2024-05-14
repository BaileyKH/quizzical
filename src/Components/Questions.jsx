import '/src/Pages/Quiz.css'

import {decode} from 'html-entities';

export const Questions = (props) => {

    // const styles = {
    //     backgroundColor: props.chosenAnswer === answer ? "#59E391" : "#000000"
    //   }

    return(
        <div className="quiz-outer">
            <h1>{decode(props.question)}</h1>
            <div className="answers">
                {props.allAnswers.map(answer => (
                    <div key={answer} onClick={() => props.selectPick(answer)}>
                        <p style={{backgroundColor: props.chosenAnswer === answer ? "#59E391" : "none"}}>{decode(answer)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}