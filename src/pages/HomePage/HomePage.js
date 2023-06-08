const HomePage = () => {
  return (
    <>
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <h1 className="text-4xl font-bold py-6">
              Welcome to the Yolo County Food Bank
            </h1>
            <figure>
              <img
                src={process.env.PUBLIC_URL + '/img/hero.jpg'}
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

            <button className="btn btn-primary my-4">
              See what's available
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
