const AboutPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-4 mb-6">
        About the Yolo Food Bank
      </h1>
      <div className="sm:grid grid-cols-2 gap-5 items-center mx-6">
        <img
          src={process.env.PUBLIC_URL + '/img/yolo.jpg'}
          alt="The Yolo Food Bank building"
          className="max-w-2/3"
        />
        <div className="flex flex-col items-center text-center">
          <section className="my-1">
            <h2 className="font-semibold">Address</h2>
            <p>
              <a
                href="https://goo.gl/maps/ky4S87W7UL3ZW25z5"
                className="text-blue-600 underline hover:italic"
              >
                233 Harter Ave, Woodland, CA 95776
              </a>
            </p>
          </section>
          <section className="my-1">
            <h2 className="font-semibold">Hours</h2>
            <p>M-F: 8:30 AM – 5 PM</p>
            <p>Closed on Saturdays & Sundays</p>
          </section>
          <section className="my-1">
            <h2 className="font-semibold">Contact us</h2>
            <ul>
              <li>(530) 668-0690</li>
              <li>
                <a
                  href="https://yolofoodbank.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline hover:italic"
                >
                  Visit our website
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="m-6">
        <p>
          Per the official website, Yolo Food Bank coordinates the recovery,
          storage, and distribution of more than 8 million pounds of food
          annually. We collaborate with a network of grocers and retailers,
          farmers and distributors, the private sector and governmental
          agencies, and 84 partner agencies countywide.
        </p>
        <p>
          Our other programs include Eat Well Yolo, Eat Home Yolo, and Kids
          Farmers Market. Check out more resources and volunteer/advocate on the{' '}
          <a
            href="https://yolofoodbank.org/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:italic"
          >
            main website
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
