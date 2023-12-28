import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';



export const Logout = () => {

    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    return (

        <div className="">
            <div className="authentication-page-content">
                <div className="d-flex flex-column h-100 px-4 pt-4">
                    <div className="justify-content-center my-auto row">
                        <div className="col-xxl-4 col-sm-8 col-lg-6 col-xl-5">
                            <div className="py-md-5 py-4 text-center">
                                <div className="avatar-xl mx-auto">
                                    <div className="avatar-title bg-soft-primary text-primary h1 rounded-circle">
                                        <i className="bx bxs-user"></i>
                                    </div>
                                </div>
                                <div className="mt-4 pt-2">
                                    <h5>You are Logged Out</h5>
                                    <p className="text-muted font-size-15">
                                        Thank you for using <span className="fw-semibold text-dark">ChatAppeando</span>
                                    </p>
                                    <div className="mt-4">
                                        <Link to="/login" className="btn btn-primary w-100 waves-effect waves-light">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="text-center text-muted p-4">
                                <p className="mb-0">© 2023 ChatAppeando</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}   