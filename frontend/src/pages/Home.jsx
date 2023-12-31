
import { Link } from 'react-router-dom';
import './Home.css'
export const Home = () => {


  return (
    <div className="center-container">
      <div className="background-image"></div>
      <div className="center-content">
        <h1>Welcome to ChatAppeando!</h1>
        <p className="text m-4">Experience the joy of connecting with others in a seamless and delightful environment. Our platform is designed with your comfort in mind, ensuring a smooth and enjoyable chatting experience.</p>
       
        <Link to="/login" className="btn btn-primary ">
          Get Started
        </Link>
      </div>
      <div className="center-content mt-4">
        <p className="">© 2023 ChatAppeando</p>
      </div>
    </div>




  )
}

