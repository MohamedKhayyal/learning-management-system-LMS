import Star from "./Star";

export default function Rating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("full");
    else if (i - rating < 1) stars.push("half");
    else stars.push("empty");
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((t, idx) => (
        <Star key={idx} type={t} />
      ))}
    </div>
  );
}
