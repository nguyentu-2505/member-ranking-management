import LandingPage from '../src/pages/LandingPage.jsx';
import ChatPage from '../src/pages/ChatPage.jsx';

export const routes = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  }
];
