# Quiz Application - Architecture & Features Document

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐    │
│  │  Home Page   │  │  Quiz Page   │  │  Results/Leader  │    │
│  │  (Login)     │  │  (Questions) │  │  board            │    │
│  └──────────────┘  └──────────────┘  └───────────────────┘    │
│         │                  │                    │               │
│         └──────────────────┼────────────────────┘               │
│                            │                                    │
│                    React Router DOM                            │
│                      Components                                 │
│         (Timer, Progress, QuestionCard)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    REST API (Axios)
                    CORS Enabled
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Spring Boot REST API)                     │
│                    Port: 8080                                   │
│                                                                 │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │ QuestionController   │      │ QuizScoreController  │       │
│  │                      │      │                      │       │
│  │ GET /api/questions   │      │ POST /api/scores     │       │
│  │ GET /api/questions/1 │      │ GET /api/scores/user │       │
│  │ GET /api/categories  │      │ GET /api/leaderboard │       │
│  └──────────┬───────────┘      └──────────┬───────────┘       │
│             │                             │                    │
│             ↓                             ↓                    │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │ QuestionService      │      │ QuizScoreService     │       │
│  │ - getRandomQuestions │      │ - saveScore          │       │
│  │ - getQuestionById    │      │ - getTopScores       │       │
│  │ - convertToDTO       │      │ - getLeaderboard     │       │
│  └──────────┬───────────┘      └──────────┬───────────┘       │
│             │                             │                    │
│             ↓                             ↓                    │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │ QuestionRepository   │      │ QuizScoreRepository  │       │
│  │ (JPA)                │      │ (JPA)                │       │
│  └──────────┬───────────┘      └──────────┬───────────┘       │
│             │                             │                    │
│             └──────────────┬──────────────┘                    │
│                            │                                   │
│                            ↓                                   │
│                   ┌─────────────────┐                          │
│                   │ Hibernate ORM   │                          │
│                   └────────┬────────┘                          │
│                            │                                   │
└─────────────────────────────┼──────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │   MySQL Database    │
                    │    (quiz_db)        │
                    │                     │
                    │ ┌─────────────────┐ │
                    │ │ questions       │ │
                    │ │ options         │ │
                    │ │ quiz_scores     │ │
                    │ └─────────────────┘ │
                    └─────────────────────┘
```

## 🎯 Core Features Implementation

### 1. **Multiple Choice Questions Display**
- **Component**: `QuestionCard.js`
- **Display**: Shows question text with 4 radio button options
- **Styling**: Cards with hover effects and selection indication
- **Data**: Fetched from `/api/questions` endpoint

### 2. **Answer Selection**
- **Method**: Radio buttons (single selection)
- **Tracking**: Stored in `selectedAnswers` state object
- **Validation**: Automatic scoring on selection
- **Feedback**: Visual checkmark on selected option

### 3. **Final Score Display**
- **Page**: `Results.js`
- **Shows**: 
  - Score as fraction (e.g., 8/10)
  - Percentage (80%)
  - Letter grade (A, B, C, D, F)
  - Correct vs Incorrect counts
  - Performance message
- **Styling**: Color-coded grades with grade badge

### 4. **Question Storage**
- **Database**: MySQL `questions` table
- **Entities**: 
  - `Question` (question text, category, difficulty)
  - `Option` (option text, correct_answer flag)
- **Sample Data**: 15 pre-loaded questions in init-db.sql

## ⚡ Bonus Features Implementation

### 1. **Timer (⏱️)**
- **Component**: `Timer.js`
- **Countdown**: 60 seconds per question
- **Auto-advance**: Moves to next question when time expires
- **Visual Feedback**:
  - Green (0-30s): Normal
  - Orange (30-10s): Warning state
  - Red (<10s): Critical with shake animation
  - "Hurry up!" message when <10s

**Code Logic**:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        handleNext();  // Auto-advance
        return 60;
      }
      return prev - 1;
    });
  }, 1000);
}, [quizComplete, currentQuestionIndex]);
```

### 2. **Randomize Questions (🔀)**
- **Method**: SQL `ORDER BY RAND()`
- **Repository**: `QuestionRepository.findRandomQuestions(limit)`
- **Implementation**:
```java
@Query(value = "SELECT * FROM questions ORDER BY RAND() LIMIT ?1", nativeQuery = true)
List<Question> findRandomQuestions(int limit);
```
- **Fresh randomization** on each quiz attempt
- **Frontend**: Shuffles received questions with `sort(() => Math.random() - 0.5)`

### 3. **Store User Scores (🏆)**
- **Table**: `quiz_scores`
- **Entity**: `QuizScore.java`
- **Endpoint**: `POST /api/scores`
- **Data Saved**:
  - User name
  - Score (number correct)
  - Total questions
  - Timestamp
  - Calculated percentage

**Automatic Saving**:
```javascript
const response = await axios.post('http://localhost:8080/api/scores', {
  userName: userName,
  score: score,
  totalQuestions: questions.length,
  timestamp: new Date()
});
```

### 4. **Leaderboard Display (📊)**
- **Page**: `Leaderboard.js`
- **Endpoint**: `GET /api/scores/leaderboard`
- **Features**:
  - Top 100 scores sorted by score descending
  - User names with scores
  - Percentage display
  - Date of quiz
  - Medal icons for top 3 (🥇 🥈 🥉)
  - Responsive table design

**Query**:
```java
@Query("SELECT q FROM QuizScore q ORDER BY q.score DESC, q.timestamp DESC LIMIT ?1")
List<QuizScore> findTopScores(int limit);
```

## 🎨 UI/UX Features

### **Beautiful Modern Design**
- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Animations**:
  - Fade-in on page load
  - Slide-down for titles
  - Slide-in for question cards
  - Shake animation for timer (critical state)
  - Pulse animation for warning messages
  - Smooth transitions on all interactions

### **Responsive Design**
- Desktop (1200px+): Full 4-column grid for info cards
- Tablet (768px): 2-column grid
- Mobile (480px): Single column, stacked buttons
- Touch-friendly buttons (min 44px height)

### **Components**
1. **QuestionCard**: Radio buttons with hover states
2. **Timer**: Color-coded countdown with animations
3. **ProgressBar**: Visual progress through quiz
4. **Navigation**: Previous/Next buttons with disabled states

## 📊 Database Schema

### questions
```sql
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    created_at TIMESTAMP
);
```

### options
```sql
CREATE TABLE options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    correct_answer BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
```

### quiz_scores
```sql
CREATE TABLE quiz_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_name (user_name),
    INDEX idx_score (score)
);
```

## 🔌 REST API Endpoints

### Questions
| Method | Endpoint | Purpose | Response |
|--------|----------|---------|----------|
| GET | `/api/questions?limit=10` | Get 10 random questions | List of QuestionDTO |
| GET | `/api/questions/all` | Get all questions | List of QuestionDTO |
| GET | `/api/questions/{id}` | Get specific question | QuestionDTO |
| GET | `/api/questions/category/{category}` | Filter by category | List of QuestionDTO |
| GET | `/api/questions/difficulty/{difficulty}` | Filter by difficulty | List of QuestionDTO |

### Scores
| Method | Endpoint | Purpose | Request/Response |
|--------|----------|---------|------------------|
| POST | `/api/scores` | Save quiz score | QuizScoreDTO |
| GET | `/api/scores/leaderboard` | Get top 100 scores | List of QuizScoreDTO |
| GET | `/api/scores/user/{userName}` | Get user's all scores | List of QuizScoreDTO |
| GET | `/api/scores/recent/{userName}` | Get last 5 attempts | List of QuizScoreDTO |

## 🛣️ User Journey

```
Start (http://localhost:3000)
    ↓
[Home Page]
  - Enter name
  - Click "Start Quiz"
    ↓
[Quiz Page]
  - Display Q1 with timer (60s)
  - Select answer → Score updates
  - Auto-advance on timer OR click Next
  - Repeat for Q2-Q10
    ↓
[Results Page]
  - Show final score (e.g., 8/10)
  - Show grade letter (e.g., B)
  - Show percentage (80%)
  - Show correct/incorrect counts
  - Display recent attempts
  - Save score to database
    ↓
[Options]
  ├─ View Leaderboard
  │   - See top 100 performers
  │   - Global rankings
  │   └─ Back to Home
  │
  └─ Back to Home
      └─ Start New Quiz (different questions)
```

## 🔐 Key Algorithms

### Question Randomization
```
1. Client: Fetch 10 questions
2. Backend: SELECT * FROM questions ORDER BY RAND() LIMIT 10
3. Frontend: Additional shuffle for extra randomness
Result: Different order each attempt
```

### Score Calculation
```
1. Track each answer selection
2. Compare with correct_answer_id
3. Increment score for matches
4. Final: score/totalQuestions → percentage
5. Calculate grade: A(90+), B(80-89), C(70-79), D(60-69), F(<60)
```

### Leaderboard Ranking
```
1. Sort all quiz_scores by score DESC
2. Then by timestamp DESC (newer first)
3. Limit to top 100
4. Display with rank, name, score, percentage, date
5. Medals for rank 1, 2, 3
```

## 🚀 Performance Optimizations

1. **Database Indexes**: 
   - `quiz_scores.user_name` - for user lookups
   - `quiz_scores.score` - for leaderboard sorting

2. **Frontend**:
   - React Router for client-side navigation
   - State management for quiz progress
   - Lazy loading of components

3. **Backend**:
   - JPA caching enabled
   - Native SQL for randomization
   - DTO pattern for data transfer

4. **CORS**: Configured for frontend domain only

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 State Management (React)

```javascript
// Quiz.js state
const [questions, setQuestions]           // All quiz questions
const [currentQuestionIndex, setCurrentQuestionIndex]  // Navigation
const [score, setScore]                   // Running score
const [selectedAnswers, setSelectedAnswers]  // Answer tracking
const [timeLeft, setTimeLeft]              // Timer countdown
const [quizComplete, setQuizComplete]      // Completion flag
```

## 📦 Dependencies

**Frontend:**
- react@18.2.0
- react-dom@18.2.0
- react-router-dom@6.8.0
- axios@1.3.0

**Backend:**
- spring-boot-starter-web@3.0.0
- spring-boot-starter-data-jpa@3.0.0
- mysql-connector-java@8.0.33
- lombok (annotation processor)

---

**This architecture ensures:**
✅ Scalability (easy to add more questions/features)
✅ Performance (optimized queries, minimal re-renders)
✅ Maintainability (separation of concerns, clean code)
✅ User Experience (beautiful UI, responsive design)
✅ Data Integrity (proper database design, constraints)
