import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendEmailAction } from '../../Redux/Actions/userActions';
import { SEND_EMAIL_RESET_RESET } from '../../Redux/Constants/UserContants';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
import Loading from '../LoadingError/Loading';
import '../../screens/style/verifyEmail.css';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
};

export default function Reset() {
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState('');

    const dispatch = useDispatch();

    const sendEmailReducer = useSelector((state) => state.sendEmailReducer);
    const { loading, success, status, error } = sendEmailReducer;

    useEffect(() => {
        if (success) {
            toast.success(status, Toastobjects);
            dispatch({ type: SEND_EMAIL_RESET_RESET });
        }
        if (error) {
            toast.error(error, Toastobjects);
            dispatch({ type: SEND_EMAIL_RESET_RESET });
        }
    }, [success, status, error, dispatch]);

    const handleEmail = (data) => {
        let boolean = true;
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!data) {
            setCheckEmail('Trường này còn thiếu!');
        } else {
            if (!regex.test(data)) {
                setCheckEmail('Bạn cần nhập đúng email');
            } else {
                boolean = false;
            }
        }
        return boolean;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!handleEmail(email)) {
            setCheckEmail('');
            dispatch(sendEmailAction(email));
        }
    };
    return (
        <div className="row verified__email">
            <Toast />
            {loading && <Loading />}
            <form className="Login" style={{ padding: '0', boxShadow: 'none' }} onSubmit={handleSubmit}>
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
                <div className="verified__email-content mt-3">
                    <h4 className="form-title text-center">Khôi phục tài khoản</h4>
                    <h5 className=" text-center pt-2">Khôi phục Tài khoản BaloStore</h5>
                </div>
                <input
                    type="text"
                    className={checkEmail ? 'border-danger' : ''}
                    placeholder="Nhập email balostore"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {checkEmail && (
                    <span className="text-danger d-flex align-items-center mt-1" style={{ fontSize: '0.9rem' }}>
                        <i className="fas fa-exclamation-circle" style={{ paddingRight: '5px' }}></i> {checkEmail}
                    </span>
                )}
                <button type="submit" className="btn btn-success">
                    Tiếp theo
                </button>
            </form>
        </div>
    );
}
