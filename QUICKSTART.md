# 🚀 QUICK START GUIDE - Quiz Application

## Step 1: Database Setup (2 minutes)

### Option A: Using MySQL Command Line
```bash
mysql -u root -p
# Enter password: root

# Then paste the SQL script content from: quiz-backend/src/main/resources/init-db.sql
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Create new query tab
3. Copy-paste content from: `quiz-backend/src/main/resources/init-db.sql`
4. Execute (Ctrl + Shift + Enter)

## Step 2: Backend Setup (3-5 minutes)

### Using Command Prompt:
```bash
cd C:\Users\2461384\OneDrive - Cognizant\Desktop\quizappdemo2\quiz-backend

# Build the project
mvn clean install

# OR Run directly
mvn spring-boot:run
```

### Or Use Batch File:
Double-click `start-backend.bat`

✅ **Backend started** when you see:
```
Started QuizApplication in XX seconds
```

## Step 3: Frontend Setup (2-3 minutes)

### Using Command Prompt (New Terminal):
```bash
cd C:\Users\2461384\OneDrive - Cognizant\Desktop\quizappdemo2\quiz-frontend

# Install dependencies (first time only)
npm install

# Start React server
npm start
```

### Or Use Batch File:
Double-click `start-frontend.bat`

✅ **Frontend started** when browser opens at: `http://localhost:3000`

## ✨ Application Ready!

Now visit: **http://localhost:3000**

- Enter your name
- Click "Start Quiz"
- Answer 10 questions with 60-second timer each
- View your score and leaderboard

---

## 🔧 If Something Goes Wrong

### MySQL Connection Error
```
✗ Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:** Start MySQL service
- Windows: `Services` → Find MySQL → Right-click → Start
- Or: `net start MySQL80` (in Command Prompt as Admin)

### Port 3000 Already in Use
```
✗ Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Use different port
```bash
set PORT=3001 && npm start
```

### Port 8080 Already in Use
**Solution:** Edit `application.properties`
```properties
server.port=8090
```
Then update React axios URL to `http://localhost:8090`

### Maven Not Found
```
✗ 'mvn' is not recognized
```
**Solution:** Install Maven or update PATH
- Download: https://maven.apache.org/download.cgi
- Add bin folder to PATH

### NPM Dependencies Error
```bash
# Clear cache and reinstall
cd quiz-frontend
npm cache clean --force
rm -rf node_modules
npm install
npm start
```

---

## 📋 Database Credentials

If you need to change them:

**MySQL:**
- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: `root`
- Database: `quiz_db`

**Update in:** `quiz-backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 🌐 API URLs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/questions?limit=10` | GET | Get 10 random questions |
| `/api/scores` | POST | Save quiz score |
| `/api/scores/leaderboard` | GET | Get top scores |
| `/api/scores/user/{name}` | GET | Get user's scores |

---

## 📱 Test the Application

### User: testuser
1. Start quiz
2. Answer questions (any option works for testing)
3. View score
4. Check leaderboard

### Multiple Users
Each user name is tracked separately for leaderboard

---

## 🛑 Stop Services

### Backend
- Ctrl + C in the backend terminal

### Frontend
- Ctrl + C in the frontend terminal
- Or close browser

---

## 📚 Project Files

```
quiz-app/
├── quiz-frontend/
│   ├── src/
│   │   ├── pages/              (4 pages)
│   │   ├── components/         (3 components)
│   │   ├── styles/             (8 CSS files)
│   │   └── App.js
│   └── package.json
│
├── quiz-backend/
│   ├── src/main/java/com/quiz/
│   │   ├── controller/         (2 controllers)
│   │   ├── service/            (2 services)
│   │   ├── entity/             (3 entities)
│   │   ├── repository/         (2 repositories)
│   │   └── dto/                (3 DTOs)
│   ├── pom.xml
│   └── application.properties
│
├── README.md
└── This file (QUICKSTART.md)
```

---

## ✅ Checklist

- [ ] MySQL running and quiz_db created
- [ ] Backend started on port 8080
- [ ] Frontend started on port 3000
- [ ] Browser shows Quiz Master app
- [ ] Can enter name and start quiz
- [ ] Timer countdown works
- [ ] Results page shows score
- [ ] Leaderboard loads

---

## 🎯 Next Steps

1. **Test with multiple users** to see leaderboard work
2. **Check database** to see scores stored in `quiz_scores` table
3. **Add more questions** by inserting in `questions` table
4. **Customize styling** in CSS files
5. **Deploy** to production

---

## 💡 Tips

- Questions are **randomized** - different order each time
- Timer auto-moves to **next question** when expired
- **No retries** - single attempt only
- Scores are **automatically saved** to database
- Leaderboard shows **top 100 users**

---

**Need Help?** Check the detailed README.md file

**Enjoy the Quiz! 🎉**
