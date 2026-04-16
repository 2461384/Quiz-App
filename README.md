# Quiz Application - Complete Setup Guide

A full-stack Quiz Application built with React, Spring Boot, and MySQL with beautiful modern UI.

## Features

✅ **Core Features**
- Display multiple-choice questions (Max 10 per quiz)
- Allow users to select answers
- Show final score at the end
- Store questions in MySQL database
- No retries - Single attempt only

✨ **Bonus Features**
- ⏱️ Real-time countdown timer (60 seconds per question)
- 🔀 Randomize questions on each attempt
- 🏆 Store user scores in database
- 📊 Leaderboard with top performers
- 🎨 Beautiful modern UI with animations
- 📱 Fully responsive design

## Project Structure

```
quizappdemo2/
├── quiz-frontend/          # React Frontend
│   ├── src/
│   │   ├── pages/          # Home, Quiz, Results, Leaderboard
│   │   ├── components/     # QuestionCard, Timer, ProgressBar
│   │   ├── styles/         # CSS files for each component
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── quiz-backend/           # Spring Boot Backend
    ├── src/main/java/com/quiz/
    │   ├── controller/     # QuestionController, QuizScoreController
    │   ├── service/        # QuestionService, QuizScoreService
    │   ├── entity/         # Question, Option, QuizScore
    │   ├── repository/     # JPA Repositories
    │   ├── dto/            # Data Transfer Objects
    │   └── QuizApplication.java
    ├── src/main/resources/
    │   ├── application.properties
    │   └── init-db.sql     # Database initialization with sample data
    └── pom.xml
```

## Prerequisites

- **Node.js** (v14 or higher) - for React
- **Java** (JDK 17 or higher) - for Spring Boot
- **MySQL** (v5.7 or higher) - for database
- **Maven** (v3.6 or higher) - for building Spring Boot

## Installation & Setup

### 1. Database Setup

Open MySQL and run the following commands:

```sql
-- Create database and tables
SOURCE init-db.sql;
```

Or run the SQL script: `quiz-backend/src/main/resources/init-db.sql`

The script will:
- Create `quiz_db` database
- Create `questions`, `options`, and `quiz_scores` tables
- Insert 15 sample questions with 4 options each

**Default MySQL Credentials:**
- Username: `root`
- Password: `root`
- Database: `quiz_db`

### 2. Backend Setup (Spring Boot)

```bash
cd quiz-backend

# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

**API Endpoints:**
- `GET /api/questions?limit=10` - Get 10 random questions
- `GET /api/questions/all` - Get all questions
- `GET /api/questions/{id}` - Get specific question
- `POST /api/scores` - Save quiz score
- `GET /api/scores/user/{userName}` - Get user scores
- `GET /api/scores/leaderboard` - Get top 100 scores
- `GET /api/scores/recent/{userName}` - Get recent 5 attempts

### 3. Frontend Setup (React)

```bash
cd quiz-frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will open on **http://localhost:3000**

## How to Use

1. **Home Page**: Enter your name and click "Start Quiz"
2. **Quiz Page**: 
   - Read the question
   - Select one of the 4 options
   - Timer counts down (60 seconds per question)
   - Auto-moves to next question when time expires
   - Use Previous/Next buttons to navigate
   - View current score in the footer
3. **Results Page**: 
   - View final score with grade (A, B, C, D, F)
   - See accuracy percentage
   - View your recent attempts
4. **Leaderboard**: 
   - View top performers globally
   - Rankings with medals (🥇 🥈 🥉)

## Configuration

### Backend (application.properties)

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
spring.datasource.username=root
spring.datasource.password=root

# CORS
spring.web.cors.allowed-origins=http://localhost:3000
```

### Frontend (Quiz.js)

API base URL is set to:
```javascript
http://localhost:8080/api
```

Change in axios calls if using different port.

## Building for Production

### Backend

```bash
cd quiz-backend
mvn clean package
# JAR file will be in target/quiz-app-1.0.0.jar
java -jar target/quiz-app-1.0.0.jar
```

### Frontend

```bash
cd quiz-frontend
npm run build
# Build files will be in build/ directory
# Deploy to any static hosting (Netlify, Vercel, etc.)
```

## Database Schema

### questions table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| question_text | TEXT | Question content |
| category | VARCHAR | Question category |
| difficulty | VARCHAR | Easy/Medium/Hard |

### options table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| question_id | BIGINT | Foreign Key |
| option_text | TEXT | Option content |
| correct_answer | BOOLEAN | Is this correct? |

### quiz_scores table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| user_name | VARCHAR | User name |
| score | INT | Number correct |
| total_questions | INT | Total questions |
| timestamp | TIMESTAMP | When quiz was taken |

## Technologies Used

**Frontend:**
- React 18.2.0
- React Router DOM 6.8.0
- Axios 1.3.0
- CSS3 with animations

**Backend:**
- Spring Boot 3.0.0
- Spring Data JPA
- MySQL Connector
- Lombok
- Maven

**Database:**
- MySQL 5.7+

**Other:**
- Node.js 14+
- Java 17+

## Features Explained

### ⏱️ Timer
- 60 seconds per question
- Turns orange at 30 seconds remaining
- Turns red at 10 seconds (with shake animation)
- Auto-moves to next question when time expires

### 🔀 Randomization
- Questions are randomized using database RAND() function
- Different questions on each attempt
- Options order may vary

### 🏆 Scoring System
- 1 point per correct answer
- No partial credit
- Immediate feedback on results page
- Grading: A (90+), B (80-89), C (70-79), D (60-69), F (<60)

### 📊 Leaderboard
- Top 100 scores displayed
- Sorted by score then timestamp
- Shows medals for top 3
- User names and percentages

## Troubleshooting

**Issue: Cannot connect to MySQL**
- Check MySQL is running
- Verify credentials in application.properties
- Ensure quiz_db database exists

**Issue: CORS error in browser console**
- Check CORS settings in application.properties
- Frontend URL should match allowed-origins
- Clear browser cache and restart servers

**Issue: Questions not loading**
- Run init-db.sql to populate questions
- Check database connection
- Verify /api/questions endpoint responds

**Issue: Port already in use**
- Change `server.port` in application.properties (backend)
- Use `PORT=3001 npm start` for React (frontend)

## API Response Examples

### Get Questions
```json
[
  {
    "id": 1,
    "questionText": "What is the capital of France?",
    "category": "General Knowledge",
    "difficulty": "Easy",
    "options": [
      {"id": 1, "optionText": "London"},
      {"id": 2, "optionText": "Paris"},
      {"id": 3, "optionText": "Berlin"},
      {"id": 4, "optionText": "Madrid"}
    ],
    "correctAnswerId": 2
  }
]
```

### Save Score
```json
{
  "userName": "John Doe",
  "score": 8,
  "totalQuestions": 10,
  "timestamp": "2024-01-15T10:30:00"
}
```

## Performance Tips

1. **Database**: Add indexes on frequently queried columns
2. **Frontend**: Use React DevTools to check for re-renders
3. **Backend**: Enable query logging to optimize queries
4. **Cache**: Consider caching questions list

## Future Enhancements

- [ ] User authentication & registration
- [ ] Question difficulty levels filtering
- [ ] Category-based quizzes
- [ ] Multiple quiz modes
- [ ] Social sharing of scores
- [ ] Real-time multiplayer quizzes
- [ ] Admin panel to add questions
- [ ] Analytics dashboard

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please refer to the code comments or create an issue.

---

**Happy Quizzing! 🎉**
