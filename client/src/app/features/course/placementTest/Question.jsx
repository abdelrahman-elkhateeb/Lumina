function Question({ questions, index }) {
  return (
    <h2 className="text-5xl font-bold">{questions[index].question}</h2>
  )
}

export default Question;
