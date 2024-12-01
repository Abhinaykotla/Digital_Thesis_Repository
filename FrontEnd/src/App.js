import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SearchPage from './SearchPage';
import SubmitThesisPage from './SubmitThesisPage';
import ThesisSubmissionPage from './ThesisSubmissionPage';
import ThesisSubmissionsListPage from './ThesisSubmissionsListPage';
import StatisticsDashboard from './StatisticsDashboard';
import Statistics from './Statistics';
import PeerReview from './PeerReview';
import About from './About';
import Contact from './Contact';
import NotificationSystem from './NotificationSystem';
import AuthorDashboard from './AuthorDashboard';
import AuthorHeader from './AuthorHeader';
import AdminDashboard from './AdminDashboard';
import AdminHeader from './AdminHeader';
import ChatPage from './ChatPage';
import Logout from './Logout';


const App = () => {
  const author_id = localStorage.getItem('user_id');
  let headerComponent = <Header />; // Default Header
      
  if(author_id)
  {
      const role = localStorage.getItem('role');
      if (author_id) {
        if (role === 'author') {
          headerComponent = <AuthorHeader />;
        } else if (role === 'admin') {
          headerComponent = <AdminHeader />;
        }
      }
  }
  
  return (
    <Router>
      {headerComponent}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/submitthesis" element={<SubmitThesisPage />} />
        <Route path="/thesis" element={<ThesisSubmissionPage />} />
        <Route path="/thesistable" element={<ThesisSubmissionsListPage />} />
        <Route path="/statistics" element={<StatisticsDashboard />} />
        <Route path="/statisticsview" element={<Statistics />} />
        <Route path="/peerreview" element={<PeerReview />} />
        <Route path="/peerreview/:thesisId" element={<PeerReview />} /> {/* Changed here */}

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notifications" element={<NotificationSystem />} />
        <Route path="/authordashboard" element={<AuthorDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
      
    </Router>
  );
};

export default App;
