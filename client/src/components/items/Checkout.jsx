import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import ItemCardCheckout from "./ItemCardCheckout"
// import CheckoutForm from "./CheckoutForm"
import { useSelector, useDispatch } from "react-redux"
import { deleteEntireCart } from "../actions/items"
import BreadCrumbs from "../BreadCrumbs"
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLocation } from 'react-router-dom';


// const stripePromise = loadStripe('pk_test_51IlDPTH1TNv3FkZtTPZLrDSIb5mOalPb2XtVEbHir9aSISNNMCGYIaN39EffZ82UTiXDgdAoPSknmuxT3cYQmNYX00mcTFWniS');

const Checkout = () => {
  // TODO : should i add item to line 8 to reflect the items array
  const { currentUser, cartCount } = useSelector(store => store.usersReducer)
  const [totalPrice, setTotalPrice] = useState(0)
  const [secret, setSecret] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const location = useLocation()
  

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: secret,
  // };

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: location.state.secret,
  // };

// Nicholas : Where does .quantity come from? We do not have a qunatity attribute on the backend. How do we access it in the frontend?
  useEffect(() => {
    let price = 0;
    if (currentUser && currentUser.userItems) {
      currentUser.userItems.forEach((item) => {
        const quantity = item.quantity;
        price += quantity * item.price;
      });
    }
    // Why is setTotalPrice updating price and not totalPrice?
    setTotalPrice(price);
    // REVIEW : price is a variable updated by 37-41. 
  }, [currentUser]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/client_secret', {
      signal: signal,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 2000
      })
    })
      .then(resp => resp.json())
      .then(data => {
        setSecret(data.client_secret);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          console.log(err) 
          // tell the user what happens.. protect backend data.
        }
      });
    return () => {
      controller.abort();
    };
  }, [totalPrice]);
  // REVIEW : totalPrice is state varaible with the updated price.

  
const handlePay = () => {
  navigate("/pay", {state: {totalPrice, secret}})
  // Nicholas : The state value of secret is an empty string so what is the value of the 2nd argument on ln 68?
  // Nicholas : How can I pass order summary to payment? See Aime payment page
}


  const handleDeleteEntireCart = () => {
    const item = currentUser?.userItems
    console.log(item.id)
    dispatch(deleteEntireCart(item.id));
  }

  return (
    <>
    <BreadCrumbs />
    <section className="h-100 h-custom" style={{ 'backgroundColor': '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col">
                    <h5 className="mb-3"><Link to="/products" className="text-body"><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cartCount} items in your cart</p>
                      </div>
                      <button onClick={() => handleDeleteEntireCart()} className="btn btn-primary shadow-0 me-1"><i className="bi-trash"></i>
                        <i className="fas fa-shopping-cart ms-1"></i>
                      </button>
                    </div>
                    {currentUser?.userItems && currentUser?.userItems.map((item) => (
                      item.quantity > 0 && <ItemCardCheckout key={item.id} item={item} />
                    ))
                    }

                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">${totalPrice}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Free Shipping</p>
                    <p className="mb-2">$00.00</p>
                  </div>
                  <div className="d-flex justify-content-between mb-4">

                    <p className="mb-2">Total Price</p>
                    <p className="mb-2">${totalPrice}</p>
                  </div>
                  <button type="button" className="btn btn-info btn-block btn-lg">
                    <div className="d-flex justify-content-between">
                      <span>${totalPrice}</span>
                      <span onClick={handlePay}>Checkout {" "}<i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
export default Checkout