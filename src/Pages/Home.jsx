import { Link } from 'react-router-dom';

import './Home.css'

export const Home = () => {
    return(
        <div className="home-container">
            <div className="home-text">
                <h1>Quizzical</h1>
                <p>Test your knowledge</p>
            </div>
            <div className="home-btn">
                <Link to="/quiz">
                    <button>Start Quiz</button>
                </Link>
            </div>
        </div>
    );
}