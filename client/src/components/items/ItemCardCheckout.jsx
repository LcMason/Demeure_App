// import React, {useState} from 'react'
import dingyShoes from "../images/dingyShoes.jpg"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, adjustQty } from "../actions/items" 
// import { Checkout } from 'react'

// TODO: adjustQty may need to be used in this componenet to adjust once i hit the 'remove' button.
// TODO: may need to write conditonal statement to decrement -1 on each click. Once item hits 0, remove div.
const ItemCardCheckout = ({item, onIncrement, onDecrement}) => {
  const { items, currentUser, cartCount } = useSelector(store => store.usersReducer)
  const dispatch = useDispatch();
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