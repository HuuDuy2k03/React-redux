import video from '../../assets/video-homepage.mp4'; 
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className='content-title'>There's a better way to ask</div>
        <div className='content-desc'>Collect all the data you need to understand customers with forms designed to be refreshingly different.</div>
        <div>
          <button className='btn-get-started'>Get's Started. It's Free</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;