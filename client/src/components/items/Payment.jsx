import React, {useEffect, useState} from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm"
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
// Nicholas : what is the useLocation hook. How is it used on ln 21

//create a route for /payment. 
//payment.jsx needs total price

const stripePromise = loadStripe('pk_test_51IlDPTH1TNv3FkZtTPZLrDSIb5mOalPb2XtVEbHir9aSISNNMCGYIaN39EffZ82UTiXDgdAoPSknmuxT3cYQmNYX00mcTFWniS');


function Payment() {
    const [secret, setSecret] = useState("");
    const location = useLocation()
    

    const options = {
        // passing the client secret obtained from the server
        clientSecret: location.state.secret,
    };

    useEffect(() => {
        return () => {
            fetch('/client_secret', {
                method: "POST",
                "Accept": "application/json",
                "Content-Type": "application/json",
                body: JSON.stringify({
                    amount: location.state.totalPrice
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    setSecret(data.client_secret)
                })

        }
        //Nicholas : do we need the state value for totalPrice? We did not update totalPrice in checkout. We updated 'price'
    }, [location.state.totalPrice])
  return (
      <div>
        {/*  style Div and write a better title to process payments  */}
        <h1>Demeure</h1>
        {/* Nicholas : explain options  */}
        {options.clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        )
        }
      </div>
  )
}

export default Payment