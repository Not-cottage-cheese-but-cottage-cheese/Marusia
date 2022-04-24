const { pick } = require("ramda");

const prepareText = (originalText) => {
  return originalText.toLowerCase().replaceAll(",", "").replaceAll(" ", "");
};

const getResponseText = (text) => {
  if (
    (text.indexOf("вездекод") >= 0 || text.indexOf("вездеход") >= 0) &&
    text.indexOf("нетворогатворог") >= 0
  ) {
    return "Привет вездекодерам!";
  }

  return "Скажите 'Вездекод, команда не творог, а творог'";
};

module.exports = ({ request, session, version }) => {
  let text = prepareText(request.original_utterance);
  let responseText = getResponseText(text);

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
