import { Route, Routes } from 'react-router-dom';
import './App.css';
import User from './pages/user/User';
import 'bootstrap/dist/css/bootstrap.css';
import Images from './pages/images/Images';
import Upload from './pages/upload/Upload';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/images/:id" element={<Images />} />
        <Route path="/upload/:id" element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;
