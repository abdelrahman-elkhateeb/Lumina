function Description({ description }) {
  return (
    <div className="p-6 mt-5 rounded-xl bg-primary-500">
      <h2 className="text-2xl font-bold text-primary mb-4">Course Description</h2>
      <p className="text-text">
        {description}
      </p>
    </div>
  );
}

export default Description;
