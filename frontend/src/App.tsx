import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import DonatePage from './pages/DonatePage';
import BooksPage from './pages/BooksPage';
import AdminBooksPage from './pages/AdminBooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/donate/:bookId/:title/:price"
              element={<DonatePage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
