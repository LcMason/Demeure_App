import React, {useEffect, useState} from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm"
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
// import BreadCrumbs from '../BreadCrumbs';
// Nicholas : what is the useLocation hook. How is it used on ln 21


const stripePromise = loadStripe('pk_test_51IlDPTH1TNv3FkZtTPZLrDSIb5mOalPb2XtVEbHir9aSISNNMCGYIaN39EffZ82UTiXDgdAoPSknmuxT3cYQmNYX00mcTFWniS');


function Payment() {
    const [secret, setSecret] = useState("");
    const location = useLocation()
    

    const options = {
        // passing the client secret obtained from the server
        clientSecret: location.state.secret,
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('/client_secret', {
            signal: signal,
            method: "POST",
            "Accept": "application/json",
            "Content-Type": "application/json",
            body: JSON.stringify({
                amount: location.state.totalPrice
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
                    // TODO : when the backend sends us an error message, we handle it here to show the user.
                }
            });

        return () => {
            controller.abort();
        };
    }, [location.state.totalPrice]);



  return (
      <div>
        {/*  TODO : style Div and write a better title to process payments  */}
        {/* <BreadCrumbs /> */}
        <h1>Demeure</h1>
        {/* Nicholas : Should I place my breadcrumbs under the navLinks? see example of Aime payment page */}
        {/* Nicholas : explain options  */}
        {options.clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        )}
      </div>
  )
}

export default Payment