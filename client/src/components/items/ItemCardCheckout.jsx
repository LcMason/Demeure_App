import React, { useState, useEffect } from 'react'
import dingyShoes from "../images/dingyShoes.jpg"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, adjustQty, addToCart } from "../actions/items" 
// import { Checkout } from 'react'

// TODO: adjustQty may need to be used in this componenet to adjust once i hit the 'remove' button.
// TODO: may need to write conditonal statement to decrement -1 on each click. Once item hits 0, remove div.
const ItemCardCheckout = ({ item }) => {
  const { currentUser, cartCount } = useSelector(store => store.usersReducer)
  const dispatch = useDispatch();
  // const currentItem = items?.find((item) => item.id === parseInt(id))
  
 
  // const itemQ = currentItem && currentUser?.userItems?.find(item => item.id === currentItem.id)

  const [qty, setQty] = useState(item.quantity || 0);
  const [cartTotal, setCartTotal] = useState(cartCount)
 

   const handleAdjustQuantity = (op) => {
     if (op === "+") {
       // If the quantity becomes less than 1, remove the item from the cart
       dispatch(adjustQty(item.id, item.quantity + 1 ));      
      } else if (item.quantity === 1){
        dispatch(removeFromCart(item.id));
      } else {
        dispatch(adjustQty(item.id, item.quantity - 1 )); 
    }
}
// TODO 1: this function should remove the entire item and it's div from the cart. Not decrement item by 1
  const removeItemFromCart = (id) => {
  if (id !== null && id !== undefined) {
    dispatch(removeFromCart(id));
  } else {
    console.error("Invalid id:", id);
    // Optionally, you could handle the case where id is null or undefined here
  }
};
  return (
    <div key={item.id} className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
              <img
                src={dingyShoes}
                className="img-fluid rounded-3" alt="dingy shoes" style={{width: '65px'}}/>
            </div>
            <div className="ms-3">
              <p className="small mb-0">{item.name}</p>
              <p className="small mb-0">{item.description}</p>
                  </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div style={{width: '50px'}}>
              <h5 className="fw-normal mb-0">{item.quantity}</h5>
            </div>
            <div style={{width: '80px'}}>
              <h5 className="mb-0">${item.price * item.quantity}</h5>
            </div>
            {/* <div>
            <button onClick={() => {removeItemFromCart(item.id)}}>Remove</button>
            </div> */}
            {/* <div>
              <input min="0" type="number" value={qty} className="form-control" onChange={(e) => setQty(parseInt(e.target.value))} />
            </div> */}
            <div>
            <button
            className="btn btn-sm btn-primary ms-2"
              onClick={() => handleAdjustQuantity("+")}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={() => handleAdjustQuantity("-")}
            >
              -
            </button>
             <div>
            <button onClick={() => {removeItemFromCart(item.id)}}>Remove</button>
            </div>
          </div>
            <Link to="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></Link>
          </div>
        </div>
      </div>
    </div>                
  )
}

export default ItemCardCheckout