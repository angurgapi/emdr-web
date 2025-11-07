export interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  color: string;
}
const FeatureCard = (feature: FeatureCardProps) => {
  return (
    <div className="w-full flex flex-col rounded-2xl border bg-white p-5 shadow-sm dark:bg-gray-50/10">
      <div className="flex items-center gap-2">
        <div className={`rounded-xl border p-2 ${feature.color}`}>
          <feature.icon className="h-5 w-5 dark:text-gray-600" />
        </div>
        <h3 className="font-medium">{feature.title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {feature.desc}
      </p>
    </div>
  );
};
export default FeatureCard;
