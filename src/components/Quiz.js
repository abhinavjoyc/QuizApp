import "../App.css";
import { Questions } from "../helpers/Questions";
import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [feedback, setFeedback] = useState(""); // Feedback state
  const [correctOption, setCorrectOption] = useState(""); // Correct answer state

  const { score, setScore, gameState, setGameState } = useContext(GameStateContext);

  useEffect(() => {
    // Shuffle the questions array and pick 5 random questions
    const shuffledQuestions = [...Questions].sort(() => 0.5 - Math.random());
    setRandomQuestions(shuffledQuestions.slice(0, 5));
  }, []);

  const chooseOption = (option) => {
    setOptionChosen(option);

    // Check if the selected option is correct
    const isCorrect = randomQuestions[currentQuestion].answer === option;

    if (isCorrect) {
      setFeedback("Correct!");
      setScore(score + 1);
      setCorrectOption(option); // Set the correct option
    } else {
      setFeedback("Wrong! The correct answer is: " + randomQuestions[currentQuestion].answer);
      setCorrectOption(randomQuestions[currentQuestion].answer); // Set the correct option
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setOptionChosen(""); // Clear the selected option for the next question
    setFeedback(""); // Clear feedback for the next question
    setCorrectOption(""); // Clear correct option for the next question
  };

  const finishQuiz = () => {
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      {randomQuestions.length > 0 && (
        <>
          <h1>{randomQuestions[currentQuestion].prompt}</h1>
          <div className="questions">
            {["optionA", "optionB", "optionC", "optionD"].map((option) => (
              <button
                key={option}
                className={`${optionChosen === option ? "selected" : ""} ${correctOption === option ? "correct" : ""} ${feedback.includes("Wrong") && correctOption === option ? "wrong" : ""}`}
                onClick={() => chooseOption(option)}
              >
                {randomQuestions[currentQuestion][option]}
              </button>
            ))}
          </div>

          {feedback && <div className="feedback">{feedback}</div>}

          {currentQuestion === randomQuestions.length - 1 ? (
            <button onClick={finishQuiz} id="nextQuestion">
              Finish Quiz
            </button>
          ) : (
            <button onClick={nextQuestion} id="nextQuestion">
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
