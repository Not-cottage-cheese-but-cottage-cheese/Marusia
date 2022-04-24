const { pick } = require("ramda");
const { Quiz } = require("./quiz");
const { getState, removeState } = require("./state");

const prepareText = (originalText) => {
  return originalText.toLowerCase().replaceAll(",", "").replaceAll(" ", "");
};

const getResponseText = (text, sessionId, originalText) => {
  const state = getState(sessionId);
  let responseText = "";
  let tts = "";
  let card = {};

  if (state[sessionId]?.quiz_start) {
    if (text.indexOf("стоп") >= 0) {
      if (state[sessionId].quiz) {
        state[sessionId].quiz.destroy();
        removeState(sessionId);
      }
    } else {
      const rightAnswer =
        state[sessionId].quiz.questions[
          state[sessionId].quiz.currentQuestionId
        ].rightAnswer.toLowerCase();

      if (rightAnswer === originalText.toLowerCase()) {
        state[sessionId].quiz.rightAnswers++;
      }

      if (state[sessionId].quiz.currentQuestionId === 8) {
        state[sessionId].quiz_start = false;
        responseText = `Опрос пройден! Правильных ответов: ${
          state[sessionId].quiz.rightAnswers
        }\n${state[sessionId].quiz.getRecomendations()}`;
        tts = `${state[sessionId].quiz.getSound()} ${responseText}`;
        card = state[sessionId].quiz.getImage();
      } else {
        state[sessionId].quiz.currentQuestionId++;
        responseText = `${state[sessionId].quiz.currentQuestionId}. ${state[
          sessionId
        ].quiz.nextQuestion()}`;
      }
    }
  } else {
    if (
      (text.indexOf("вездекод") >= 0 || text.indexOf("вездеход") >= 0) &&
      text.indexOf("нетворогатворог") >= 0
    ) {
      responseText = "Привет вездекодерам!";
    }
    if (text.indexOf("вездекод" >= 0) || text.indexOf("вездеход") >= 0) {
      responseText = "Возможно Вы хотите принять участие в вездекоде?";
      card = {
        type: "MiniApp",
        url: "https://vk.com/steps",
        text: text,
        t: text.indexOf("вездекод" >= 0),
        t2: text.indexOf("вездеход" >= 0),
        t3: text.indexOf("вездекод" >= 0) || text.indexOf("вездеход") >= 0,
        // title: "Вездекод - Марафон VK",
        // text: "«Вездекод» — это IT-марафон c заданиями, разными по направлениям и сложности, а также конкурсами и викторинами. Здесь находят новые знакомства и незабываемый опыт.\nПодпишитесь, чтобы ничего не пропустить!",
        // image_id: 457239025,
      };
    }
    if (text.indexOf("пройтиопрос") >= 0) {
      state[sessionId] = {
        quiz: new Quiz(),
        quiz_start: true,
      };
      responseText = `Вам будет задано 8 вопросов!\nСкажите 'стоп' для выхода из опроса.\n1. ${state[
        sessionId
      ].quiz.nextQuestion()}`;
    }
  }

  if (responseText === "") {
    responseText =
      "Скажите 'Вездекод, команда не творог, а творог' или 'Пройти опрос'";
  }
  if (tts === "") {
    tts = responseText;
  }

  return [responseText, tts, card];
};

module.exports = ({ request, session, version }) => {
  let text = prepareText(request.original_utterance);
  let [responseText, tts, card] = getResponseText(
    text,
    session.session_id,
    request.original_utterance
  );

  return {
    response: {
      text: responseText,
      tts: tts,
      card,
      end_session: false,
    },
    session: pick(["session_id", "message_id", "user_id"], session),
    version,
  };
};
