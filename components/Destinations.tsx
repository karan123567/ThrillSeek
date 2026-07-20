import { ArrowRight } from "lucide-react";

const dests = [
  { name: "Himalayas", country: "India", count: "320+", img: "himalayas-dest", span: "md:col-span-2 md:row-span-2" },
  { name: "Bali", country: "Indonesia", count: "150+", img: "bali-dest", span: "" },
  { name: "Swiss Alps", country: "Switzerland", count: "200+", img: "swiss-alps-dest", span: "" },
  { name: "Patagonia", country: "Argentina", count: "180+", img: "patagonia-dest", span: "" },
  { name: "Iceland", country: "Iceland", count: "140+", img: "iceland-dest", span: "" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/3 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="flex items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">Destinations</span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter">Popular <span className="gradient-text">Regions</span></h2>
          </div>
          <a href="#" className="hidden lg:inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-brand-400 transition-colors">View all <ArrowRight className="w-4 h-4" /></a>
        </div>
        <div className="grid md:grid-cols-4 auto-rows-[200px] gap-4">
          {dests.map((d, i) => (
            <div key={d.name} className={`${d.span} relative rounded-3xl overflow-hidden group cursor-pointer card-hover reveal-on-scroll`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <img src={`https://picsum.photos/seed/${d.img}/800/800`} className="card-img absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700" alt={d.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="text-[10px] md:text-xs text-brand-400 font-medium mb-1 block">{d.country}</span>
                <h3 className={`${d.span ? "text-2xl" : "text-base"} font-medium text-white mb-1`}>{d.name}</h3>
                <p className={`${d.span ? "text-sm" : "text-xs"} text-neutral-400`}>{d.count} adventures</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}