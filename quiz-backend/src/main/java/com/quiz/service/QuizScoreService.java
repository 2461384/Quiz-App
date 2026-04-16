package com.quiz.service;

import com.quiz.dto.QuizScoreDTO;
import com.quiz.entity.QuizScore;
import com.quiz.repository.QuizScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizScoreService {

    @Autowired
    private QuizScoreRepository quizScoreRepository;

    public QuizScoreDTO saveScore(QuizScore quizScore) {
        List<QuizScore> existingScores = quizScoreRepository.findByUserName(quizScore.getUserName());
        if (!existingScores.isEmpty()) {
            throw new RuntimeException("User has already attempted the quiz. No retries allowed!");
        }
        
        if (quizScore.getTimestamp() == null) {
            quizScore.setTimestamp(LocalDateTime.now());
        }
        double percentage = quizScore.getTotalQuestions() > 0 ? 
            (double) quizScore.getScore() / quizScore.getTotalQuestions() * 100 : 0;
        quizScore.setPercentage(percentage);
        
        QuizScore savedScore = quizScoreRepository.save(quizScore);
        return convertToDTO(savedScore);
    }
    
    public boolean hasUserAttemptedQuiz(String userName) {
        List<QuizScore> scores = quizScoreRepository.findByUserName(userName);
        return !scores.isEmpty();
    }

    public List<QuizScoreDTO> getScoresByUserName(String userName) {
        List<QuizScore> scores = quizScoreRepository.findByUserName(userName);
        return convertToDTOList(scores);
    }

    public List<QuizScoreDTO> getTopScores(int limit) {
        List<QuizScore> scores = quizScoreRepository.findTopScores(limit);
        return convertToDTOList(scores);
    }

    public List<QuizScoreDTO> getRecentScores(String userName) {
        List<QuizScore> scores = quizScoreRepository.findRecentScores(userName);
        return convertToDTOList(scores);
    }

    public List<QuizScoreDTO> getLeaderboard() {
        List<QuizScore> scores = quizScoreRepository.findTopScores(100);
        return convertToDTOList(scores);
    }

    private List<QuizScoreDTO> convertToDTOList(List<QuizScore> scores) {
        return scores.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private QuizScoreDTO convertToDTO(QuizScore quizScore) {
        QuizScoreDTO dto = new QuizScoreDTO();
        dto.setId(quizScore.getId());
        dto.setUserName(quizScore.getUserName());
        dto.setScore(quizScore.getScore());
        dto.setTotalQuestions(quizScore.getTotalQuestions());
        dto.setTimestamp(quizScore.getTimestamp());
        dto.setPercentage(quizScore.getPercentage());
        return dto;
    }
}
