import '/src/Pages/Quiz.css'

import {decode} from 'html-entities';

export const Questions = (props) => {

    // const styles = {
    //     backgroundColor: props.chosenAnswer === answer ? "#59E391" : "#000000"
    //   }

    const getBackgroundColor = (answer) => {
        if (!props.checkedAnswers){
            return props.chosenAnswer === answer ? "rgba(255, 255, 255, 0.2)" : "none";
        }

        if (props.checkedAnswers) {
            if (answer === props.correctAnswer) {
                return "rgba(89, 227, 144, 0.3)"
            }
            if (answer === props.chosenAnswer && answer !== props.correctAnswer) {
                return "rgba(255, 105, 97, 0.3)"
            }
        }
        return "none"
    }

    return(
        <div className="quiz-outer">
            <h1>{decode(props.question)}</h1>
            <div className="answers">
                {props.allAnswers.map(answer => (
                    <div key={answer} onClick={() => props.selectPick(answer)}>
                        <p style={{backgroundColor: getBackgroundColor(answer)}}>{decode(answer)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}