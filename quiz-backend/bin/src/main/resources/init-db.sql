-- Create Database
CREATE DATABASE IF NOT EXISTS quiz_db;
USE quiz_db;

-- Create Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Options Table
CREATE TABLE IF NOT EXISTS options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_text TEXT NOT NULL,
    correct_answer BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Create Quiz Scores Table
CREATE TABLE IF NOT EXISTS quiz_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_name (user_name),
    INDEX idx_score (score)
);

-- Insert Sample Questions and Options

-- Q1: General Knowledge
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the capital of France?', 'General Knowledge', 'Easy');
SET @q1_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q1_id, 'London', FALSE),
(@q1_id, 'Paris', TRUE),
(@q1_id, 'Berlin', FALSE),
(@q1_id, 'Madrid', FALSE);

-- Q2: General Knowledge
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the largest planet in our solar system?', 'General Knowledge', 'Easy');
SET @q2_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q2_id, 'Saturn', FALSE),
(@q2_id, 'Jupiter', TRUE),
(@q2_id, 'Venus', FALSE),
(@q2_id, 'Neptune', FALSE);

-- Q3: Science
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the chemical symbol for Gold?', 'Science', 'Easy');
SET @q3_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q3_id, 'Au', TRUE),
(@q3_id, 'Ag', FALSE),
(@q3_id, 'Al', FALSE),
(@q3_id, 'Fe', FALSE);

-- Q4: History
INSERT INTO questions (question_text, category, difficulty) VALUES
('In which year did World War II end?', 'History', 'Medium');
SET @q4_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q4_id, '1943', FALSE),
(@q4_id, '1944', FALSE),
(@q4_id, '1945', TRUE),
(@q4_id, '1946', FALSE);

-- Q5: Geography
INSERT INTO questions (question_text, category, difficulty) VALUES
('Which is the smallest country in the world?', 'Geography', 'Easy');
SET @q5_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q5_id, 'Monaco', FALSE),
(@q5_id, 'Vatican City', TRUE),
(@q5_id, 'Liechtenstein', FALSE),
(@q5_id, 'San Marino', FALSE);

-- Q6: Science
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the speed of light?', 'Science', 'Medium');
SET @q6_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q6_id, '300,000 km/s', TRUE),
(@q6_id, '150,000 km/s', FALSE),
(@q6_id, '450,000 km/s', FALSE),
(@q6_id, '200,000 km/s', FALSE);

-- Q7: Literature
INSERT INTO questions (question_text, category, difficulty) VALUES
('Who wrote Romeo and Juliet?', 'Literature', 'Easy');
SET @q7_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q7_id, 'William Shakespeare', TRUE),
(@q7_id, 'Jane Austen', FALSE),
(@q7_id, 'Charles Dickens', FALSE),
(@q7_id, 'George Orwell', FALSE);

-- Q8: Technology
INSERT INTO questions (question_text, category, difficulty) VALUES
('What does HTML stand for?', 'Technology', 'Easy');
SET @q8_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q8_id, 'Hypertext Markup Language', TRUE),
(@q8_id, 'High Tech Modern Language', FALSE),
(@q8_id, 'Home Tool Markup Language', FALSE),
(@q8_id, 'Hyperlinks and Text Markup Language', FALSE);

-- Q9: Sports
INSERT INTO questions (question_text, category, difficulty) VALUES
('How many players are there in a basketball team on the court?', 'Sports', 'Easy');
SET @q9_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q9_id, '5', TRUE),
(@q9_id, '6', FALSE),
(@q9_id, '7', FALSE),
(@q9_id, '4', FALSE);

-- Q10: General Knowledge
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the chemical formula for water?', 'Science', 'Easy');
SET @q10_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q10_id, 'H2O', TRUE),
(@q10_id, 'CO2', FALSE),
(@q10_id, 'NaCl', FALSE),
(@q10_id, 'O2', FALSE);

-- Q11: History
INSERT INTO questions (question_text, category, difficulty) VALUES
('Who was the first President of the United States?', 'History', 'Easy');
SET @q11_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q11_id, 'George Washington', TRUE),
(@q11_id, 'Thomas Jefferson', FALSE),
(@q11_id, 'John Adams', FALSE),
(@q11_id, 'Benjamin Franklin', FALSE);

-- Q12: Geography
INSERT INTO questions (question_text, category, difficulty) VALUES
('Which is the longest river in the world?', 'Geography', 'Medium');
SET @q12_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q12_id, 'Amazon', FALSE),
(@q12_id, 'Nile', TRUE),
(@q12_id, 'Yangtze', FALSE),
(@q12_id, 'Mississippi', FALSE);

-- Q13: Science
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the most abundant gas in Earth atmosphere?', 'Science', 'Medium');
SET @q13_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q13_id, 'Oxygen', FALSE),
(@q13_id, 'Carbon Dioxide', FALSE),
(@q13_id, 'Nitrogen', TRUE),
(@q13_id, 'Hydrogen', FALSE);

-- Q14: Mathematics
INSERT INTO questions (question_text, category, difficulty) VALUES
('What is the value of Pi approximately?', 'Mathematics', 'Easy');
SET @q14_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q14_id, '2.14', FALSE),
(@q14_id, '3.14', TRUE),
(@q14_id, '4.14', FALSE),
(@q14_id, '1.14', FALSE);

-- Q15: Technology
INSERT INTO questions (question_text, category, difficulty) VALUES
('What does CPU stand for?', 'Technology', 'Easy');
SET @q15_id = LAST_INSERT_ID();

INSERT INTO options (question_id, option_text, correct_answer) VALUES
(@q15_id, 'Central Processing Unit', TRUE),
(@q15_id, 'Central Program Utility', FALSE),
(@q15_id, 'Computer Personal Unit', FALSE),
(@q15_id, 'Central Processor Utility', FALSE);
