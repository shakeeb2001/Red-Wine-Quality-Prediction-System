// import React, { useState, useEffect } from 'react';
// import './dashboard.css';
// import Sidebar from '../../component/sidebar';
// import axios from 'axios';

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;
//   const [reportCount, setReportCount] = useState(0);
//   const [predictionCount, setPredictionCount] = useState(0);


//   useEffect(() => {
//     fetchPredictions();
//     fetchReportCount();
//     fetchPredictionCount();
//   }, []);

//   const fetchPredictions = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/get-predictions');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching prediction data:', error);
//     }
//   };

//   const handleDelete = async (reference_no) => {
//     try {
//       await axios.delete(`http://localhost:4000/delete-prediction/${reference_no}`);
//       setData(data.filter(item => item.reference_no !== reference_no));
       
//     } catch (error) {
//       console.error('Error deleting prediction:', error);
//     }
//   };

//   const fetchReportCount = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/report-count');
//       setReportCount(response.data.count);
//     } catch (error) {
//       console.error('Error fetching report count:', error);
//     }
//   };

//   const fetchPredictionCount = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:4000/prediction-count');
//       const data = await response.json();
//       setPredictionCount(data.count);
//     } catch (error) {
//       console.error('Error fetching prediction count:', error);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const renderPagination = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     return (
//       <div className="pagination">
//         <button
//           className="page-nav"
//           onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
//           disabled={currentPage === 1}
//         >
//           &lt;
//         </button>
//         {pageNumbers.map(number => (
//           <button
//             key={number}
//             className={`page-number ${currentPage === number ? 'active' : ''}`}
//             onClick={() => handlePageChange(number)}
//           >
//             {number}
//           </button>
//         ))}
//         <button
//           className="page-nav"
//           onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
//           disabled={currentPage === totalPages}
//         >
//           &gt;
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main-content">

//         <div className="dashboard-content">
//           <div className="dashboard-stats">
//             <div className="stat-box">
//               <div className="stat-label">Predictions</div>
//               <div className="stat-value">{predictionCount}</div>
//             </div>
//             <div className="stat-box archive-box">
//               <div className="stat-label">Report</div>
//               <div className="stat-value">{reportCount}</div>
//             </div>
//           </div>
//           <button className="predict-button">Predict</button>
//           <table className="dashboard-table">
//             <thead>
//               <tr>
//                 <th>Reference No</th>
//                 <th>Fixed Acidity</th>
//                 <th>Volatile Acidity</th>
//                 <th>Chlorides</th>
//                 <th>pH Level</th>
//                 <th>Alcohol Level</th>
//                 <th>Quality Score</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedData.map((row, index) => (
//                 <tr key={row.reference_no}>
//                   <td>{row.reference_no}</td>
//                   <td>{row.fixed_acidity}</td>
//                   <td>{row.volatile_acidity}</td>
//                   <td>{row.chlorides}</td>
//                   <td>{row.pH}</td>
//                   <td>{row.alcohol}</td>
//                   <td>{row.prediction}</td>
//                   <td>
//                     <button onClick={() => handleDelete(row.reference_no)}>
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {renderPagination()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Sidebar from '../../component/sidebar';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [reportCount, setReportCount] = useState(0);
  const [predictionCount, setPredictionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPredictions();
    fetchReportCount();
    fetchPredictionCount();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/get-predictions');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reference_no) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/delete-prediction/${reference_no}`);
      setData(data.filter(item => item.reference_no !== reference_no));
    } catch (error) {
      console.error('Error deleting prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/report-count');
      setReportCount(response.data.count);
    } catch (error) {
      console.error('Error fetching report count:', error);
    }
  };

  const fetchPredictionCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/prediction-count');
      setPredictionCount(response.data.count);
    } catch (error) {
      console.error('Error fetching prediction count:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        <button
          className="page-nav"
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="page-nav"
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  const handlePredictClick = () => {
    navigate('/prediction');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-box">
              <div className="stat-label">Predictions</div>
              <div className="stat-value">{predictionCount}</div>
            </div>
            <div className="stat-box archive-box">
              <div className="stat-label">Report</div>
              <div className="stat-value">{reportCount}</div>
            </div>
          </div>
          <button className="predict-button" onClick={handlePredictClick}>Predict</button>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Reference No</th>
                  <th>Fixed Acidity</th>
                  <th>Volatile Acidity</th>
                  <th>Chlorides</th>
                  <th>pH Level</th>
                  <th>Alcohol Level</th>
                  <th>Quality Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, index) => (
                  <tr key={row.reference_no}>
                    <td>{row.reference_no}</td>
                    <td>{row.fixed_acidity}</td>
                    <td>{row.volatile_acidity}</td>
                    <td>{row.chlorides}</td>
                    <td>{row.pH}</td>
                    <td>{row.alcohol}</td>
                    <td>{row.prediction}</td>
                    <td>
                      <button onClick={() => handleDelete(row.reference_no)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


