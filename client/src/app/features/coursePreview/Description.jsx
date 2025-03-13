function Description({ description }) {
  return (
    <div className="p-6 mt-5 rounded-xl bg-site-secondary">
      <h2 className="text-2xl font-bold text-primary mb-4">Course Description</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Description;
