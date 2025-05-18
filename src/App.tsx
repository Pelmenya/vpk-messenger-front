// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from './app/store';
import { IndexPage } from './pages/index-page';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { ChatPage } from './pages/chat-page';

export const App = () => {
  const isLoggedIn = useSelector((state: TRootState) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {isLoggedIn ? (
        <>
          <Route path="/chats" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/chats" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
