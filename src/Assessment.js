import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assessment.css'; // Import your custom CSS file
import Notification from './Notification'; // Import the Notification component

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('/Question_Option.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
        setOptions(data.options);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (questionId, option) => {
    setAnswers(prevAnswers => {
      const currentAnswers = prevAnswers[questionId] || [];
      const updatedAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(item => item !== option)  // Remove the option if already selected
        : [...currentAnswers, option];  // Add the option if not already selected

      return {
        ...prevAnswers,
        [questionId]: updatedAnswers
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any question has no selected options
    const hasUnansweredQuestions = questions.some(question => {
      return (answers[question.id] || []).length === 0;
    });

    if (hasUnansweredQuestions) {
      setNotification('Please select at least one option for each question.');
      return; // Prevent form submission
    }

    navigate('/results', { state: { answers } });
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <div className="assessment-container">
      <h1>Self-Assessment</h1>
      <form onSubmit={handleSubmit}>
        {questions.map(question => (
          <div key={question.id} className="question-block">
            <h2>{question.text}</h2>
            <div className="options">
              {options[question.id]?.map(option => (
                <label key={option} className="option-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={(answers[question.id] || []).includes(option)}
                    onChange={() => handleChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default Assessment;
