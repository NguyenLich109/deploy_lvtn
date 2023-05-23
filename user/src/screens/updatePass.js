import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswordAction } from '../Redux/Actions/userActions';
import { UPDATE_PASS_EMAIL_RESET_RESET } from '../Redux/Constants/UserContants';
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

function UpdatePass({ match }) {
    const { email } = match.params;
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [cfpassword, setCfpassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [checkCfpassword, setCheckCfpassword] = useState('');

    const updatePassReducer = useSelector((state) => state.updatePassReducer);
    const { loading, success, status, error } = updatePassReducer;

    useEffect(() => {
        if (success) {
            toast.success(status, Toastobjects);
            dispatch({ type: UPDATE_PASS_EMAIL_RESET_RESET });
        }
        if (error) {
            toast.error(error, Toastobjects);
            dispatch({ type: UPDATE_PASS_EMAIL_RESET_RESET });
        }
    }, [success, status, error, dispatch]);

    const handleEmail = (data) => {
        const { password, cfpassword } = data;
        let boolean = true;

        if (!password) {
            setCheckPassword('Trường này còn thiếu!');
        } else {
            if (password.length < 6) {
                setCheckPassword('Mật khẩu tối thiểu 6 kí tự');
            } else {
                setCheckPassword('');
            }
        }

        if (!cfpassword) {
            setCheckCfpassword('Trường này còn thiếu!');
        } else {
            if (cfpassword !== password) {
                setCheckCfpassword('Mật khẩu không khớp');
            } else {
                boolean = false;
            }
        }
        return boolean;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!handleEmail({ password, cfpassword })) {
            dispatch(resetPasswordAction({ email, password }));
            setCheckPassword('');
            setCheckCfpassword('');
            setCfpassword('');
            setPassword('');
        }
    };

    return (
        <>
            <Toast />
            <div className="row verified__email">
                {loading && <Loading />}
                <form className="Login" onSubmit={handleSubmit} style={{ padding: '0', boxShadow: 'none' }}>
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
                    <div className="verified__email-content mt-3 ">
                        <h5 className="form-title text-center">Đặt lại mật khẩu</h5>
                        {email && <h6 className="toEmail text-center">{email}</h6>}
                    </div>

                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Nhập mật khẩu mới"
                        className={checkPassword ? 'border-danger' : ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {checkPassword && (
                        <span className="text-danger d-flex align-items-center mt-1" style={{ fontSize: '0.9rem' }}>
                            <i className="fas fa-exclamation-circle" style={{ paddingRight: '5px' }}></i>
                            {checkPassword}
                        </span>
                    )}
                    <input
                        type="password"
                        name="confirmedPassword"
                        placeholder="Nhập lại mật khẩu"
                        className={checkCfpassword ? 'border-danger' : ''}
                        value={cfpassword}
                        onChange={(e) => setCfpassword(e.target.value)}
                    />
                    {checkCfpassword && (
                        <span className="text-danger d-flex align-items-center mt-1" style={{ fontSize: '0.9rem' }}>
                            <i className="fas fa-exclamation-circle" style={{ paddingRight: '5px' }}></i>{' '}
                            {checkCfpassword}
                        </span>
                    )}
                    <button type="submit" className="btn btn-success">
                        Đặt lại
                    </button>
                </form>
            </div>
        </>
    );
}

export default UpdatePass;
