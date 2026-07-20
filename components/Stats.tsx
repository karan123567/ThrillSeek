const stats = [
  { value: "2.5K+", label: "Adventures Listed" },
  { value: "50K+", label: "Happy Adventurers" },
  { value: "4.9", label: "Average Rating" },
  { value: "120+", label: "Countries Covered" },
];

export default function Stats() {
  return (
    <section className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 reveal-on-scroll">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-semibold tracking-tighter gradient-text mb-2">
                {s.value}
              </p>
              <p className="text-sm text-th-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}