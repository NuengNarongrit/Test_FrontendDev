import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, PersonForm } from './components';
import Head from './components/Head';
import './App.css';
const App: React.FC = () => {

  //ตัวแปลภาษา
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Head />
        <div className="container-buttom">
          <div className="button">
            <Link to="/" style={{ textDecoration: 'none' }}>{t('home')}</Link>
          </div>
          <div className="button">
            <Link to="/button" style={{ textDecoration: 'none' }}>{t('test_1')}</Link>
          </div>
          <div className="button">
            <Link to="/personForm" style={{ textDecoration: 'none' }}>{t('test_2')}</Link>
          </div>
        </div>
        <Routes>
          <Route path="/button" element={<Button />} />
          <Route path="/personForm" element={<PersonForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
