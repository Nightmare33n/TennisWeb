export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};