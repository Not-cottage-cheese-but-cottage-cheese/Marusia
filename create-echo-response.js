const { pick } = require("ramda");

module.exports = ({ request, session, version }) => ({
  response: {
    text: request["original_utterance"],
    tts: request["original_utterance"],
    end_session: false,
  },
  session: pick(["session_id", "message_id", "user_id"], session),
  version,
});
