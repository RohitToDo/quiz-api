<!--------

Known Issues : 
The in-memory backend does not persist data across restarts.
Basic validation is implemented. 
No JWT Implemented for auth

----->



## Setup Instructions

###  Clone the Repository 

git clone https://github.com/RohitToDo/quiz-api.git
cd quiz-api
 
### Install Dependencies 

npm install

### Run Application Locally

node server.js
This will start the server on http://localhost:3000

### Run Test
npm test


### With Docker - Build Docker Image
docker-compose build 

### Run With Docker
docker-compose up
The app will be available at http://localhost:3000

### Run Test
docker-compose run test


### API Endpoints
1. Create Quiz

Endpoint POST /api/quizzes/create
Request Body 
{
  "title": "Sample Quiz",
  "questions": [
    {
      "id": "q1",
      "text": "What is 2 + 2?",
      "options": ["1", "2", "3", "4"],
      "correct_option": 3
    }
  ]
}

2. Get Quiz by ID
Endpoint: GET /api/quizzes/:quizId

3. Submit Answwer
Endpoint: POST /api/quizzes/submit
Request Body:
{
  "quizId": "123e4567-e89b-12d3-a456-426614174000",
  "questionId": "q1",
  "selectedOption": 3,
  "userId": "user123"
}

4. Get Results

Endpoint: GET /api/quizzes/:quizId/results/:userId
Request Body:
{
  "score": 1,
  "answers": [
    {
      "questionId": "q1",
      "selectedOption": 3,
      "isCorrect": true
    }
  ]
}


