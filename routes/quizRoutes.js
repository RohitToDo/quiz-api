const express = require("express");
const { body, param } = require("express-validator");
const quizController = require("../controllers/quizController");
const resultController = require("../controllers/resultController");

const router = express.Router();

router.post(
    "/create",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("questions").isArray().withMessage("Questions must be an array"),
        body("questions.*.text").notEmpty().withMessage("Question text is required"),
        body("questions.*.options").isArray({ min: 4, max: 4 }).withMessage("Each question must have 4 options"),
        body("questions.*.correct_option").isInt({ min: 0, max: 3 }).withMessage("Correct option must be a valid index"),
    ],
    quizController.createQuiz
);

router.get("/:id", quizController.getQuiz);

router.post(
    "/submit",
    [
        body("quizId").notEmpty().withMessage("Quiz ID is required"),
        body("questionId").notEmpty().withMessage("Question ID is required"),
        body("selectedOption").isInt().withMessage("Selected option is required"),
        body("userId").notEmpty().withMessage("User ID is required"),
    ],
    resultController.submitAnswer
);

router.get("/:quizId/results/:userId", resultController.getResults);

module.exports = router;
