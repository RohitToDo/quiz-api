const dataStore = {
    quizzes: {}, // { quizId: { id, title, questions } }
    results: {}, // { quizId_userId: { score, answers } }
};

module.exports = dataStore;
