const request = require("supertest");
const app = require("../app");

describe("Quiz API Tests", () => {
    let quizId;

    it("should create a new quiz", async () => {
        const quizData = {
            title: "Sample Quiz",
            questions: [
                { id: "q1", text: "What is 2 + 2?", options: ["1", "2", "3", "4"], correct_option: 3 },
                { id: "q2", text: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct_option: 2 },
            ],
        };

        const res = await request(app).post("/api/quizzes/create").send(quizData);
        expect(res.status).toBe(201);
        quizId = res.body.quizId;
    });

    it("should fetch a quiz without revealing correct answers", async () => {
        const res = await request(app).get(`/api/quizzes/${quizId}`);
        expect(res.status).toBe(200);
        expect(res.body.questions[0]).not.toHaveProperty("correct_option");
    });

    it("should submit an answer and return feedback", async () => {
        const res = await request(app).post("/api/quizzes/submit").send({
            quizId,
            questionId: "q1",
            selectedOption: 3,
            userId: "user123",
        });

        expect(res.status).toBe(200);
        expect(res.body.isCorrect).toBe(true);
    });

    it("should fetch quiz results", async () => {
        const res = await request(app).get(`/api/quizzes/${quizId}/results/user123`);
        expect(res.status).toBe(200);
        expect(res.body.score).toBe(1);
    });
});
