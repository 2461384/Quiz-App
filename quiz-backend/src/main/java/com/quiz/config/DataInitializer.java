package com.quiz.config;

import com.quiz.config.seeds.*;
import com.quiz.entity.Option;
import com.quiz.entity.Question;
import com.quiz.repository.QuestionRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Seeds the question bank on startup.
 *
 * Three batches run in order; every insert is guarded by
 * {@code questionRepository.existsByQuestionText(...)}, so re-runs are
 * idempotent and never create duplicates.
 *
 *   1. seedInitialBatch()  - the original 50 quiz questions (Q1..Q50).
 *   2. seedExtraQuestions() - additional curated questions per category.
 *   3. seedBulkQuestions()  - calls each per-category seeder under com.quiz.config.seeds.
 */
@Component
public class DataInitializer implements ApplicationRunner {

    private final QuestionRepository questionRepository;

    public DataInitializer(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        seedInitialBatch();
        seedExtraQuestions();
        seedBulkQuestions();
    }

    // ------------------------------------------------------------------
    //  Batch 1: original 50 questions (Q1..Q50)
    // ------------------------------------------------------------------
    private void seedInitialBatch() {

        // ----- General Knowledge -----
        // Question 1
        addQ("What is the capital of France?", "General Knowledge", "Easy",
                "Paris", "London", "Berlin", "Madrid");
        // Question 2
        addQ("What is the largest planet in our solar system?", "General Knowledge", "Easy",
                "Jupiter", "Saturn", "Venus", "Neptune");

        // ----- Science -----
        // Question 3
        addQ("What is the chemical symbol for Gold?", "Science", "Easy",
                "Au", "Ag", "Al", "Fe");
        // Question 4
        addQ("In which year did World War II end?", "History", "Medium",
                "1945", "1943", "1944", "1946");
        // Question 5
        addQ("Which is the smallest country in the world?", "Geography", "Easy",
                "Vatican City", "Monaco", "Liechtenstein", "San Marino");
        // Question 6
        addQ("What is the speed of light?", "Science", "Medium",
                "300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s");
        // Question 7
        addQ("Who wrote Romeo and Juliet?", "Literature", "Easy",
                "William Shakespeare", "Jane Austen", "Charles Dickens", "George Orwell");
        // Question 8
        addQ("What does HTML stand for?", "Technology", "Easy",
                "Hypertext Markup Language", "High Tech Modern Language",
                "Home Tool Markup Language", "Hyperlinks and Text Markup Language");
        // Question 9
        addQ("How many players are there in a basketball team on the court?", "Sports", "Easy",
                "5", "6", "7", "4");
        // Question 10
        addQ("What is the chemical formula for water?", "Science", "Easy",
                "H2O", "CO2", "NaCl", "O2");

        // ----- Java Basics -----
        // Question 11
        addQ("Which keyword is used to inherit a class in Java?", "Java Basics", "Easy",
                "extends", "implements", "inherits", "super");
        // Question 12
        addQ("Which keyword is used to define an interface in Java?", "Java Basics", "Easy",
                "interface", "implements", "abstract", "extends");
        // Question 13
        addQ("Which keyword is used to create an object in Java?", "Java Basics", "Easy",
                "new", "create", "object", "instance");
        // Question 14
        addQ("Which access modifier makes a member visible only within its class?", "Java Basics", "Easy",
                "private", "public", "protected", "default");
        // Question 15
        addQ("Which keyword is used to prevent inheritance in Java?", "Java Basics", "Medium",
                "final", "static", "abstract", "sealed");

        // ----- Spring Boot -----
        // Question 16
        addQ("Which annotation is used to expose REST endpoints in Spring Boot?", "Spring Boot", "Easy",
                "@RestController", "@Controller", "@Service", "@Repository");
        // Question 17
        addQ("Which annotation is used to inject dependencies in Spring Boot?", "Spring Boot", "Easy",
                "@Autowired", "@Inject", "@Resource", "@Bean");
        // Question 18
        addQ("Which file is used to configure properties in Spring Boot?", "Spring Boot", "Easy",
                "application.properties", "config.xml", "settings.json", "boot.yaml");
        // Question 19
        addQ("Which annotation marks a class as a service in Spring Boot?", "Spring Boot", "Easy",
                "@Service", "@Component", "@Repository", "@Controller");
        // Question 20
        addQ("Which annotation marks a class as a repository in Spring Boot?", "Spring Boot", "Easy",
                "@Repository", "@Service", "@Component", "@Controller");
        // Question 21
        addQ("Which annotation is used to map HTTP GET requests?", "Spring Boot", "Easy",
                "@GetMapping", "@PostMapping", "@PutMapping", "@DeleteMapping");
        // Question 22
        addQ("Which annotation is used to map HTTP POST requests?", "Spring Boot", "Easy",
                "@PostMapping", "@GetMapping", "@PutMapping", "@DeleteMapping");
        // Question 23
        addQ("Which annotation is used to define request mapping at class level?", "Spring Boot", "Easy",
                "@RequestMapping", "@PathVariable", "@RequestParam", "@RestController");
        // Question 24
        addQ("Which annotation is used to define beans in Spring Boot?", "Spring Boot", "Medium",
                "@Bean", "@Autowired", "@Component", "@Configuration");
        // Question 25
        addQ("Which annotation is used to mark configuration classes?", "Spring Boot", "Medium",
                "@Configuration", "@Component", "@Service", "@Repository");

        // ----- React Basics -----
        // Question 26
        addQ("Which hook is used to perform side effects in React?", "React Basics", "Easy",
                "useEffect", "useState", "useMemo", "useRef");
        // Question 27
        addQ("What does JSX stand for?", "React Basics", "Easy",
                "JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML");
        // Question 28
        addQ("Props in React are?", "React Basics", "Easy",
                "Immutable", "Mutable", "Functions", "Hooks");
        // Question 29
        addQ("State in React is?", "React Basics", "Easy",
                "Mutable", "Immutable", "Static", "Constant");
        // Question 30
        addQ("Which concept allows React to update only changed parts of the DOM?", "React Basics", "Medium",
                "Virtual DOM", "Real DOM", "Shadow DOM", "HTML DOM");
        // Question 31
        addQ("Which library is used for routing in React?", "React Basics", "Easy",
                "React Router", "Redux", "Axios", "MobX");
        // Question 32
        addQ("Controlled components in React are?", "React Basics", "Medium",
                "Components controlled by state", "Components controlled by props only",
                "Components without state", "Components controlled by DOM");
        // Question 33
        addQ("Which hook is used to access context in React?", "React Basics", "Medium",
                "useContext", "useState", "useEffect", "useReducer");
        // Question 34
        addQ("Which hook is used to persist values across renders?", "React Basics", "Medium",
                "useRef", "useState", "useEffect", "useMemo");
        // Question 35
        addQ("Which hook is used for performance optimization by memoizing values?", "React Basics", "Medium",
                "useMemo", "useEffect", "useState", "useRef");

        // ----- REST API -----
        // Question 36
        addQ("Which HTTP method is used to delete resources?", "REST API", "Easy",
                "DELETE", "POST", "PUT", "GET");
        // Question 37
        addQ("Which HTTP status code means 'OK'?", "REST API", "Easy",
                "200", "201", "404", "500");
        // Question 38
        addQ("Which HTTP status code means 'Created'?", "REST API", "Easy",
                "201", "200", "404", "403");
        // Question 39
        addQ("Which format is commonly used for REST API responses?", "REST API", "Easy",
                "JSON", "XML", "CSV", "HTML");
        // Question 40
        addQ("What does CORS stand for?", "Fullstack Integration", "Medium",
                "Cross-Origin Resource Sharing", "Cross-Origin Request Service",
                "Client-Origin Resource Sharing", "Cross-Origin Routing System");
        // Question 41
        addQ("Which tool is commonly used to test REST APIs?", "REST API", "Easy",
                "Postman", "Eclipse", "VS Code", "Maven");
        // Question 42
        addQ("Which principle is NOT part of REST?", "REST API", "Medium",
                "Stateful sessions", "Statelessness", "Cacheable", "Client-Server");
        // Question 43
        addQ("Which CRUD operation corresponds to HTTP POST?", "REST API", "Easy",
                "Create", "Read", "Update", "Delete");
        // Question 44
        addQ("Which class in Spring Boot is commonly used to build HTTP responses?", "Fullstack Integration", "Medium",
                "ResponseEntity", "HttpResponse", "ResponseObject", "ResponseBuilder");
        // Question 45
        addQ("Which annotation is used to bind query parameters in Spring Boot?", "Fullstack Integration", "Medium",
                "@RequestParam", "@PathVariable", "@QueryParam", "@Param");

        // ----- Database -----
        // Question 46
        addQ("Which annotation is used to mark a JPA entity?", "Database", "Easy",
                "@Entity", "@Table", "@Column", "@Id");
        // Question 47
        addQ("Which annotation is used to define a primary key in JPA?", "Database", "Easy",
                "@Id", "@PrimaryKey", "@GeneratedValue", "@Key");
        // Question 48
        addQ("Which annotation is used to auto-generate primary key values?", "Database", "Easy",
                "@GeneratedValue", "@AutoIncrement", "@Sequence", "@Identity");
        // Question 49
        addQ("Which annotation defines a one-to-many relationship in JPA?", "Database", "Medium",
                "@OneToMany", "@ManyToOne", "@ManyToMany", "@JoinColumn");
        // Question 50
        addQ("Which annotation defines a many-to-one relationship in JPA?", "Database", "Medium",
                "@ManyToOne", "@OneToMany", "@OneToOne", "@JoinTable");
    }

    // ------------------------------------------------------------------
    //  Batch 2: extra questions added per category
    // ------------------------------------------------------------------
    private void seedExtraQuestions() {

        // ===== General Knowledge =====
        addQ("How many days are there in a leap year?", "General Knowledge", "Easy",
                "366", "365", "364", "367");
        addQ("How many continents are there on Earth?", "General Knowledge", "Medium",
                "7", "5", "6", "8");
        addQ("Which is the largest ocean on Earth?", "General Knowledge", "Medium",
                "Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean");
        addQ("Which gas do plants primarily absorb from the atmosphere?", "General Knowledge", "Medium",
                "Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen");
        addQ("Which is the deepest oceanic trench in the world?", "General Knowledge", "Hard",
                "Mariana Trench", "Tonga Trench", "Java Trench", "Puerto Rico Trench");
        addQ("Who painted the Mona Lisa?", "General Knowledge", "Hard",
                "Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo");
        addQ("Which is considered the rarest blood type?", "General Knowledge", "Hard",
                "AB negative", "O negative", "B negative", "A negative");

        // ===== Science =====
        addQ("What is the powerhouse of the cell?", "Science", "Medium",
                "Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus");
        addQ("What is the pH of pure water at room temperature?", "Science", "Medium",
                "7", "0", "14", "1");
        addQ("Who discovered penicillin?", "Science", "Hard",
                "Alexander Fleming", "Marie Curie", "Louis Pasteur", "Isaac Newton");
        addQ("What is the SI unit of electrical resistance?", "Science", "Hard",
                "Ohm", "Volt", "Ampere", "Watt");
        addQ("Which subatomic particle has no electric charge?", "Science", "Hard",
                "Neutron", "Proton", "Electron", "Positron");

        // ===== History =====
        addQ("Who was the first President of the United States?", "History", "Easy",
                "George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams");
        addQ("In which year did India gain independence?", "History", "Easy",
                "1947", "1945", "1950", "1942");
        addQ("Who was famously known as the 'Iron Lady'?", "History", "Easy",
                "Margaret Thatcher", "Indira Gandhi", "Angela Merkel", "Hillary Clinton");
        addQ("Who is credited with discovering the Americas in 1492?", "History", "Medium",
                "Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook");
        addQ("In which year did the Berlin Wall fall?", "History", "Medium",
                "1989", "1991", "1985", "1979");
        addQ("Which empire was ruled by Genghis Khan?", "History", "Hard",
                "Mongol Empire", "Ottoman Empire", "Roman Empire", "Persian Empire");
        addQ("In which year did the Russian Revolution occur?", "History", "Hard",
                "1917", "1905", "1922", "1914");
        addQ("Who was the longest-reigning British monarch before Queen Elizabeth II?", "History", "Hard",
                "Queen Victoria", "King George III", "King Henry VIII", "Queen Anne");

        // ===== Geography =====
        addQ("What is the longest river in the world?", "Geography", "Easy",
                "Nile", "Amazon", "Yangtze", "Mississippi");
        addQ("Which is the largest hot desert in the world?", "Geography", "Easy",
                "Sahara", "Gobi", "Kalahari", "Arabian");
        addQ("What is the capital of Australia?", "Geography", "Medium",
                "Canberra", "Sydney", "Melbourne", "Perth");
        addQ("Which mountain range traditionally separates Europe and Asia?", "Geography", "Medium",
                "Ural Mountains", "Alps", "Himalayas", "Caucasus");
        addQ("Which is the smallest continent by area?", "Geography", "Medium",
                "Australia", "Europe", "Antarctica", "South America");
        addQ("Which African country was never formally colonized by a European power?", "Geography", "Hard",
                "Ethiopia", "Egypt", "Nigeria", "Kenya");
        addQ("What is the official language of Brazil?", "Geography", "Hard",
                "Portuguese", "Spanish", "English", "French");
        addQ("Which body of water is the saltiest in the world?", "Geography", "Hard",
                "Dead Sea", "Red Sea", "Caspian Sea", "Mediterranean Sea");

        // ===== Literature =====
        addQ("Who wrote the play 'Hamlet'?", "Literature", "Easy",
                "William Shakespeare", "Christopher Marlowe", "Ben Jonson", "John Webster");
        addQ("Who wrote the dystopian novel '1984'?", "Literature", "Easy",
                "George Orwell", "Aldous Huxley", "Ray Bradbury", "Margaret Atwood");
        addQ("Who wrote 'Pride and Prejudice'?", "Literature", "Medium",
                "Jane Austen", "Emily Bronte", "Charlotte Bronte", "Virginia Woolf");
        addQ("What is the name of the wizarding school in the Harry Potter series?", "Literature", "Medium",
                "Hogwarts", "Durmstrang", "Beauxbatons", "Ilvermorny");
        addQ("Who wrote the epic novel 'War and Peace'?", "Literature", "Medium",
                "Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev");
        addQ("Who wrote 'One Hundred Years of Solitude'?", "Literature", "Hard",
                "Gabriel Garcia Marquez", "Mario Vargas Llosa", "Jorge Luis Borges", "Pablo Neruda");
        addQ("Who wrote 'The Divine Comedy'?", "Literature", "Hard",
                "Dante Alighieri", "Petrarch", "Boccaccio", "Virgil");
        addQ("Who wrote the novel 'Crime and Punishment'?", "Literature", "Hard",
                "Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Nikolai Gogol");

        // ===== Technology =====
        addQ("What does CSS stand for?", "Technology", "Easy",
                "Cascading Style Sheets", "Computer Style Sheets",
                "Creative Style System", "Colorful Style Sheets");
        addQ("What does CPU stand for?", "Technology", "Easy",
                "Central Processing Unit", "Computer Personal Unit",
                "Central Performance Utility", "Core Processing Utility");
        addQ("What does API stand for?", "Technology", "Medium",
                "Application Programming Interface", "Applied Programming Internet",
                "Application Process Interface", "Automated Processing Interface");
        addQ("Which company originally developed the Java programming language?", "Technology", "Medium",
                "Sun Microsystems", "Oracle Corporation", "IBM", "Microsoft");
        addQ("What does SQL stand for?", "Technology", "Medium",
                "Structured Query Language", "Simple Query Language",
                "Sequential Query List", "Standard Question Language");
        addQ("What was the first commercially produced electronic general-purpose computer?", "Technology", "Hard",
                "UNIVAC I", "ENIAC", "IBM 701", "Colossus");
        addQ("What does DNS stand for?", "Technology", "Hard",
                "Domain Name System", "Dynamic Network Service",
                "Domain Network Server", "Distributed Naming Service");
        addQ("Who co-founded Microsoft along with Paul Allen?", "Technology", "Hard",
                "Bill Gates", "Steve Ballmer", "Steve Jobs", "Larry Page");

        // ===== Sports =====
        addQ("How many players are on the field per soccer (football) team?", "Sports", "Easy",
                "11", "10", "9", "12");
        addQ("How many rings are on the Olympic flag?", "Sports", "Easy",
                "5", "4", "6", "7");
        addQ("In which sport is the term 'love' used to mean a score of zero?", "Sports", "Medium",
                "Tennis", "Cricket", "Golf", "Badminton");
        addQ("What is the official distance of a marathon?", "Sports", "Medium",
                "42.195 km", "40 km", "50 km", "26 km");
        addQ("Which country won the 2018 FIFA World Cup?", "Sports", "Medium",
                "France", "Croatia", "Brazil", "Germany");
        addQ("Who holds the record for the most Olympic gold medals won by an individual?", "Sports", "Hard",
                "Michael Phelps", "Usain Bolt", "Mark Spitz", "Carl Lewis");
        addQ("Which boxer was widely known as 'The Greatest'?", "Sports", "Hard",
                "Muhammad Ali", "Mike Tyson", "Joe Frazier", "Sugar Ray Leonard");
        addQ("In which year were the first modern Olympic Games held?", "Sports", "Hard",
                "1896", "1900", "1888", "1924");

        // ===== Java =====
        addQ("Which method serves as the entry point of a Java application?", "Java", "Easy",
                "main", "start", "run", "init");
        addQ("What is the default value of a boolean field in Java?", "Java", "Easy",
                "false", "true", "0", "null");
        addQ("Which of the following is NOT a Java primitive type?", "Java", "Easy",
                "String", "int", "boolean", "double");
        addQ("Which Java collection allows duplicate elements and maintains insertion order?", "Java", "Medium",
                "ArrayList", "HashSet", "TreeSet", "HashMap");
        addQ("What does JVM stand for?", "Java", "Medium",
                "Java Virtual Machine", "Java Versatile Module",
                "Java Verified Mode", "Java Vendor Manager");
        addQ("Which exception is thrown when an integer is divided by zero in Java?", "Java", "Medium",
                "ArithmeticException", "NumberFormatException",
                "IllegalArgumentException", "NullPointerException");
        addQ("Which Java feature allows a class to implement multiple types?", "Java", "Hard",
                "Interfaces", "Abstract classes", "Inner classes", "Enums");
        addQ("Which method should be used to compare two String objects for value equality?", "Java", "Hard",
                ".equals()", "==", ".compareTo() == 0 only", ".matches()");
        addQ("What does the 'transient' keyword indicate about a field?", "Java", "Hard",
                "It should not be serialized", "It cannot be modified",
                "It is shared across instances", "It is thread-safe");

        // ===== Java Basics =====
        addQ("Which keyword starts a block that can catch exceptions?", "Java Basics", "Medium",
                "try", "catch", "throw", "throws");
        addQ("Which keyword refers to the current object instance inside an instance method?", "Java Basics", "Medium",
                "this", "self", "current", "instance");
        addQ("Which legacy collection class is synchronized by default?", "Java Basics", "Hard",
                "Vector", "ArrayList", "LinkedList", "HashMap");
        addQ("Which keyword invokes the parent class constructor from a subclass constructor?", "Java Basics", "Hard",
                "super", "this", "parent", "base");
        addQ("How many bits does a Java 'int' occupy?", "Java Basics", "Hard",
                "32", "16", "64", "8");

        // ===== Spring Boot =====
        addQ("Which annotation enables Spring Boot's auto-configuration mechanism?", "Spring Boot", "Medium",
                "@EnableAutoConfiguration", "@ComponentScan", "@SpringConfig", "@AutoBean");
        addQ("Which embedded servlet container is the default in Spring Boot starter web?", "Spring Boot", "Hard",
                "Tomcat", "Jetty", "Undertow", "Netty");
        addQ("Which annotation marks a class as a global REST exception handler?", "Spring Boot", "Hard",
                "@ControllerAdvice", "@ExceptionHandler", "@RestController", "@ErrorHandler");
        addQ("Which Spring Boot module provides production-ready monitoring endpoints?", "Spring Boot", "Hard",
                "Spring Boot Actuator", "Spring Boot DevTools",
                "Spring Boot Admin", "Spring Boot Metrics");

        // ===== React Basics =====
        addQ("What is React.Fragment used for?", "React Basics", "Hard",
                "Grouping children without adding extra DOM nodes",
                "Creating a portal to another DOM tree",
                "Caching expensive computations",
                "Lazy-loading components");
        addQ("Which lifecycle method runs immediately after a class component is mounted?", "React Basics", "Hard",
                "componentDidMount", "componentWillMount", "componentDidUpdate", "render");
        addQ("What is React's reconciliation process?", "React Basics", "Hard",
                "The diffing algorithm React uses to update the DOM efficiently",
                "The build process that bundles React code",
                "The hook lifecycle ordering",
                "The mechanism that synchronizes Redux state");

        // ===== REST API =====
        addQ("Which HTTP method is idempotent and used to fully replace a resource?", "REST API", "Medium",
                "PUT", "POST", "PATCH", "GET");
        addQ("Which HTTP status code typically indicates a successful resource creation?", "REST API", "Medium",
                "201", "200", "204", "202");
        addQ("What does HATEOAS stand for in REST?", "REST API", "Hard",
                "Hypermedia As The Engine Of Application State",
                "HTTP Authentication Token Engine On Async Sessions",
                "Hyperlink Architecture Transfer Engine Of API Standards",
                "High-Availability Transactional Endpoints Over Async Streams");
        addQ("Which HTTP status code indicates that the server understood the request but refuses to authorize it?", "REST API", "Hard",
                "403", "401", "400", "404");
        addQ("Which standard HTTP method is generally NOT idempotent?", "REST API", "Hard",
                "POST", "PUT", "DELETE", "GET");

        // ===== Fullstack Integration =====
        addQ("Which protocol provides the security layer used by HTTPS?", "Fullstack Integration", "Easy",
                "TLS", "FTP", "SMTP", "TCP");
        addQ("What does JSON stand for?", "Fullstack Integration", "Easy",
                "JavaScript Object Notation", "Java Standard Object Network",
                "JavaScript Online Notation", "Joined Standard Object Naming");
        addQ("Which HTTP header is conventionally used to send authentication tokens?", "Fullstack Integration", "Easy",
                "Authorization", "Auth-Token", "X-Token", "Credentials");
        addQ("Which authentication mechanism uses tokens that are signed with a secret or key pair?", "Fullstack Integration", "Hard",
                "JWT", "Basic Auth", "Cookie session", "OAuth refresh token");
        addQ("Which CORS response header must be set to allow the browser to send cookies on cross-origin requests?", "Fullstack Integration", "Hard",
                "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Methods", "Access-Control-Expose-Headers");
        addQ("Which client-side mechanism is most commonly used to maintain session state across HTTP requests?", "Fullstack Integration", "Hard",
                "Cookies", "URL rewriting", "Hidden form fields", "Local files");

        // ===== Database =====
        addQ("Which JPA annotation specifies the database table name for an entity?", "Database", "Medium",
                "@Table", "@Entity", "@Column", "@JoinTable");
        addQ("Which SQL clause is used to filter results based on aggregate functions?", "Database", "Hard",
                "HAVING", "WHERE", "GROUP BY", "ORDER BY");
        addQ("What is the default JPA fetch type for a @ManyToOne association?", "Database", "Hard",
                "EAGER", "LAZY", "AUTO", "JOIN");
        addQ("Which normal form eliminates partial dependencies on a composite primary key?", "Database", "Hard",
                "Second Normal Form (2NF)", "First Normal Form (1NF)",
                "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)");
    }

    // ------------------------------------------------------------------
    //  Batch 3: bulk seeding via per-category seeder classes
    // ------------------------------------------------------------------
    private void seedBulkQuestions() {
        QuestionAdder adder = this::addQ;

        GeneralKnowledgeSeeder.seed(adder);
        ScienceSeeder.seed(adder);
        HistorySeeder.seed(adder);
        GeographySeeder.seed(adder);
        LiteratureSeeder.seed(adder);
        TechnologySeeder.seed(adder);
        SportsSeeder.seed(adder);
        JavaSeeder.seed(adder);
        JavaBasicsSeeder.seed(adder);
        SpringBootSeeder.seed(adder);
        ReactBasicsSeeder.seed(adder);
        RestApiSeeder.seed(adder);
        FullstackIntegrationSeeder.seed(adder);
        DatabaseSeeder.seed(adder);
    }

    // ------------------------------------------------------------------
    //  Helpers
    // ------------------------------------------------------------------

    /**
     * Insert a question with one correct option and three wrong options.
     * Skipped silently if a question with the same text already exists,
     * making the whole seeding process idempotent across restarts.
     */
    private void addQ(String text, String category, String difficulty,
                      String correct, String w1, String w2, String w3) {
        if (questionRepository.existsByQuestionText(text)) {
            return;
        }
        Question q = new Question(null, text, category, difficulty, null);
        q.setOptions(Arrays.asList(
                createOption(q, correct, true),
                createOption(q, w1, false),
                createOption(q, w2, false),
                createOption(q, w3, false)));
        questionRepository.save(q);
    }

    private Option createOption(Question question, String text, boolean correct) {
        Option option = new Option();
        option.setQuestion(question);
        option.setOptionText(text);
        option.setCorrectAnswer(correct);
        return option;
    }
}
