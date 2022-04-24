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
      question:
        "Имя и фамилия человека, кто первым придумал концепцию интернета?",
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
  recomendation = -1;
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
  images = [
    457239022, 457239021, 457239019, 457239018, 457239024, 457239020, 457239023,
    457239017,
  ];

  constructor() {}

  nextQuestion() {
    return this.questions[this.currentQuestionId].question;
  }

  getRecomendations() {
    if (this.rightAnswers === 0) {
      this.recomendation = -1;
      return "Рекомедуем Вам стоит подтянуть свои навыки, прежде чем учавствовать в вездекоде";
    }
    this.recomendation = Math.round(Math.random() * (this.topics.length - 1));
    return `Рекомедуем Вам тему ${this.topics[this.recomendation]}`;
  }

  getSound() {
    if (this.rightAnswers === 8) {
      return "<speaker audio_vk_id=2000512006_456239021>";
    } else if (this.rightAnswers === 0) {
      return `<speaker audio=marusia-sounds/game-loss-${Math.round(Math.random() * 2 + 1)}>`;
    } else {
      return `<speaker audio=marusia-sounds/game-win-${Math.round(Math.random() * 2 + 1)}>`;
    }
  }

  getImage() {
    return this.recomendation >= 0
      ? {
          type: "BigImage",
          image_id: this.images[this.recomendation],
        }
      : {};
  }

  destroy() {
    this.sessionId = "";
    this.currentQuestionId = 1;
    this.rightAnswers = 0;
    this.recomendation = -1;
  }
}

module.exports = { Quiz };
