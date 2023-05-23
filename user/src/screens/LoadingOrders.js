import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../components/LoadingError/Loading';
import Header from './../components/Header';
import { getOrderDetails } from '../Redux/Actions/OrderActions';
import './style/loadingMomo.css';

export default function LoadingOrder({ match }) {
    const { id } = match.params;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order } = orderDetails;

    useEffect(() => {
        if (order?.isPaid || order?.cancel === 1) {
            history.push(`/order/${id}`);
        }
    }, [order]);

    useEffect(() => {
        const setinterval = setInterval(() => {
            if (message) {
                dispatch(getOrderDetails(id));
            }
        }, 1000);

        return () => {
            clearInterval(setinterval);
        };
    }, [dispatch, id, message]);

    return (
        <>
            <Header />
            <div className="paymomo">
                <div className="paymomo-loading">
                    <Loading />
                    {message == 'Successful.' || message == 'Thành công.' ? (
                        <span>Đang chờ xử lý thanh toán...</span>
                    ) : (
                        <span>Thanh toán thất bại...</span>
                    )}
                </div>
            </div>
        </>
    );
}
