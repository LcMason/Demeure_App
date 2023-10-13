import React, { useState, useEffect } from 'react'
import dingyShoes from "../images/dingyShoes.jpg"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, adjustQty } from "../actions/items" 
// import { Checkout } from 'react'

// TODO: adjustQty may need to be used in this componenet to adjust once i hit the 'remove' button.
// TODO: may need to write conditonal statement to decrement -1 on each click. Once item hits 0, remove div.
const ItemCardCheckout = ({item, onIncrement, onDecrement}) => {
  const { items, currentUser, cartCount } = useSelector(store => store.usersReducer)
  const dispatch = useDispatch();
  const { id } = useParams()
  const currentItem = items?.find((item) => item.id === parseInt(id))
  console.log("current Item", currentItem)
  // Nicholas : why do I need to check the value of currentItem to see if it exists if we dont have to check this for ItemDetails?
  const itemQ = currentItem && currentUser?.userItems?.find((item) => item.id === currentItem.id)
  const [qty, setQty] = useState(itemQ?.quantity || 0);
  const [cartTotal, setCartTotal] = useState(cartCount)
  // const [visible, setVisible] = useState(true);

// stretch goals - increment and decrement cart totals from /checkout route.
  // const handleIncrement = () => {
  //   onIncrement(id);
  // };

  // const handleDecrement = () => {
  //   onDecrement(id);
  // };

  // remove DOM Element when value is 0
  // const removeItemFromCart = (id) => {
  //   dispatch(removeFromCart(id))
  // }

  useEffect(() => {
        const itemQ = currentItem && currentUser?.userItems?.find((item) => item.id === currentItem.id);
        setQty(itemQ?.quantity || 0);
        const updatedCartTotal = currentUser?.userItems?.reduce((total, item) => {
        return total + item.quantity * item.price;
        }, 0);
        setCartTotal(updatedCartTotal || 0);
    }, [currentUser, currentItem, cartCount]);


   const handleAdjustQuantity = (id, quantityAdjustment) => {
    const updatedQty = parseInt(qty) + quantityAdjustment;

    if (updatedQty < 1) {
        // If the quantity becomes less than 1, remove the item from the cart
        dispatch(removeFromCart(id));
    } else {
        const updatedItem = { ...currentItem, quantity: updatedQty };
        if (itemQ) {
            dispatch(adjustQty(id, updatedQty));
        // } else {
        //     dispatch(addToCart(updatedItem));
        }      
    }

    const updatedCartTotal = cartTotal + quantityAdjustment * currentItem.price;
    setCartTotal(updatedCartTotal);
}


  const removeItemFromCart = (id) => {
  if (id !== null && id !== undefined) {
    dispatch(removeFromCart(id));
  } else {
    console.error("Invalid id:", id);
    // Optionally, you could handle the case where id is null or undefined here
  }
};

//  const removeItemFromCart = (id) => {
//   if (action.type === "REMOVE_FROM_CART") {
//     return { currentUser.

//     }
//     dispatch(removeFromCart(id));
//   } else {
//     console.error("Invalid id:", id);
//     // Optionally, you could handle the case where id is null or undefined here
//   }
// };
    
// TODO : Build out a REMOVE_FROM_CART action and reducer


  // const removeElement = (id) => {
  //   // let newQuantity = 
  //   dispatch(removeFromCart(id));
  //   dispatch(adjustQty({id: item.id})) 
  //   // dispatch(adjustQty({id: item.id, quantity: newQuantity})) 
  // };


  return (
    // <div className="card mb-3">
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
                          {/* <h5>{item.title}</h5> */}
                          <p className="small mb-0">{item.name}</p>
                          <p className="small mb-0">{item.description}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: '50px'}}>
                          {/* <h5 className="fw-normal mb-0">{item.quantity}</h5> */}
                          <h5 className="fw-normal mb-0">{item.quantity}</h5>
                        </div>
                        <div style={{width: '80px'}}>
                          <h5 className="mb-0">${item.price}</h5>
                        </div>
                        <div>
                          {/* <Checkout visible={visible} /> */}
                        <button onClick={() => {removeItemFromCart(item.id)}}>Remove</button>
                        </div>
                        <div>
                          {/* <input min="0" type="number" defaultValue={qty} className="form-control" onChange={(e) => setQty(parseInt(e.target.value))} /> */}
                          <input min="0" type="number" defaultValue={qty} className="form-control" onChange={handleAdjustQuantity} />
                        </div>
                        {/* <button onClick={() => handleClick(item.id)} className="btn btn-primary shadow-0 me-1">Details</button> */}

                        {/* <div> stretch goal
                        <button className="btn btn-sm btn-primary ms-2" onClick={handleDecrement}>-</button>
                        <button className="btn btn-sm btn-primary ms-2"  onClick={handleIncrement}>+</button>
                        </div> */}
                        <Link to="#!" style={{color: '#cecece'}}><i className="fas fa-trash-alt"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>                
  )
}

export default ItemCardCheckout