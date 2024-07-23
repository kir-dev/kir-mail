import { Route, Routes } from 'react-router-dom';

import { Header } from './components/navbar';
import { DashboardPage } from './pages/dashboard';
import { TokensList } from './pages/tokens/tokens-list';
import { NewToken } from './pages/tokens/tokens-new';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='token'>
          <Route path='new' element={<NewToken />} />
          <Route index element={<TokensList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
