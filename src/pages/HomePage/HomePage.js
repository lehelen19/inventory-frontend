import { Link } from 'react-router-dom';
import useImageLoaded from '../../components/useImageLoaded';

const HomePage = () => {
  const [ref, loaded, onLoad] = useImageLoaded();

  return (
    <main className="hero bg-base-200 px-8 pb-4">
      <div className="hero-content flex-col">
        <h1 className="text-4xl font-bold py-6">
          Welcome to the Yolo Food Bank Inventory
        </h1>
        {/* Credit for loading: https://stackoverflow.com/a/68819767 */}
        <p style={{ display: loaded ? 'none' : 'block' }}>
          <span className="loading loading-spinner text-primary"></span>
        </p>
        <figure style={{ display: loaded ? 'block' : 'none' }}>
          <img
            src={process.env.PUBLIC_URL + '/img/hero.jpg'}
            ref={ref}
            onLoad={onLoad}
            className="max-w-xs rounded-lg shadow-2xl"
            alt="A cartoon illustration of a box with the words 'Food Bank' and a variety of groceries flying out."
          />
          <figcaption className="text-xs mt-1 italic">
            Image by{' '}
            <a
              href="https://www.freepik.com/free-vector/hand-drawn-flat-design-food-bank-illustration_24721221.htm#query=cartoon%20food%20bank&position=5&from_view=search&track=ais"
              target="_blank"
              rel="noreferrer"
            >
              Freepik
            </a>
          </figcaption>
        </figure>

        <Link to="/categories" className="btn btn-primary my-4">
          See what's available
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
