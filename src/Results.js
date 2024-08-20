// src/Results.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css'; // Import your custom CSS file
import recommendationsData from './result.json'; // Import JSON data

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    // Set recommendations data from the imported JSON
    setRecommendations(recommendationsData);
  }, []);

  // Flatten the selected options into a single array
  const allSelectedOptions = Object.values(answers).flat();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="results-container">
      <h1>Recommendations & Assessment</h1>
      
      <div className="results-group">
        <div className="assessments-section squared-box">
          <h2>Assessments</h2>
          {allSelectedOptions.length > 0 ? (
            <ul>
              {allSelectedOptions.map(option => {
                const recommendation = recommendations[option];
                return (
                  <li key={option} className="result-item">
                    {recommendation ? (
                      <p>{recommendation.assessment || 'No assessment available.'}</p>
                    ) : (
                      <p>No assessment available for this option.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No options selected.</p>
          )}
        </div>

        <div className="recommendations-section squared-box">
          <h2>Recommendations</h2>
          {allSelectedOptions.length > 0 ? (
            <ul>
              {allSelectedOptions.map(option => {
                const recommendation = recommendations[option];
                return (
                  <li key={option} className="result-item">
                    {recommendation ? (
                      <p>{recommendation.recommendation || 'No recommendation available.'}</p>
                    ) : (
                      <p>No recommendation available for this option.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No options selected.</p>
          )}
        </div>
      </div>

      <button className="back-button" onClick={handleBack}>
        Back to Assessment
      </button>
    </div>
  );
};

export default Results;
