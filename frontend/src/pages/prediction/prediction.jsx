// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './prediction.css';
// import Sidebar from '../../component/sidebar';
// import Navbar from '../../component/navbar';

// const PredictionForm = () => {
//   const [formData, setFormData] = useState({
//     reference_no: '',
//     fixed_acidity: '',
//     volatile_acidity: '',
//     citric_acid: '',
//     residual_sugar: '',
//     chlorides: '',
//     free_sulfur_dioxide: '',
//     total_sulfur_dioxide: '',
//     density: '',
//     pH: '',
//     sulphates: '',
//     alcohol: ''
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//     setError(null); // Reset error when form data changes
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const { reference_no, ...predictionData } = formData;

//     try {
//       // Make the prediction request excluding the reference_no
//       const predictionRes = await axios.post('http://127.0.0.1:5001/predict', predictionData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const { prediction } = predictionRes.data;

//       // Add prediction results to formData
//       const dataToSend = {
//         ...formData,
//         prediction
//       };

//       // Save form input data along with prediction results to Firestore via backend endpoint
//       await axios.post('http://127.0.0.1:4000/save-prediction', dataToSend, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       await axios.post('http://127.0.0.1:4000/increment-prediction-count');
  

//       // Navigate to result page
//       navigate('/result', { state: { prediction } });
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="prediction-page">
//       <Sidebar />
//       <div className="main-content">
//         <div className="prediction-form">
//           <h2>Prediction</h2>
//           {error && <div className="error">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Reference No</label>
//               <input type="text" name="reference_no" value={formData.reference_no} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Fixed Acidity</label>
//               <input type="text" name="fixed_acidity" value={formData.fixed_acidity} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Volatile Acidity</label>
//               <input type="text" name="volatile_acidity" value={formData.volatile_acidity} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Citric Acid</label>
//               <input type="text" name="citric_acid" value={formData.citric_acid} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Residual Sugar</label>
//               <input type="text" name="residual_sugar" value={formData.residual_sugar} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Chlorides</label>
//               <input type="text" name="chlorides" value={formData.chlorides} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Free Sulfur Dioxide</label>
//               <input type="text" name="free_sulfur_dioxide" value={formData.free_sulfur_dioxide} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Total Sulfur Dioxide</label>
//               <input type="text" name="total_sulfur_dioxide" value={formData.total_sulfur_dioxide} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Density</label>
//               <input type="text" name="density" value={formData.density} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>pH Level</label>
//               <input type="text" name="pH" value={formData.pH} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Sulphates</label>
//               <input type="text" name="sulphates" value={formData.sulphates} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <div className="form-group">
//               <label>Alcohol Level</label>
//               <input type="text" name="alcohol" value={formData.alcohol} onChange={handleChange} placeholder="Please Enter" required />
//             </div>
//             <button type="submit" className="predict-form-button" disabled={isLoading}>
//               {isLoading ? 'Predicting...' : 'Predict'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PredictionForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './prediction.css';
import Sidebar from '../../component/sidebar';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    reference_no: '',
    fixed_acidity: '',
    volatile_acidity: '',
    citric_acid: '',
    residual_sugar: '',
    chlorides: '',
    free_sulfur_dioxide: '',
    total_sulfur_dioxide: '',
    density: '',
    pH: '',
    sulphates: '',
    alcohol: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(null); // Reset error when form data changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { reference_no, ...predictionData } = formData;

    try {
      // Make the prediction request excluding the reference_no
      const predictionRes = await axios.post('http://127.0.0.1:5001/predict', predictionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { prediction } = predictionRes.data;

      // Add prediction results to formData
      const dataToSend = {
        ...formData,
        prediction
      };

      // Save form input data along with prediction results to Firestore via backend endpoint
      await axios.post('http://127.0.0.1:4000/save-prediction', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Fetch the updated prediction count
      const countRes = await axios.get('http://127.0.0.1:4000/prediction-count');
      const predictionCount = countRes.data.count;

      // Navigate to result page
      navigate('/result', { state: { prediction, predictionCount } });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-page">
      <Sidebar />
      <div className="main-content">
        <div className="prediction-form">
          <h2>Prediction</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Reference No</label>
              <input type="text" name="reference_no" value={formData.reference_no} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Fixed Acidity</label>
              <input type="text" name="fixed_acidity" value={formData.fixed_acidity} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Volatile Acidity</label>
              <input type="text" name="volatile_acidity" value={formData.volatile_acidity} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Citric Acid</label>
              <input type="text" name="citric_acid" value={formData.citric_acid} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Residual Sugar</label>
              <input type="text" name="residual_sugar" value={formData.residual_sugar} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Chlorides</label>
              <input type="text" name="chlorides" value={formData.chlorides} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Free Sulfur Dioxide</label>
              <input type="text" name="free_sulfur_dioxide" value={formData.free_sulfur_dioxide} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Total Sulfur Dioxide</label>
              <input type="text" name="total_sulfur_dioxide" value={formData.total_sulfur_dioxide} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Density</label>
              <input type="text" name="density" value={formData.density} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>pH Level</label>
              <input type="text" name="pH" value={formData.pH} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Sulphates</label>
              <input type="text" name="sulphates" value={formData.sulphates} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <div className="form-group">
              <label>Alcohol Level</label>
              <input type="text" name="alcohol" value={formData.alcohol} onChange={handleChange} placeholder="Please Enter" required />
            </div>
            <button type="submit" className="predict-form-button" disabled={isLoading}>
              {isLoading ? 'Predicting...' : 'Predict'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
