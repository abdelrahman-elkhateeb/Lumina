function Heading({ img, title }) {
  return (
    <div className="flex items-center mb-5">
      <div className="w-20">
        <img src={img} alt="Spaceman" className="w-full" />
      </div>
      <h1 className="text-3xl font-bold capitalize text-primary">{title}</h1>
    </div>
  )
}

export default Heading;
