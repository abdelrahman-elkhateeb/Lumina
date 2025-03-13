function WhatYouWillLearn({ whatYouWillLearn }) {
  return (
    <div>
      <h2 className="text-2xl font-bold capitalize text-primary mb-4">What You Will Learn :</h2>
      <ul className="space-y-3 ml-10">
        {whatYouWillLearn?.map((item, index) => (
          <li key={index} className=" text-site-text relative before:absolute before:w-2 before:h-2 before:bg-site-accent before:rounded before:-left-4 before:top-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WhatYouWillLearn;
