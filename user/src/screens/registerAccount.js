import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { verifyEmailAction } from '../Redux/Actions/userActions';
import { VERIFY_EMAIL_RESET } from '../Redux/Constants/UserContants';
import { toast } from 'react-toastify';
import Toast from '../components/LoadingError/Toast';
import Loading from './../components/LoadingError/Loading';
import './style/verifyEmail.css';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
};

function RegisterAccount({ match }) {
    const { email, token } = match.params;
    const dispatch = useDispatch();

    const verifyEmailReducer = useSelector((state) => state.verifyEmailReducer);
    const { loading, success, status, error } = verifyEmailReducer;

    useEffect(() => {
        if (success) {
            toast.success(status, Toastobjects);
            dispatch({ type: VERIFY_EMAIL_RESET });
        }
        if (error) {
            toast.error(error, Toastobjects);
            dispatch({ type: VERIFY_EMAIL_RESET });
        }
    }, [success, status, error, dispatch]);
    const submitHandler = () => {
        dispatch(verifyEmailAction(token));
    };
    return (
        <>
            <Toast />
            <div className="row verified__email">
                {loading && <Loading />}

                <div className="verified__email-logo">
                    <div className="">
                        <Link to="/login">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <div className="verified__email-logo-img">
                        <img className="verified__email-img" alt="logo" src="/images/logo2.png" />
                    </div>
                </div>

                <div className="verified__email-content">
                    <h4 className="form-title verified__email-content-title">Xác thực email</h4>
                    {token ? (
                        <>
                            <h5 className="toEmail">{email?.toString()}</h5>
                            <button className="btn btn-success mt-3" onClick={submitHandler}>
                                Xác thực
                            </button>
                        </>
                    ) : (
                        <div className="text-center mt-2">
                            Thư xác thực tài khoản đã được gửi đến email &nbsp;
                            <a href="https://mail.google.com/">
                                <b>{email?.toString()}</b>
                            </a>
                            , hãy kiểm tra hộp thư của bạn.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default RegisterAccount;
