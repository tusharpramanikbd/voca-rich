const features = [
  {
    icon: "✅",
    title: "100% Offline",
    desc: "Works anywhere, no internet needed",
  },
  {
    icon: "📱",
    title: "Native App",
    desc: "Install on iPhone & Android",
  },
  {
    icon: "⚡",
    title: "Instant Sync",
    desc: "Changes saved immediately",
  },
  {
    icon: "🧠",
    title: "Smart Practice",
    desc: "Spaced repetition system",
  },
];

type TFeatureItem = {
  icon: string;
  title: string;
  desc: string;
};

const FeatureItem = ({ icon, title, desc }: TFeatureItem) => (
  <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start gap-3 mb-3">
      <span className="text-2xl mt-0.5">{icon}</span>
      <div>
        <h3 className="font-bold text-lg group-hover:text-white">{title}</h3>
        <p className="text-sm text-teal-100">{desc}</p>
      </div>
    </div>
  </div>
);

const Features = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
      {features.map(({ icon, title, desc }, i) => (
        <FeatureItem key={i} icon={icon} title={title} desc={desc} />
      ))}
    </div>
  );
};

export default Features;
