import video from '../../assets/video-homepage.mp4'; 
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};
export default HomePage;