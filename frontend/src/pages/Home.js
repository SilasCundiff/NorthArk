import { useAuthorizedContext } from '../context/AuthContext';
import Jumbotron from '../components/home_components/Jumbotron';
import About from '../components/home_components/About';

const Home = () => {
  const { user } = useAuthorizedContext();
  return (
    <>
      <Jumbotron />
      <About />
    </>
  );
};

export default Home;
