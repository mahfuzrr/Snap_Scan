/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import BugPage from './pages/BugPage';
import TextPage from './pages/TextPage';
import Works from './pages/Works';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TextPage />} />
                <Route path="/how-works" element={<Works />} />
                <Route path="/report" element={<BugPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
