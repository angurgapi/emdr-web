import { Sliders, Smartphone, Workflow, Zap } from "lucide-react";
import Container from "./Container";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";

const Features = () => {
  const featuresList: FeatureCardProps[] = [
    {
      icon: Zap,
      title: "Smooth Motion",
      desc: "Vector-based, resize-safe animation that feels natural at any speed.",
      color: "bg-blue-100",
    },
    {
      icon: Workflow,
      title: "Focus First",
      desc: "Minimal UI with fullscreen mode and Space to pause/resume.",
      color: "bg-green-100",
    },
    {
      icon: Smartphone,
      title: "Responsive",
      desc: "Looks great on mobile, tablet, and desktop out of the box.",
      color: "bg-purple-100",
    },
    {
      icon: Sliders,
      title: "Fully Controllable",
      desc: "Tweak direction, speed, size and more via friendly settings.",
      color: "bg-yellow-100",
    },
  ];
  return (
    <section id="features" className="py-6 md:py-10">
      <Container>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Why you might like what we offer
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          {featuresList.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
