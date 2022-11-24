import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookList from './pages/BookList/BookList';
import BookSingle from './pages/BookSingle/BookSingle';
import BookForm from './pages/BookForm/BookForm';
import Header from './components/Header/Header';


function App() {

  return (
        <>
      <Router>
          <Header />
          <Routes>
            <Route path='/' element={<BookList />} />
            <Route path='/book/:id' element={<BookSingle />} />
            <Route path='/form' element={<BookForm />} />
          </Routes>
      </Router>
      <ToastContainer style={{marginTop: "10vh"}}/>
    </>
  );
}

export default App;
