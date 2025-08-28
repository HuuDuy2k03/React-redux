import video from '../../assets/video-homepage.mp4'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className='content-title'>There's a better way to ask</div>
        <div className='content-desc'>Collect all the data you need to understand customers with forms designed to be refreshingly different.</div>
        <div>
          {!isAuthenticated ? (
            <button className='btn-get-started' onClick={() => navigate('/login')}>Get's Started. It's Free</button>
          ):(
            <button className='btn-get-started' onClick={() => navigate('/users')}>Go to Quiz now</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;