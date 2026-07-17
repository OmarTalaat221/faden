export default function Dots({ count = 3, active = 0 }) {
  return (
    <div
      className="mt-7 flex items-center justify-center gap-2"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`size-2.5 rounded-full transition ${
            i === active ? "bg-brand-primary" : "bg-[#d8d8d8]"
          }`}
        />
      ))}
    </div>
  );
}
