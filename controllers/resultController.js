const dataStore = require("../dataStore");

// Submit an answer
exports.submitAnswer = (req, res) => {
    const { quizId, questionId, selectedOption, userId } = req.body;

    const quiz = dataStore.quizzes[quizId];
    if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
    }

    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) {
        return res.status(404).json({ error: "Question not found" });
    }

    const isCorrect = question.correct_option === selectedOption;

    // Record the result
    const resultKey = `${quizId}_${userId}`;
    if (!dataStore.results[resultKey]) {
        dataStore.results[resultKey] = { score: 0, answers: [] };
    }

    dataStore.results[resultKey].answers.push({ questionId, selectedOption, isCorrect });
    if (isCorrect) {
        dataStore.results[resultKey].score++;
    }

    res.status(200).json({ isCorrect, correctOption: question.correct_option });
};

// Get results
exports.getResults = (req, res) => {
    const { quizId, userId } = req.params;

    const resultKey = `${quizId}_${userId}`;
    const result = dataStore.results[resultKey];

    if (!result) {
        return res.status(404).json({ error: "Results not found" });
    }

    res.status(200).json(result);
};
