import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { title, bookId, price} = useParams();
  const { addToCart } = useCart();
  // const [price, setPrice] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>

      <div>
        <label>{title}: ${price}</label>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
