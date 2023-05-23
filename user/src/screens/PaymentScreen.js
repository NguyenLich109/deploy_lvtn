import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../Redux/Actions/cartActions';
import Header from './../components/Header';

const PaymentScreen = ({ history }) => {
    // window.scrollTo(0, 0);

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod));
            history.push(`/placeorder/${paymentMethod}`);
        }
    };
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login2 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <h4>Phương thức thanh toán</h4>
                    <div className="payment-container">
                        <div className="radio-container">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment"
                                value="payment-with-cash"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                                id="one"
                            />
                            <label htmlFor="one" className="form-check-label">
                                Thanh toán bằng tiền mặt
                            </label>
                        </div>
                        <div className="radio-container">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment"
                                value="payment-with-online"
                                id="two"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                            />
                            <label htmlFor="two" className="form-check-label">
                                Thanh toán điện tử
                            </label>
                        </div>
                    </div>

                    <button type="submit">Tiếp tục</button>
                </form>
            </div>
        </>
    );
};

export default PaymentScreen;
