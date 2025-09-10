import video from '../../assets/video-homepage.mp4'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation} from 'react-i18next';

const HomePage = (props) => {
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className='content-title'>{t("HomePage.title")}</div>
        <div className='content-desc'>{t("HomePage.description")}</div>
        <div>
          {!isAuthenticated ? (
            <button className='btn-get-started' onClick={() => navigate('/login')}>{t("HomePage.getStarted")}</button>
          ):(
            <button className='btn-get-started' onClick={() => navigate('/users')}>{t("HomePage.goToQuiz")}</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;