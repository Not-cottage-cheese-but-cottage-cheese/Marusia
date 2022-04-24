let skillState = new Map();

const getState = (sessionId) => {
  let state = skillState.get(sessionId);
  if (!state) {
    state = {
      [sessionId]: {},
    };
    skillState.set(sessionId, state);
  }
  return state;
};

const removeState = (sessionId) => {
  skillState.delete(sessionId);
};

module.exports = {
  getState,
  removeState,
};
