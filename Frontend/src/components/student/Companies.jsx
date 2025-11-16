export default function Companies() {
  const logos = [
    "/src/assets/microsoft_logo.svg",
    "/src/assets/walmart_logo.svg",
    "/src/assets/accenture_logo.svg",
    "/src/assets/adobe_logo.svg",
    "/src/assets/paypal_logo.svg",
  ];

  return (
    <div className="mt-12 md:mt-16 overflow-hidden">
      <p className="text-xs text-slate-400 text-center">
        Trusted by learners from
      </p>

      <div className="slider mt-6">
        <div className="slide-track">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo}
              className="slide-img"
              alt="company logo"
              loading="lazy"
            />
          ))}
          {logos.map((logo, i) => (
            <img
              key={"dup-" + i}
              src={logo}
              className="slide-img"
              alt="company logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
