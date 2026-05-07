package com.quiz.controller;

import com.quiz.dto.QuizScoreDTO;
import com.quiz.entity.QuizScore;
import com.quiz.service.QuizScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizScoreController {

    @Autowired
    private QuizScoreService quizScoreService;

    @PostMapping
    public ResponseEntity<QuizScoreDTO> saveScore(@RequestBody QuizScore quizScore) {
        QuizScoreDTO savedScore = quizScoreService.saveScore(quizScore);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
    }


    @GetMapping("/user/{userName}")
    public ResponseEntity<List<QuizScoreDTO>> getScoresByUserName(@PathVariable String userName) {
        List<QuizScoreDTO> scores = quizScoreService.getScoresByUserName(userName);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/top")
    public ResponseEntity<List<QuizScoreDTO>> getTopScores(
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<QuizScoreDTO> scores = quizScoreService.getTopScores(limit);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/recent/{userName}")
    public ResponseEntity<List<QuizScoreDTO>> getRecentScores(@PathVariable String userName) {
        List<QuizScoreDTO> scores = quizScoreService.getRecentScores(userName);
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<QuizScoreDTO>> getLeaderboard() {
        List<QuizScoreDTO> leaderboard = quizScoreService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }
    
    @GetMapping("/check/{userName}")
    public ResponseEntity<Boolean> checkUserAttempted(@PathVariable String userName) {
        boolean attempted = quizScoreService.hasUserAttemptedQuiz(userName);
        return ResponseEntity.ok(attempted);
    }
}
