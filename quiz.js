class Quiz {
  currentQuestionId = 1;
  rightAnswers = 0;
  questions = {
    1: {
      question: "HTML - это язык программирования?",
      rightAnswer: "Нет",
    },
    2: {
      question: "Что быстрее python или java?",
      rightAnswer: "python",
    },
    3: {
      question: "Google создал Яндекс?",
      rightAnswer: "Нет",
    },
    4: {
      question: "Имя и фамилия человека, кто первым придумал концепцию интернета?",
      rightAnswer: "Джозеф Ликлайдер",
    },
    5: {
      question: "Нужны ли тестировщики?",
      rightAnswer: "Да",
    },
    6: {
      question: "Node это фреймворк python?",
      rightAnswer: "Нет",
    },
    7: {
      question: "JS это java?",
      rightAnswer: "Нет",
    },
    8: {
      question: "В каком году был представлен typescript?",
      rightAnswer: "2012",
    },
  };
  topics = [
    "Gamedev",
    "Java",
    "Mobile",
    "PHP",
    "Back end",
    "Маруся",
    "Чат-боты",
    "VK Mini Apps",
  ];

  constructor() {}

  nextQuestion() {
    return this.questions[this.currentQuestionId].question;
  }

  getRecomendations() {
    if (this.rightAnswers === 0) {
      return "Рекомедуем Вам стоит подтянуть свои навыки, прежде чем учавствовать в вездекоде";
    }
    return `Рекомедуем Вам тему ${
      this.topics[Math.round(Math.random() * (this.topics.length - 1))]
    }`;
  }

  destroy() {
    this.sessionId = "";
    this.currentQuestionId = 1;
    this.rightAnswers = 0;
  }
}

module.exports = { Quiz };
