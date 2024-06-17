import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get state
import './result.css';
import Sidebar from '../../component/sidebar';
import PercentageCircle from './PercentageCircle';

const PredictionScoreBox = () => {
  const location = useLocation(); // Get state from the location
  const { prediction } = location.state; // Extract prediction from state

  return (
    <div>
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="prediction-score-container">
            <div className="prediction-score-box">
              <div className="score-text">Quality Score of Wine</div>
              <PercentageCircle percent={prediction} duration={2000} circleSize={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionScoreBox;
