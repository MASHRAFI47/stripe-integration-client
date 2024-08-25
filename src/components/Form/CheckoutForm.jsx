// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import '../Form/CheckoutForm.css';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import PropTypes from 'prop-types';

const CheckoutForm = ({ product }) => {
    const [clientSecret, setClientSecret] = useState();
    const [cardError, setCardError] = useState("");
    const [processing, setProcessing] = useState(false);
    const axiosCommon = useAxiosCommon();
    const stripe = useStripe();
    const elements = useElements();



    useEffect(() => {
        const getClientSecret = async price => {
            const { data } = await axiosCommon.post("/create-payment-intent", price);
            console.log('client secret from server', data);
            setClientSecret(data.clientSecret)
        }
        if (product?.price && product?.price > 1) {
            getClientSecret({ price: product?.price })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.price]);


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing}>
                    {`Pay ${'$' + product?.price}`}
                </button>
            </form>

            {cardError && <p>{cardError}</p>}
        </>
    );
};


CheckoutForm.propTypes = {
    product: PropTypes.object
}


export default CheckoutForm;