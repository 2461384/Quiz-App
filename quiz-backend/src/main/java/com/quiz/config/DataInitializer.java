package com.quiz.config;
import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.repository.QuestionRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

        private final QuestionRepository questionRepository;

        public DataInitializer(QuestionRepository questionRepository) {
                this.questionRepository = questionRepository;
        }

        @Override
        public void run(ApplicationArguments args) {
                if (questionRepository.count() >= 10) {
                        return;
                }

                List<Question> questions = new ArrayList<>();

                Question q1 = new Question(null, "What is the capital of France?", "General Knowledge", "Easy", null);
                q1.setOptions(Arrays.asList(
                                createOption(q1, "London", false),
                                createOption(q1, "Paris", true),
                                createOption(q1, "Berlin", false),
                                createOption(q1, "Madrid", false)));
                questions.add(q1);

                Question q2 = new Question(null, "What is the largest planet in our solar system?", "General Knowledge",
                                "Easy", null);
                q2.setOptions(Arrays.asList(
                                createOption(q2, "Saturn", false),
                                createOption(q2, "Jupiter", true),
                                createOption(q2, "Venus", false),
                                createOption(q2, "Neptune", false)));
                questions.add(q2);

                Question q3 = new Question(null, "What is the chemical symbol for Gold?", "Science", "Easy", null);
                q3.setOptions(Arrays.asList(
                                createOption(q3, "Au", true),
                                createOption(q3, "Ag", false),
                                createOption(q3, "Al", false),
                                createOption(q3, "Fe", false)));
                questions.add(q3);

                Question q4 = new Question(null, "In which year did World War II end?", "History", "Medium", null);
                q4.setOptions(Arrays.asList(
                                createOption(q4, "1943", false),
                                createOption(q4, "1944", false),
                                createOption(q4, "1945", true),
                                createOption(q4, "1946", false)));
                questions.add(q4);

                Question q5 = new Question(null, "Which is the smallest country in the world?", "Geography", "Easy",
                                null);
                q5.setOptions(Arrays.asList(
                                createOption(q5, "Monaco", false),
                                createOption(q5, "Vatican City", true),
                                createOption(q5, "Liechtenstein", false),
                                createOption(q5, "San Marino", false)));
                questions.add(q5);

                Question q6 = new Question(null, "What is the speed of light?", "Science", "Medium", null);
                q6.setOptions(Arrays.asList(
                                createOption(q6, "300,000 km/s", true),
                                createOption(q6, "150,000 km/s", false),
                                createOption(q6, "450,000 km/s", false),
                                createOption(q6, "200,000 km/s", false)));
                questions.add(q6);

                Question q7 = new Question(null, "Who wrote Romeo and Juliet?", "Literature", "Easy", null);
                q7.setOptions(Arrays.asList(
                                createOption(q7, "William Shakespeare", true),
                                createOption(q7, "Jane Austen", false),
                                createOption(q7, "Charles Dickens", false),
                                createOption(q7, "George Orwell", false)));
                questions.add(q7);

                Question q8 = new Question(null, "What does HTML stand for?", "Technology", "Easy", null);
                q8.setOptions(Arrays.asList(
                                createOption(q8, "Hypertext Markup Language", true),
                                createOption(q8, "High Tech Modern Language", false),
                                createOption(q8, "Home Tool Markup Language", false),
                                createOption(q8, "Hyperlinks and Text Markup Language", false)));
                questions.add(q8);

                Question q9 = new Question(null, "How many players are there in a basketball team on the court?",
                                "Sports", "Easy", null);
                q9.setOptions(Arrays.asList(
                                createOption(q9, "5", true),
                                createOption(q9, "6", false),
                                createOption(q9, "7", false),
                                createOption(q9, "4", false)));
                questions.add(q9);

                Question q10 = new Question(null, "What is the chemical formula for water?", "Science", "Easy", null);
                q10.setOptions(Arrays.asList(
                                createOption(q10, "H2O", true),
                                createOption(q10, "CO2", false),
                                createOption(q10, "NaCl", false),
                                createOption(q10, "O2", false)));
                questions.add(q10);

                Question q11 = new Question(null, "Which keyword is used to inherit a class in Java?", "Java Basics",
                                "Easy",
                                null);
                q11.setOptions(Arrays.asList(
                                createOption(q11, "extends", true),
                                createOption(q11, "implements", false),
                                createOption(q11, "inherits", false),
                                createOption(q11, "super", false)));
                questions.add(q11);

                Question q12 = new Question(null, "Which keyword is used to define an interface in Java?",
                                "Java Basics",
                                "Easy", null);
                q12.setOptions(Arrays.asList(
                                createOption(q12, "interface", true),
                                createOption(q12, "implements", false),
                                createOption(q12, "abstract", false),
                                createOption(q12, "extends", false)));
                questions.add(q12);

                Question q13 = new Question(null, "Which keyword is used to create an object in Java?", "Java Basics",
                                "Easy",
                                null);
                q13.setOptions(Arrays.asList(
                                createOption(q13, "new", true),
                                createOption(q13, "create", false),
                                createOption(q13, "object", false),
                                createOption(q13, "instance", false)));
                questions.add(q13);

                Question q14 = new Question(null, "Which access modifier makes a member visible only within its class?",
                                "Java Basics", "Easy", null);
                q14.setOptions(Arrays.asList(
                                createOption(q14, "private", true),
                                createOption(q14, "public", false),
                                createOption(q14, "protected", false),
                                createOption(q14, "default", false)));
                questions.add(q14);

                Question q15 = new Question(null, "Which keyword is used to prevent inheritance in Java?",
                                "Java Basics",
                                "Medium", null);
                q15.setOptions(Arrays.asList(
                                createOption(q15, "final", true),
                                createOption(q15, "static", false),
                                createOption(q15, "abstract", false),
                                createOption(q15, "sealed", false)));
                questions.add(q15);

                Question q16 = new Question(null, "Which annotation is used to expose REST endpoints in Spring Boot?",
                                "Spring Boot", "Easy", null);
                q16.setOptions(Arrays.asList(
                                createOption(q16, "@RestController", true),
                                createOption(q16, "@Controller", false),
                                createOption(q16, "@Service", false),
                                createOption(q16, "@Repository", false)));
                questions.add(q16);

                Question q17 = new Question(null, "Which annotation is used to inject dependencies in Spring Boot?",
                                "Spring Boot", "Easy", null);
                q17.setOptions(Arrays.asList(
                                createOption(q17, "@Autowired", true),
                                createOption(q17, "@Inject", false),
                                createOption(q17, "@Resource", false),
                                createOption(q17, "@Bean", false)));
                questions.add(q17);

                Question q18 = new Question(null, "Which file is used to configure properties in Spring Boot?",
                                "Spring Boot",
                                "Easy", null);
                q18.setOptions(Arrays.asList(
                                createOption(q18, "application.properties", true),
                                createOption(q18, "config.xml", false),
                                createOption(q18, "settings.json", false),
                                createOption(q18, "boot.yaml", false)));
                questions.add(q18);

                Question q19 = new Question(null, "Which annotation marks a class as a service in Spring Boot?",
                                "Spring Boot",
                                "Easy", null);
                q19.setOptions(Arrays.asList(
                                createOption(q19, "@Service", true),
                                createOption(q19, "@Component", false),
                                createOption(q19, "@Repository", false),
                                createOption(q19, "@Controller", false)));
                questions.add(q19);

                Question q20 = new Question(null, "Which annotation marks a class as a repository in Spring Boot?",
                                "Spring Boot", "Easy", null);
                q20.setOptions(Arrays.asList(
                                createOption(q20, "@Repository", true),
                                createOption(q20, "@Service", false),
                                createOption(q20, "@Component", false),
                                createOption(q20, "@Controller", false)));
                questions.add(q20);

                Question q21 = new Question(null, "Which annotation is used to map HTTP GET requests?", "Spring Boot",
                                "Easy",
                                null);
                q21.setOptions(Arrays.asList(
                                createOption(q21, "@GetMapping", true),
                                createOption(q21, "@PostMapping", false),
                                createOption(q21, "@PutMapping", false),
                                createOption(q21, "@DeleteMapping", false)));
                questions.add(q21);

                Question q22 = new Question(null, "Which annotation is used to map HTTP POST requests?", "Spring Boot",
                                "Easy",
                                null);
                q22.setOptions(Arrays.asList(
                                createOption(q22, "@PostMapping", true),
                                createOption(q22, "@GetMapping", false),
                                createOption(q22, "@PutMapping", false),
                                createOption(q22, "@DeleteMapping", false)));
                questions.add(q22);

                Question q23 = new Question(null, "Which annotation is used to define request mapping at class level?",
                                "Spring Boot", "Easy", null);
                q23.setOptions(Arrays.asList(
                                createOption(q23, "@RequestMapping", true),
                                createOption(q23, "@PathVariable", false),
                                createOption(q23, "@RequestParam", false),
                                createOption(q23, "@RestController", false)));
                questions.add(q23);

                Question q24 = new Question(null, "Which annotation is used to define beans in Spring Boot?",
                                "Spring Boot",
                                "Medium", null);
                q24.setOptions(Arrays.asList(
                                createOption(q24, "@Bean", true),
                                createOption(q24, "@Autowired", false),
                                createOption(q24, "@Component", false),
                                createOption(q24, "@Configuration", false)));
                questions.add(q24);

                Question q25 = new Question(null, "Which annotation is used to mark configuration classes?",
                                "Spring Boot",
                                "Medium", null);
                q25.setOptions(Arrays.asList(
                                createOption(q25, "@Configuration", true),
                                createOption(q25, "@Component", false),
                                createOption(q25, "@Service", false),
                                createOption(q25, "@Repository", false)));
                questions.add(q25);

                Question q26 = new Question(null, "Which hook is used to perform side effects in React?",
                                "React Basics",
                                "Easy", null);
                q26.setOptions(Arrays.asList(
                                createOption(q26, "useEffect", true),
                                createOption(q26, "useState", false),
                                createOption(q26, "useMemo", false),
                                createOption(q26, "useRef", false)));
                questions.add(q26);

                Question q27 = new Question(null, "What does JSX stand for?", "React Basics", "Easy", null);
                q27.setOptions(Arrays.asList(
                                createOption(q27, "JavaScript XML", true),
                                createOption(q27, "Java Syntax Extension", false),
                                createOption(q27, "JavaScript Extension", false),
                                createOption(q27, "JSON XML", false)));
                questions.add(q27);

                Question q28 = new Question(null, "Props in React are?", "React Basics", "Easy", null);
                q28.setOptions(Arrays.asList(
                                createOption(q28, "Immutable", true),
                                createOption(q28, "Mutable", false),
                                createOption(q28, "Functions", false),
                                createOption(q28, "Hooks", false)));
                questions.add(q28);

                Question q29 = new Question(null, "State in React is?", "React Basics", "Easy", null);
                q29.setOptions(Arrays.asList(
                                createOption(q29, "Mutable", true),
                                createOption(q29, "Immutable", false),
                                createOption(q29, "Static", false),
                                createOption(q29, "Constant", false)));
                questions.add(q29);

                Question q30 = new Question(null, "Which concept allows React to update only changed parts of the DOM?",
                                "React Basics", "Medium", null);
                q30.setOptions(Arrays.asList(
                                createOption(q30, "Virtual DOM", true),
                                createOption(q30, "Real DOM", false),
                                createOption(q30, "Shadow DOM", false),
                                createOption(q30, "HTML DOM", false)));
                questions.add(q30);

                Question q31 = new Question(null, "Which library is used for routing in React?", "React Basics", "Easy",
                                null);
                q31.setOptions(Arrays.asList(
                                createOption(q31, "React Router", true),
                                createOption(q31, "Redux", false),
                                createOption(q31, "Axios", false),
                                createOption(q31, "MobX", false)));
                questions.add(q31);

                Question q32 = new Question(null, "Controlled components in React are?", "React Basics", "Medium",
                                null);
                q32.setOptions(Arrays.asList(
                                createOption(q32, "Components controlled by state", true),
                                createOption(q32, "Components controlled by props only", false),
                                createOption(q32, "Components without state", false),
                                createOption(q32, "Components controlled by DOM", false)));
                questions.add(q32);

                Question q33 = new Question(null, "Which hook is used to access context in React?", "React Basics",
                                "Medium",
                                null);
                q33.setOptions(Arrays.asList(
                                createOption(q33, "useContext", true),
                                createOption(q33, "useState", false),
                                createOption(q33, "useEffect", false),
                                createOption(q33, "useReducer", false)));
                questions.add(q33);

                Question q34 = new Question(null, "Which hook is used to persist values across renders?",
                                "React Basics",
                                "Medium", null);
                q34.setOptions(Arrays.asList(
                                createOption(q34, "useRef", true),
                                createOption(q34, "useState", false),
                                createOption(q34, "useEffect", false),
                                createOption(q34, "useMemo", false)));
                questions.add(q34);

                Question q35 = new Question(null,
                                "Which hook is used for performance optimization by memoizing values?",
                                "React Basics", "Medium", null);
                q35.setOptions(Arrays.asList(
                                createOption(q35, "useMemo", true),
                                createOption(q35, "useEffect", false),
                                createOption(q35, "useState", false),
                                createOption(q35, "useRef", false)));
                questions.add(q35);

                Question q36 = new Question(null, "Which HTTP method is used to delete resources?", "REST API", "Easy",
                                null);
                q36.setOptions(Arrays.asList(
                                createOption(q36, "DELETE", true),
                                createOption(q36, "POST", false),
                                createOption(q36, "PUT", false),
                                createOption(q36, "GET", false)));
                questions.add(q36);

                Question q37 = new Question(null, "Which HTTP status code means 'OK'?", "REST API", "Easy", null);
                q37.setOptions(Arrays.asList(
                                createOption(q37, "200", true),
                                createOption(q37, "201", false),
                                createOption(q37, "404", false),
                                createOption(q37, "500", false)));
                questions.add(q37);

                Question q38 = new Question(null, "Which HTTP status code means 'Created'?", "REST API", "Easy", null);
                q38.setOptions(Arrays.asList(
                                createOption(q38, "201", true),
                                createOption(q38, "200", false),
                                createOption(q38, "404", false),
                                createOption(q38, "403", false)));
                questions.add(q38);

                Question q39 = new Question(null, "Which format is commonly used for REST API responses?", "REST API",
                                "Easy",
                                null);
                q39.setOptions(Arrays.asList(
                                createOption(q39, "JSON", true),
                                createOption(q39, "XML", false),
                                createOption(q39, "CSV", false),
                                createOption(q39, "HTML", false)));
                questions.add(q39);

                Question q40 = new Question(null, "What does CORS stand for?", "Fullstack Integration", "Medium", null);
                q40.setOptions(Arrays.asList(
                                createOption(q40, "Cross-Origin Resource Sharing", true),
                                createOption(q40, "Cross-Origin Request Service", false),
                                createOption(q40, "Client-Origin Resource Sharing", false),
                                createOption(q40, "Cross-Origin Routing System", false)));
                questions.add(q40);

                Question q41 = new Question(null, "Which tool is commonly used to test REST APIs?", "REST API", "Easy",
                                null);
                q41.setOptions(Arrays.asList(
                                createOption(q41, "Postman", true),
                                createOption(q41, "Eclipse", false),
                                createOption(q41, "VS Code", false),
                                createOption(q41, "Maven", false)));
                questions.add(q41);

                Question q42 = new Question(null, "Which principle is NOT part of REST?", "REST API", "Medium", null);
                q42.setOptions(Arrays.asList(
                                createOption(q42, "Statelessness", false),
                                createOption(q42, "Cacheable", false),
                                createOption(q42, "Client-Server", false),
                                createOption(q42, "Stateful sessions", true)));
                questions.add(q42);

                Question q43 = new Question(null, "Which CRUD operation corresponds to HTTP POST?", "REST API", "Easy",
                                null);
                q43.setOptions(Arrays.asList(
                                createOption(q43, "Create", true),
                                createOption(q43, "Read", false),
                                createOption(q43, "Update", false),
                                createOption(q43, "Delete", false)));
                questions.add(q43);

                Question q44 = new Question(null,
                                "Which class in Spring Boot is commonly used to build HTTP responses?",
                                "Fullstack Integration", "Medium", null);
                q44.setOptions(Arrays.asList(
                                createOption(q44, "ResponseEntity", true),
                                createOption(q44, "HttpResponse", false),
                                createOption(q44, "ResponseObject", false),
                                createOption(q44, "ResponseBuilder", false)));
                questions.add(q44);

                Question q45 = new Question(null, "Which annotation is used to bind query parameters in Spring Boot?",
                                "Fullstack Integration", "Medium", null);
                q45.setOptions(Arrays.asList(
                                createOption(q45, "@RequestParam", true),
                                createOption(q45, "@PathVariable", false),
                                createOption(q45, "@QueryParam", false),
                                createOption(q45, "@Param", false)));
                questions.add(q45);

                Question q46 = new Question(null, "Which annotation is used to mark a JPA entity?", "Database", "Easy",
                                null);
                q46.setOptions(Arrays.asList(
                                createOption(q46, "@Entity", true),
                                createOption(q46, "@Table", false),
                                createOption(q46, "@Column", false),
                                createOption(q46, "@Id", false)));
                questions.add(q46);

                Question q47 = new Question(null, "Which annotation is used to define a primary key in JPA?",
                                "Database",
                                "Easy", null);
                q47.setOptions(Arrays.asList(
                                createOption(q47, "@Id", true),
                                createOption(q47, "@PrimaryKey", false),
                                createOption(q47, "@GeneratedValue", false),
                                createOption(q47, "@Key", false)));
                questions.add(q47);

                Question q48 = new Question(null, "Which annotation is used to auto-generate primary key values?",
                                "Database",
                                "Easy", null);
                q48.setOptions(Arrays.asList(
                                createOption(q48, "@GeneratedValue", true),
                                createOption(q48, "@AutoIncrement", false),
                                createOption(q48, "@Sequence", false),
                                createOption(q48, "@Identity", false)));
                questions.add(q48);

                Question q49 = new Question(null, "Which annotation defines a one-to-many relationship in JPA?",
                                "Database",
                                "Medium", null);
                q49.setOptions(Arrays.asList(
                                createOption(q49, "@OneToMany", true),
                                createOption(q49, "@ManyToOne", false),
                                createOption(q49, "@ManyToMany", false),
                                createOption(q49, "@JoinColumn", false)));
                questions.add(q49);

                Question q50 = new Question(null, "Which annotation defines a many-to-one relationship in JPA?",
                                "Database",
                                "Medium", null);
                q50.setOptions(Arrays.asList(
                                createOption(q50, "@ManyToOne", true),
                                createOption(q50, "@OneToMany", false),
                                createOption(q50, "@OneToOne", false),
                                createOption(q50, "@JoinTable", false)));
                questions.add(q50);

                questionRepository.saveAll(questions);
        }

        private Option createOption(Question question, String text, boolean correct) {
                Option option = new Option();
                option.setQuestion(question);
                option.setOptionText(text);
                option.setCorrectAnswer(correct);
                return option;
        }
}