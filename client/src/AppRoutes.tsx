
import { Route, Routes } from 'react-router-dom';
import App from './App.js';
import { TaskDetail } from './components/TaskDetail.js';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
    </Routes>
  );
}
