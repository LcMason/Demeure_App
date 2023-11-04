import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Checkout from './components/items/Checkout';
import Errors from './components/errors/Errors';
import Navbar from './components/navigation/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import About from './components/About';
import { loadItems, updateCartCount } from './components/actions/items';
import ItemList from './components/items/ItemList';
// import { loadReviews } from './components/actions/reviews';
import { loadCurrentUser } from './components/actions/users';
import ItemDetails from './components/items/ItemDetails';
import Payment from './components/items/Payment';
import PaymentComplete from './components/items/PaymentComplete'

function App() {
  const { currentUser, cartCount } = useSelector((store) => store.usersReducer)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems())
    dispatch(loadCurrentUser(setLoading))
    // dispatch(loadReviews())

  }, [dispatch])
  
  useEffect(() => {
    // Calculate the total quantity of items in the cart
    const totalQuantity = currentUser?.userItems?.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(updateCartCount(totalQuantity))
  }, [dispatch, currentUser, cartCount]);
  

  return (
    <div className="container-flex bg-success min-vh-100">
       <Navbar cartCount={cartCount} />
          <Errors />
     
             <Routes>
               <Route path="/" element={<Home />} /> 
               <Route path="/login" element={<Login loading={ loading } />} /> 
               <Route path="/signup" element={<Signup loading={ loading } /> } />  
               <Route path="/products" element={<ItemList /*loading={ loading }*/ /> } />  
               <Route path="/about" element={<About /> } /> 
               <Route path="/checkout" element={<Checkout cartCount={cartCount} /> } /> 
               <Route path="/pay" element={<Payment /> } /> 
               <Route path="/complete" element={<PaymentComplete /> } /> 
               <Route path="/products/:id" element={<ItemDetails cartCount={cartCount}  /> } /> 
               <Route path="*" element={ <h2>404 Page Not Found</h2>} /> 
               {/* TODO : create a 404 componenet  */}


             </Routes> 

     </div> 
    );
  } 

  

export default App;
