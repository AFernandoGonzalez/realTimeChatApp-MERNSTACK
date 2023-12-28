import React from 'react'
import './Home.css'
export const Home = () => {


  return (
    <div className="">
      <div className="authentication-page-content">
        <div className="d-flex flex-column h-100 px-4 pt-4 custom-bg">
          <div className="justify-content-center my-auto row">
            <div className="col-xxl-8 col-sm-10 col-lg-8 col-xl-7">
              <div className="py-md-5 py-4 text-center">
                <div className="mt-4 pt-2">
                  <h2>Welcome to ChatAppeando!</h2>
                  <p className="text-muted font-size-15">
                    Start chatting with your friends and colleagues. Connect and communicate easily.
                  </p>
                  <div className="mt-4">
                    <a className="btn btn-primary w-100 waves-effect waves-light" href="/auth-login">
                      Get Started
                    </a>
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

