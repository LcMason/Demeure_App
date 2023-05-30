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
// import { loadItems } from './components/actions/items';
import { loadItems, updateCart } from './components/actions/items';
import ItemList from './components/items/ItemList';
import { loadReviews } from './components/actions/reviews';
import { loadCurrentUser } from './components/actions/users';
import ItemDetails from './components/items/ItemDetails';

function App() {
  // const { currentUser } = useSelector(store => store.usersReducer)
  // const [cartCount, setCartCount] = useState(0)
  const { currentUser, cartCount } = useSelector((store) => store.usersReducer)
  // const [cartCount, setCartCount] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems())
    dispatch(loadCurrentUser(setLoading))
    dispatch(loadReviews())

  }, [dispatch])
  // useEffect(() => {
  //   let count = 0;
  //   if (currentUser?.user_items) {
  //     currentUser.user_items.forEach((item) => {
  //       count += item.quantity;
  //     });
  //   }
  //   setCartCount(count);
  // }, [currentUser?.user_items, cartCount])
  // console.log(cartCount, "I am cartCount")

  // useEffect(() => {
  //   let count = 0;
  //   let updatedCartCount = {};

  //   if (currentUser?.user_items) {
  //     currentUser.user_items.forEach((item) => {
  //       if (currentUser.user_item.quantity && item.price) {
  //         count += item.quantity;
  //         updatedCartCount[item.id] = item;
  //       }
  //     });
  //   }

  //   setCartCount(updatedCartCount);
  //   setCartCount(count);
  // }, [currentUser?.user_items]);
  useEffect(() => {
    // Calculate the total quantity of items in the cart
    const totalQuantity = currentUser?.user_items?.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(updateCart(totalQuantity))
  }, [dispatch, currentUser, cartCount]);
  


  return (
    <div className="container-flex bg-success">
       <Navbar cartCount={cartCount} />
          <Errors />
     
             <Routes>
               <Route path="/" element={<Home />} /> 
               <Route path="/login" element={<Login />} /> 
               <Route path="/signup" element={<Signup loading={ loading } /> } />  
               <Route path="/items" element={<ItemList loading={ loading } /> } />  
               <Route path="/about" element={<About /> } /> 
               <Route path="/checkout" element={<Checkout cartCount={cartCount} /> } /> 
               {/* <Route path="/checkout" element={<Checkout cartCount={currentUser.user_items} /> } />  */}
               <Route path="/items/:id" element={<ItemDetails cartCount={cartCount} /> } /> 


             </Routes> 

     </div> 
    //  </Router>
   
    );
  } 

  

export default App;
