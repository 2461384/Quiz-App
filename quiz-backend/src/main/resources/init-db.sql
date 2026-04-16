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
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Questions and Options

INSERT INTO questions (id, question_text) VALUES
(1, 'What is the capital of France?'),
(2, 'What is the largest planet in our solar system?'),
(3, 'What is the chemical symbol for Gold?'),
(4, 'In which year did World War II end?'),
(5, 'Which is the smallest country in the world?'),
(6, 'What is the speed of light?'),
(7, 'Who wrote Romeo and Juliet?'),
(8, 'What does HTML stand for?'),
(9, 'How many players are there in a basketball team on the court?'),
(10, 'What is the chemical formula for water?'),
(11, 'Which keyword is used to inherit a class in Java?'),
(12, 'Which keyword is used to define an interface in Java?'),
(13, 'Which keyword is used to create an object in Java?'),
(14, 'Which access modifier makes a member visible only within its class?'),
(15, 'Which keyword is used to prevent inheritance in Java?'),
(16, 'Which annotation is used to expose REST endpoints in Spring Boot?'),
(17, 'Which annotation is used to inject dependencies in Spring Boot?'),
(18, 'Which file is used to configure properties in Spring Boot?'),
(19, 'Which annotation marks a class as a service in Spring Boot?'),
(20, 'Which annotation marks a class as a repository in Spring Boot?'),
(21, 'Which annotation is used to map HTTP GET requests?'),
(22, 'Which annotation is used to map HTTP POST requests?'),
(23, 'Which annotation is used to define request mapping at class level?'),
(24, 'Which annotation is used to define beans in Spring Boot?'),
(25, 'Which annotation is used to mark configuration classes?'),
(26, 'Which hook is used to perform side effects in React?'),
(27, 'What does JSX stand for?'),
(28, 'Props in React are?'),
(29, 'State in React is?'),
(30, 'Which concept allows React to update only changed parts of the DOM?'),
(31, 'Which library is used for routing in React?'),
(32, 'Controlled components in React are?'),
(33, 'Which hook is used to access context in React?'),
(34, 'Which hook is used to persist values across renders?'),
(35, 'Which hook is used for performance optimization by memoizing values?'),
(36, 'Which HTTP method is used to delete resources?'),
(37, 'Which HTTP status code means OK?'),
(38, 'Which HTTP status code means Created?'),
(39, 'Which format is commonly used for REST API responses?'),
(40, 'What does CORS stand for?'),
(41, 'Which tool is commonly used to test REST APIs?'),
(42, 'Which principle is NOT part of REST?'),
(43, 'Which CRUD operation corresponds to HTTP POST?'),
(44, 'Which class in Spring Boot is commonly used to build HTTP responses?'),
(45, 'Which annotation is used to bind query parameters in Spring Boot?'),
(46, 'Which annotation is used to mark a JPA entity?'),
(47, 'Which annotation is used to define a primary key in JPA?'),
(48, 'Which annotation is used to auto-generate primary key values?'),
(49, 'Which annotation defines a one-to-many relationship in JPA?'),
(50, 'Which annotation defines a many-to-one relationship in JPA?');


INSERT IGNORE INTO options (question_id, option_text, correct_answer) VALUES
-- Q1
(1, 'London', FALSE), (1, 'Paris', TRUE), (1, 'Berlin', FALSE), (1, 'Madrid', FALSE),
-- Q2
(2, 'Saturn', FALSE), (2, 'Jupiter', TRUE), (2, 'Venus', FALSE), (2, 'Neptune', FALSE),
-- Q3
(3, 'Au', TRUE), (3, 'Ag', FALSE), (3, 'Al', FALSE), (3, 'Fe', FALSE),
-- Q4
(4, '1943', FALSE), (4, '1944', FALSE), (4, '1945', TRUE), (4, '1946', FALSE),
-- Q5
(5, 'Monaco', FALSE), (5, 'Vatican City', TRUE), (5, 'Liechtenstein', FALSE), (5, 'San Marino', FALSE),
-- Q6
(6, '300,000 km/s', TRUE), (6, '150,000 km/s', FALSE), (6, '450,000 km/s', FALSE), (6, '200,000 km/s', FALSE),
-- Q7
(7, 'William Shakespeare', TRUE), (7, 'Jane Austen', FALSE), (7, 'Charles Dickens', FALSE), (7, 'George Orwell', FALSE),
-- Q8
(8, 'Hypertext Markup Language', TRUE), (8, 'High Tech Modern Language', FALSE), (8, 'Home Tool Markup Language', FALSE), (8, 'Hyperlinks and Text Markup Language', FALSE),
-- Q9
(9, '5', TRUE), (9, '6', FALSE), (9, '7', FALSE), (9, '4', FALSE),
-- Q10
(10, 'H2O', TRUE), (10, 'CO2', FALSE), (10, 'NaCl', FALSE), (10, 'O2', FALSE),

-- Q11
(11, 'extends', TRUE), (11, 'implements', FALSE), (11, 'inherits', FALSE), (11, 'super', FALSE),
-- Q12
(12, 'interface', TRUE), (12, 'implements', FALSE), (12, 'abstract', FALSE), (12, 'extends', FALSE),
-- Q13
(13, 'new', TRUE), (13, 'create', FALSE), (13, 'object', FALSE), (13, 'instance', FALSE),
-- Q14
(14, 'private', TRUE), (14, 'public', FALSE), (14, 'protected', FALSE), (14, 'default', FALSE),
-- Q15
(15, 'final', TRUE), (15, 'static', FALSE), (15, 'abstract', FALSE), (15, 'sealed', FALSE),
-- Q16
(16, '@RestController', TRUE), (16, '@Controller', FALSE), (16, '@Service', FALSE), (16, '@Repository', FALSE),
-- Q17
(17, '@Autowired', TRUE), (17, '@Inject', FALSE), (17, '@Resource', FALSE), (17, '@Bean', FALSE),
-- Q18
(18, 'application.properties', TRUE), (18, 'config.xml', FALSE), (18, 'settings.json', FALSE), (18, 'boot.yaml', FALSE),
-- Q19
(19, '@Service', TRUE), (19, '@Component', FALSE), (19, '@Repository', FALSE), (19, '@Controller', FALSE),
-- Q20
(20, '@Repository', TRUE), (20, '@Service', FALSE), (20, '@Component', FALSE), (20, '@Controller', FALSE),
-- Q21
(21, '@GetMapping', TRUE), (21, '@PostMapping', FALSE), (21, '@PutMapping', FALSE), (21, '@DeleteMapping', FALSE),
-- Q22
(22, '@PostMapping', TRUE), (22, '@GetMapping', FALSE), (22, '@PutMapping', FALSE), (22, '@DeleteMapping', FALSE),
-- Q23
(23, '@RequestMapping', TRUE), (23, '@PathVariable', FALSE), (23, '@RequestParam', FALSE), (23, '@RestController', FALSE),
-- Q24
(24, '@Bean', TRUE), (24, '@Autowired', FALSE), (24, '@Component', FALSE), (24, '@Configuration', FALSE),
-- Q25
(25, '@Configuration', TRUE), (25, '@Component', FALSE), (25, '@Service', FALSE), (25, '@Repository', FALSE),
-- Q26
(26, 'useEffect', TRUE), (26, 'useState', FALSE), (26, 'useMemo', FALSE), (26, 'useRef', FALSE),
-- Q27
(27, 'JavaScript XML', TRUE), (27, 'Java Syntax Extension', FALSE), (27, 'JavaScript Extension', FALSE), (27, 'JSON XML', FALSE),
-- Q28
(28, 'Immutable', TRUE), (28, 'Mutable', FALSE), (28, 'Functions', FALSE), (28, 'Hooks', FALSE),
-- Q29
(29, 'Mutable', TRUE), (29, 'Immutable', FALSE), (29, 'Static', FALSE), (29, 'Constant', FALSE),
-- Q30
(30, 'Virtual DOM', TRUE), (30, 'Real DOM', FALSE), (30, 'Shadow DOM', FALSE), (30, 'HTML DOM', FALSE),
-- Q31
(31, 'React Router', TRUE), (31, 'Redux', FALSE), (31, 'Axios', FALSE), (31, 'MobX', FALSE),
-- Q32
(32, 'Components controlled by state', TRUE), (32, 'Components controlled by props only', FALSE), (32, 'Components without state', FALSE), (32, 'Components controlled by DOM', FALSE),
-- Q33
(33, 'useContext', TRUE), (33, 'useState', FALSE), (33, 'useEffect', FALSE), (33, 'useReducer', FALSE),
-- Q34
(34, 'useRef', TRUE), (34, 'useState', FALSE), (34, 'useEffect', FALSE), (34, 'useMemo', FALSE),
-- Q35
(35, 'useMemo', TRUE), (35, 'useEffect', FALSE), (35, 'useState', FALSE), (35, 'useRef', FALSE),
-- Q36
(36, 'DELETE', TRUE), (36, 'POST', FALSE), (36, 'PUT', FALSE), (36, 'GET', FALSE),
-- Q37
(37, '200', TRUE), (37, '201', FALSE), (37, '404', FALSE), (37, '500', FALSE),
-- Q38
(38, '201', TRUE), (38, '200', FALSE), (38, '404', FALSE), (38, '403', FALSE),
-- Q39
(39, 'JSON', TRUE), (39, 'XML', FALSE), (39, 'CSV', FALSE), (39, 'HTML', FALSE),
-- Q40
(40, 'Cross-Origin Resource Sharing', TRUE), (40, 'Cross-Origin Request Service', FALSE), (40, 'Client-Origin Resource Sharing', FALSE), (40, 'Cross-Origin Routing System', FALSE),
-- Q41
(41, 'Postman', TRUE), (41, 'Eclipse', FALSE), (41, 'VS Code', FALSE), (41, 'Maven', FALSE),
-- Q42
(42, 'Stateful sessions', TRUE), (42, 'Statelessness', FALSE), (42, 'Cacheable', FALSE), (42, 'Client-server', FALSE),
-- Q43
(43, 'Create', TRUE), (43, 'Read', FALSE), (43, 'Update', FALSE), (43, 'Delete', FALSE),
-- Q44
(44, 'ResponseEntity', TRUE), (44, 'HttpResponse', FALSE), (44, 'ResponseObject', FALSE), (44, 'ResponseBuilder', FALSE),
-- Q45
(45, '@RequestParam', TRUE), (45, '@PathVariable', FALSE), (45, '@QueryParam', FALSE), (45, '@Param', FALSE),
-- Q46
(46, '@Entity', TRUE), (46, '@Table', FALSE), (46, '@Column', FALSE), (46, '@Id', FALSE),
-- Q47
(47, '@Id', TRUE), (47, '@PrimaryKey', FALSE), (47, '@GeneratedValue', FALSE), (47, '@Key', FALSE),
-- Q48
(48, '@GeneratedValue', TRUE), (48, '@AutoIncrement', FALSE), (48, '@Sequence', FALSE), (48, '@Identity', FALSE),
-- Q49
(49, '@OneToMany', TRUE), (49, '@ManyToOne', FALSE), (49, '@ManyToMany', FALSE), (49, '@JoinColumn', FALSE),
-- Q50
(50, '@ManyToOne', TRUE), (50, '@OneToMany', FALSE), (50, '@OneToOne', FALSE), (50, '@JoinTable', FALSE);
