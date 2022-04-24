const { pick } = require("ramda");
const { Quiz } = require("./quiz");
const { getState, removeState } = require("./state");

const prepareText = (originalText) => {
  return originalText.toLowerCase().replaceAll(",", "").replaceAll(" ", "");
};

const getResponseText = (text, sessionId, originalText) => {
  const state = getState(sessionId);
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
        return `Опрос пройден! Правильных ответов: ${
          state[sessionId].quiz.rightAnswers
        }\n${state[sessionId].quiz.getRecomendations()}`;
      } else {
        state[sessionId].quiz.currentQuestionId++;
        return `${state[sessionId].quiz.currentQuestionId}. ${state[
          sessionId
        ].quiz.nextQuestion()}`;
      }
    }
  } else {
    if (
      (text.indexOf("вездекод") >= 0 || text.indexOf("вездеход") >= 0) &&
      text.indexOf("нетворогатворог") >= 0
    ) {
      return "Привет вездекодерам!";
    }
    if (text.indexOf("пройтиопрос") >= 0) {
      state[sessionId] = {
        quiz: new Quiz(),
        quiz_start: true,
      };
      return `Вам будет задано 8 вопросов!\nСкажите 'стоп' для выхода из опроса.\n1. ${state[
        sessionId
      ].quiz.nextQuestion()}`;
    }
  }

  return "Скажите 'Вездекод, команда не творог, а творог' или 'Пройти опрос'";
};

module.exports = ({ request, session, version }) => {
  let text = prepareText(request.original_utterance);
  let responseText = getResponseText(
    text,
    session.session_id,
    request.original_utterance
  );

  return {
    response: {
      text: responseText,
      tts: responseText,
      end_session: false,
    },
    session: pick(["session_id", "message_id", "user_id"], session),
    version,
  };
};
