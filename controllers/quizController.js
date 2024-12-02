const { v4: uuidv4 } = require("uuid");
const dataStore = require("../dataStore");

// Create a new quiz
exports.createQuiz = (req, res) => {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: "Invalid input: Title and questions are required." });
    }

    const quizId = uuidv4();
    dataStore.quizzes[quizId] = { id: quizId, title, questions };

    res.status(201).json({ message: "Quiz created successfully", quizId });
};

// Get a quiz (hide correct answers)
exports.getQuiz = (req, res) => {
    const { id } = req.params;
    const quiz = dataStore.quizzes[id];

    if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
    }

    const quizWithoutAnswers = {
        ...quiz,
        questions: quiz.questions.map(({ text, options, id }) => ({ id, text, options })),
    };

    res.status(200).json(quizWithoutAnswers);
};
