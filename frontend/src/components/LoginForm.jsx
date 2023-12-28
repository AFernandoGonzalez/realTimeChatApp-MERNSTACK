import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import './LoginForm.css';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        if (currentUser) {
            // Redirect to the chat room or another appropriate page
            navigate('/chatroom');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/chatroom');
        } catch (err) {
            console.error('Login failed:', err);
            toast.error(`Login failed: ${err.message}`);
        }
    };

    return (

        <div className="">
            <div className="authentication-page-content">
                <div className="d-flex flex-column px-4 pt-4" style={{ height: "100%"}}>
                <div className="justify-content-center my-auto row">
                    <div className="col-xxl-4 col-sm-8 col-lg-6 col-xl-5">
                        <div className="py-md-5 py-4">
                            <div className="text-center mb-5">
                                <h3>Welcome to ChatAppeando!</h3>
                                <p className="text-muted">Sign in to continue.</p>
                            </div>
                            <form className="position-relative" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        placeholder="Enter Email"
                                        name="username"
                                        className="form-control"
                                        autoComplete="username"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    {/* <div className="float-end">
                                            <Link to="/auth-recoverpw" className="text-muted">
                                                Forgot password?
                                            </Link>
                                        </div> */}
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                        <input
                                            type="password"
                                            placeholder="Enter Password"
                                            name="password"
                                            id="password"
                                            className="form-control pe-5"
                                            autoComplete="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                            type="button"
                                            data-password="false"
                                        >
                                            <i className="ri-eye-fill align-middle"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-check form-check-info font-size-16">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="remember-check"
                                    />
                                    <label htmlFor="remember-check" className="form-check-label font-size-14 form-label">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-center mt-4">
                                    <button type="submit" className="w-100 btn btn-primary">
                                        Log In
                                    </button>
                                </div>
                                {/* <div className="mt-4 text-center">
                                    <div className="signin-other-title">
                                        <h5 className="font-size-14 mb-4 title">Sign in with</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <div>
                                                <button type="button" className="btn btn-light w-100" id="facebook">
                                                    <i className="mdi mdi-facebook text-indigo"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <button type="button" className="btn btn-light w-100" id="twitter">
                                                    <i className="mdi mdi-twitter text-info"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <button type="button" className="btn btn-light w-100" id="google">
                                                    <i className="mdi mdi-google text-danger"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </form>
                            {/* <div className="mt-5 text-center text-muted">
                                    <p>
                                        Don't have an account?{' '}
                                        <Link className="fw-medium text-decoration-underline" to="/auth-register">
                                            Register
                                        </Link>
                                    </p>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="text-center text-muted p-4">
                            <p className="mb-0">© 2023 ChatAppeando.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};