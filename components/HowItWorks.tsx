import { Search, CalendarCheck, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    desc: "Browse thousands of curated adventures. Filter by location, difficulty, price, and activity type.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    desc: "Choose your date, group size, and any add-ons. Secure payment with instant confirmation.",
  },
  {
    icon: Rocket,
    title: "Experience",
    desc: "Show up, gear up, and create memories. Share your experience with the community.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter">
            Three Steps to <span className="gradient-text">Adventure</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="text-center reveal-on-scroll"
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              <div className="relative w-20 h-20 rounded-2xl bg-th-input border border-th-border flex items-center justify-center mx-auto mb-6 group hover:border-brand-500/30 transition-colors duration-500">
                <s.icon className="w-8 h-8 text-th-text-sub group-hover:text-brand-400 transition-colors duration-500" />
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-brand-500 text-xs font-bold flex items-center justify-center text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-medium mb-3 text-th-text">{s.title}</h3>
              <p className="text-sm text-th-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}