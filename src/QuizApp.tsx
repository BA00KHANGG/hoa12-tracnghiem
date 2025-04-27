
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const allQuestions = [
  {
    question: "Giá trị thế điện cực chuẩn của cặp oxi hóa - khử nào được quy ước bằng 0?",
    options: ["Na+/Na", "Al3+/Al", "Cl2/2Cl−", "2H+/H2"],
    answer: 3,
  },
  {
    question: "Cặp oxi hóa - khử nào sau đây có giá trị thế điện cực chuẩn lớn hơn 0?",
    options: ["Ba2+/Ba", "Cu2+/Cu", "K+/K", "Li+/Li"],
    answer: 1,
  },
  // ... (sẽ có thêm dữ liệu sau nếu cần)
];

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 30);
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (index) => {
    setSelected(index);
  };

  const nextQuestion = () => {
    const updatedAnswers = [...userAnswers, selected];
    setUserAnswers(updatedAnswers);
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 30);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!showResult ? (
        <div className="space-y-4">
          {questions.length > 0 && (
            <>
              <h2 className="text-xl font-bold">Câu {current + 1}:</h2>
              <p className="text-lg">{questions[current].question}</p>
              <div className="grid grid-cols-1 gap-2">
                {questions[current].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant={selected === idx ? "default" : "outline"}
                    onClick={() => handleAnswer(idx)}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </Button>
                ))}
              </div>
              <Button onClick={nextQuestion} disabled={selected === null} className="w-full">
                {current + 1 === questions.length ? "Xem kết quả" : "Câu tiếp theo"}
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Hoàn thành!</h2>
            <p className="text-lg">Điểm của bạn: {score} / {questions.length}</p>
            <Button onClick={restart}>Làm lại</Button>
          </div>
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${userAnswers[idx] === q.answer ? "bg-green-100" : "bg-red-100"}`}>
                <p><strong>Câu {idx + 1}:</strong> {q.question}</p>
                <p>Đáp án đúng: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
