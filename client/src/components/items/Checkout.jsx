import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import ItemCardCheckout from "./ItemCardCheckout"
import { useSelector, useDispatch } from "react-redux"
import { deleteEntireCart } from "../actions/items"

const Checkout = () => {
  // TODO : should i add item to line 8 to reflect the items array
  const {  currentUser, cartCount, removeFromCart } = useSelector(store => store.usersReducer)
  const [totalPrice, setTotalPrice] = useState(0)  
  const dispatch = useDispatch()

  
  
  useEffect(() => {
    let price = 0;
    if (currentUser && currentUser.userItems) {
      currentUser.userItems.forEach((item) => {
        const quantity = item.quantity;
        price += quantity * item.price;
      });
    }
    setTotalPrice(price);
  }, [currentUser]);
  
  
  
  const handleDeleteEntireCart = () => {
   const item = currentUser?.userItems
    console.log(item.id)
    dispatch(deleteEntireCart(item.id));
  }

return (
  <section className="h-100 h-custom" style={{'backgroundColor': '#eee'}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-lg-7">
                  <h5 className="mb-3"><Link to="/items" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                  <hr/>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p className="mb-1">Shopping cart</p>
                      <p className="mb-0">You have {cartCount} items in your cart</p>
                    </div> 
                    <button onClick={() => handleDeleteEntireCart()} className="btn btn-primary shadow-0 me-1"><i className="bi-trash"></i>
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button> 
                  </div>
                    {/* {currentUser?.userItems.length >= 1 ? (
                      currentUser?.userItems.map((item) => (
                        <ItemCardCheckout key={item.id} item={item} />
                        ))
                      ) : null} */}
                    {currentUser?.userItems && currentUser?.userItems.map((item) => (
            item.quantity > 0 && <ItemCardCheckout key={item.id} item={item} /> 
        ))
    }
                       
                    
                    
                </div>
                <div className="col-lg-5">
                  <div className="card bg-primary text-white rounded-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Card Details</h5>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                          className="img-fluid rounded-3" style={{width: '45px'}} alt="Avatar"/>
                      </div>
                      <p className="small mb-2">Card type</p>
                      <Link to="#!" type="submit" className="text-white"><i
                          className="fab fa-cc-mastercard fa-2x me-2"></i></Link>
                      <Link to="#!" type="submit" className="text-white"><i
                          className="fab fa-cc-visa fa-2x me-2"></i></Link>
                      <Link to="#!" type="submit" className="text-white"><i
                          className="fab fa-cc-amex fa-2x me-2"></i></Link>
                      <Link to="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></Link>
                      <form className="mt-4">
                        <div className="form-outline form-white mb-4">
                          <input type="text" id="typeName" className="form-control form-control-lg" size="17"
                            placeholder="Cardholder's Name" />
                          <label className="form-label" htmlFor="typeName">Cardholder's Name</label>
                        </div>
                        <div className="form-outline form-white mb-4">
                          <input type="text" id="typeText" className="form-control form-control-lg" size="17"
                            placeholder="1234 5678 9012 3457" minLength="19" maxLength="19" />
                          <label className="form-label" htmlFor="typeText">Card Number</label>
                        </div>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <div className="form-outline form-white">
                              <input type="text" id="typeExp" className="form-control form-control-lg"
                                placeholder="MM/YYYY" size="7" minLength="7" maxLength="7" />
                              <label className="form-label" htmlFor="typeExp">Expiration</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-outline form-white">
                              <input type="password" id="typePassword" className="form-control form-control-lg"
                                placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3" />
                              <label className="form-label" htmlFor="typePassword">Cvv</label>
                            </div>
                          </div>
                        </div>
                      </form>
                      <hr className="my-4"/>
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">${totalPrice}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Free Shipping</p>
                        <p className="mb-2">$00.00</p>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        {/* stretch goal to calculate tax */}
                        {/* <p className="mb-2">Total(Incl. taxes)</p> */}
                        <p className="mb-2">Total Price</p>
                        <p className="mb-2">${totalPrice}</p>
                      </div>
                      <button type="button" className="btn btn-info btn-block btn-lg">
                        <div className="d-flex justify-content-between">                      
                          <span>${totalPrice}</span>
                          <span>Checkout {" "}<i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
export default Checkout