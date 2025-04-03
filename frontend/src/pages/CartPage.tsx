import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import './CartPage.css'; // Import the custom CSS

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item: CartItem) => (
            <div key={item.bookId} className="col-auto mb-4">
              <div className="card h-100 cart-item-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: ${item.price ? item.price.toFixed(2) : '0.00'}</p>
                  <button className="btn btn-danger mt-auto" onClick={() => removeFromCart(item.bookId)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <h3>Total: ${getTotalPrice()}</h3>
          <button className="btn btn-primary">Checkout</button>
          <button className="btn btn-secondary ml-2" onClick={() => navigate('/books')}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;