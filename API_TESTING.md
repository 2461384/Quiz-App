# 🧪 API Testing Guide

## Using cURL (Command Line)

### Get Random Questions
```bash
curl -X GET "http://localhost:8080/api/questions?limit=10" \
  -H "Content-Type: application/json"
```

### Get All Questions
```bash
curl -X GET "http://localhost:8080/api/questions/all" \
  -H "Content-Type: application/json"
```

### Save Quiz Score
```bash
curl -X POST "http://localhost:8080/api/scores" \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "John Doe",
    "score": 8,
    "totalQuestions": 10,
    "timestamp": "2024-01-15T10:30:00"
  }'
```

### Get Leaderboard
```bash
curl -X GET "http://localhost:8080/api/scores/leaderboard" \
  -H "Content-Type: application/json"
```

### Get User Scores
```bash
curl -X GET "http://localhost:8080/api/scores/user/John%20Doe" \
  -H "Content-Type: application/json"
```

---

## Using Postman

### 1. Import Collection (or Create Manually)

**Base URL:** `http://localhost:8080/api`

### 2. Create Requests

#### Request 1: Get Questions
```
Method: GET
URL: {{base_url}}/questions?limit=10
Headers:
  Content-Type: application/json
```

#### Request 2: Get All Questions
```
Method: GET
URL: {{base_url}}/questions/all
Headers:
  Content-Type: application/json
```

#### Request 3: Get Question by ID
```
Method: GET
URL: {{base_url}}/questions/1
Headers:
  Content-Type: application/json
```

#### Request 4: Save Score
```
Method: POST
URL: {{base_url}}/scores
Headers:
  Content-Type: application/json

Body (JSON):
{
  "userName": "Test User",
  "score": 7,
  "totalQuestions": 10,
  "timestamp": "2024-01-15T10:30:00"
}
```

#### Request 5: Get Leaderboard
```
Method: GET
URL: {{base_url}}/scores/leaderboard
Headers:
  Content-Type: application/json
```

#### Request 6: Get User Scores
```
Method: GET
URL: {{base_url}}/scores/user/Test%20User
Headers:
  Content-Type: application/json
```

#### Request 7: Get Recent Scores
```
Method: GET
URL: {{base_url}}/scores/recent/Test%20User
Headers:
  Content-Type: application/json
```

---

## Expected Response Examples

### GET /api/questions?limit=10
```json
[
  {
    "id": 1,
    "questionText": "What is the capital of France?",
    "category": "General Knowledge",
    "difficulty": "Easy",
    "options": [
      {
        "id": 1,
        "optionText": "London"
      },
      {
        "id": 2,
        "optionText": "Paris"
      },
      {
        "id": 3,
        "optionText": "Berlin"
      },
      {
        "id": 4,
        "optionText": "Madrid"
      }
    ],
    "correctAnswerId": 2
  },
  {
    "id": 2,
    "questionText": "What is the largest planet?",
    "category": "General Knowledge",
    "difficulty": "Easy",
    "options": [
      {
        "id": 5,
        "optionText": "Saturn"
      },
      {
        "id": 6,
        "optionText": "Jupiter"
      },
      {
        "id": 7,
        "optionText": "Venus"
      },
      {
        "id": 8,
        "optionText": "Neptune"
      }
    ],
    "correctAnswerId": 6
  }
]
```

### POST /api/scores
**Request:**
```json
{
  "userName": "Alice Smith",
  "score": 9,
  "totalQuestions": 10,
  "timestamp": "2024-01-15T14:45:00"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "userName": "Alice Smith",
  "score": 9,
  "totalQuestions": 10,
  "timestamp": "2024-01-15T14:45:00",
  "percentage": 90.0
}
```

### GET /api/scores/leaderboard
```json
[
  {
    "id": 1,
    "userName": "Alice Smith",
    "score": 10,
    "totalQuestions": 10,
    "timestamp": "2024-01-15T14:45:00",
    "percentage": 100.0
  },
  {
    "id": 2,
    "userName": "Bob Johnson",
    "score": 9,
    "totalQuestions": 10,
    "timestamp": "2024-01-15T13:20:00",
    "percentage": 90.0
  },
  {
    "id": 3,
    "userName": "Charlie Brown",
    "score": 8,
    "totalQuestions": 10,
    "timestamp": "2024-01-15T12:10:00",
    "percentage": 80.0
  }
]
```

### GET /api/scores/user/Alice%20Smith
```json
[
  {
    "id": 1,
    "userName": "Alice Smith",
    "score": 10,
    "totalQuestions": 10,
    "timestamp": "2024-01-15T14:45:00",
    "percentage": 100.0
  },
  {
    "id": 4,
    "userName": "Alice Smith",
    "score": 8,
    "totalQuestions": 10,
    "timestamp": "2024-01-14T10:30:00",
    "percentage": 80.0
  }
]
```

---

## Using JavaScript (Fetch API)

### Get Questions
```javascript
fetch('http://localhost:8080/api/questions?limit=10')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Save Score
```javascript
const scoreData = {
  userName: "John Doe",
  score: 7,
  totalQuestions: 10,
  timestamp: new Date().toISOString()
};

fetch('http://localhost:8080/api/scores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(scoreData)
})
  .then(response => response.json())
  .then(data => console.log('Score saved:', data))
  .catch(error => console.error('Error:', error));
```

### Get Leaderboard
```javascript
fetch('http://localhost:8080/api/scores/leaderboard')
  .then(response => response.json())
  .then(leaderboard => {
    leaderboard.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.userName}: ${entry.score}/${entry.totalQuestions}`);
    });
  })
  .catch(error => console.error('Error:', error));
```

---

## Using Python (Requests Library)

### Install requests
```bash
pip install requests
```

### Get Questions
```python
import requests

response = requests.get('http://localhost:8080/api/questions?limit=10')
questions = response.json()

for question in questions:
    print(f"Q: {question['questionText']}")
    for option in question['options']:
        print(f"  - {option['optionText']}")
```

### Save Score
```python
import requests
from datetime import datetime

score_data = {
    "userName": "John Doe",
    "score": 8,
    "totalQuestions": 10,
    "timestamp": datetime.now().isoformat()
}

response = requests.post(
    'http://localhost:8080/api/scores',
    json=score_data,
    headers={'Content-Type': 'application/json'}
)

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
```

### Get Leaderboard
```python
import requests

response = requests.get('http://localhost:8080/api/scores/leaderboard')
leaderboard = response.json()

for i, entry in enumerate(leaderboard[:10], 1):
    percentage = (entry['score'] / entry['totalQuestions']) * 100
    print(f"{i}. {entry['userName']}: {entry['score']}/{entry['totalQuestions']} ({percentage:.1f}%)")
```

---

## Testing Flow

### 1. Test Questions Endpoint
```bash
# Get random questions
curl http://localhost:8080/api/questions?limit=10
# Should return 10 questions with options and correct answer ID
```

### 2. Test Score Saving
```bash
# Save a test score
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{"userName":"TestUser","score":7,"totalQuestions":10,"timestamp":"2024-01-15T10:00:00"}'
# Should return 201 Created with saved score
```

### 3. Test Leaderboard
```bash
# Get top scores
curl http://localhost:8080/api/scores/leaderboard
# Should show all saved scores sorted by score descending
```

### 4. Test User Scores
```bash
# Get scores for specific user
curl http://localhost:8080/api/scores/user/TestUser
# Should return all scores for TestUser
```

---

## Error Responses

### 404 - Not Found
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Question not found",
  "path": "/api/questions/999"
}
```

### 400 - Bad Request
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input parameters",
  "path": "/api/scores"
}
```

### 500 - Server Error
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Database connection failed",
  "path": "/api/questions"
}
```

---

## Performance Testing

### Load Testing with Apache JMeter
1. Create test plan with 100 concurrent users
2. Test `/api/questions` endpoint
3. Expected: <500ms response time
4. Throughput: >200 requests/second

### Stress Testing
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:8080/api/scores/leaderboard
```

---

## Debugging Tips

### Check Backend Logs
```bash
# In the terminal running Spring Boot
# Look for SQL queries and request logs
```

### Enable Query Logging
In `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
```

### Test Database Connection
```bash
mysql -h localhost -u root -p quiz_db
SELECT COUNT(*) FROM questions;
```

### Browser DevTools
1. Open F12 → Network tab
2. Make requests from application
3. Check response headers and body
4. Verify CORS headers present

---

## Summary

| Tool | Best For | Command |
|------|----------|---------|
| cURL | Quick testing | `curl -X GET http://...` |
| Postman | API development | GUI-based |
| Fetch API | Frontend integration | JavaScript |
| Python Requests | Automation | `requests.get()` |
| Axios | React apps | `axios.get()` |

---

**Happy Testing! 🧪**
