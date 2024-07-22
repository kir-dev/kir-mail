import { Route, Routes } from 'react-router-dom';
import { Header } from './components/navbar';
import { DashboardPage } from './pages/dashboard';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
