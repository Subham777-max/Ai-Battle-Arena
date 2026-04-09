import { Routes, Route } from 'react-router-dom';
import ChatPage from '../features/Chat/pages/ChatPage';
import HistoryPage from '../features/Chat/pages/HistoryPage';
import LeaderboardPage from '../features/Chat/pages/LeaderboardPage';
import ModelBenchPage from '../features/Chat/pages/ModelBenchPage';

const AppRoutes = ({ onMenuClick }) => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage onMenuClick={onMenuClick} />} />
      <Route path="/history" element={<HistoryPage onMenuClick={onMenuClick} />} />
      <Route path="/leaderboard" element={<LeaderboardPage onMenuClick={onMenuClick} />} />
      <Route path="/models" element={<ModelBenchPage onMenuClick={onMenuClick} />} />
    </Routes>
  );
};

export default AppRoutes;
