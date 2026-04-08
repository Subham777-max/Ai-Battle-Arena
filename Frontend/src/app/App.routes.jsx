import { Routes, Route } from 'react-router-dom';
import ChatPage from '../features/Chat/pages/ChatPage';
import HistoryPage from '../features/Chat/pages/HistoryPage';

const AppRoutes = ({ onMenuClick }) => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage onMenuClick={onMenuClick} />} />
      <Route path="/history" element={<HistoryPage onMenuClick={onMenuClick} />} />
    </Routes>
  );
};

export default AppRoutes;
