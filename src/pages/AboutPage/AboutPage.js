const AboutPage = () => {
  return (
    <main>
      <h1>About the Yolo Food Bank</h1>
      <div className="w-2/3">
        <img
          src={process.env.PUBLIC_URL + '/img/yolo.jpg'}
          alt="A picute of the Yolo Food Bank building"
        />
      </div>
      <section>
        <h2>Address</h2>
        <p>233 Harter Ave, Woodland, CA 95776</p>
      </section>
      <section>
        <h2>Hours</h2>
        <p>M-F: 8:30 AM – 5 PM</p>
        <p>Closed on Saturdays & Sundays</p>
      </section>
      <section>
        <h2>Contact us</h2>
        <ul>
          <li>(530) 668-0690</li>
          <li>
            <a
              href="https://yolofoodbank.org/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:italic"
            >
              Website
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default AboutPage;
