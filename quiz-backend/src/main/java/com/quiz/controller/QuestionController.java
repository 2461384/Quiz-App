package com.quiz.controller;
import com.quiz.dto.QuestionDTO;
import com.quiz.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Operation(summary = "Get all questions", description = "Fetch all questions from the database.")
    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        List<QuestionDTO> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @Operation(summary = "Get random questions", description = "Fetch a limited number of random unique questions, optionally filtered by category and/or difficulty.")
    @GetMapping("/random")
    public ResponseEntity<List<QuestionDTO>> getRandomQuestions(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty) {
        List<QuestionDTO> questions = questionService.getRandomQuestions(limit, category, difficulty);
        return ResponseEntity.ok(questions);
    }

    @Operation(summary = "Get available categories", description = "Fetch the distinct categories present in the question bank.")
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(questionService.getCategories());
    }

    @Operation(summary = "Get available difficulties", description = "Fetch the distinct difficulty levels present in the question bank.")
    @GetMapping("/difficulties")
    public ResponseEntity<List<String>> getDifficulties() {
        return ResponseEntity.ok(questionService.getDifficulties());
    }
 
    @Operation(summary = "Get question by ID", description = "Fetch a single question by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        QuestionDTO question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @Operation(summary = "Add a new question", description = "Create a new question with options.")
    @ApiResponse(responseCode = "201", description = "Question created successfully")
    @PostMapping
    public ResponseEntity<QuestionDTO> addQuestion(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO savedQuestion = questionService.addQuestionFromDTO(questionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    @Operation(summary = "Update a question", description = "Update an existing question by ID.")
    @ApiResponse(responseCode = "200", description = "Question updated successfully")
    @PutMapping("/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO updatedQuestion = questionService.updateQuestion(id, questionDTO);
        return ResponseEntity.ok(updatedQuestion);
    }

    @Operation(summary = "Delete a question", description = "Delete a question by its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Question deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Question not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
