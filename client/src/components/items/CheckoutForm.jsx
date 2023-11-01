import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    // TODO : add functionality to the checkout form componenet
    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};

export default CheckoutForm;