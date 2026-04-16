package com.quiz.repository;

import com.quiz.entity.QuizScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizScoreRepository extends JpaRepository<QuizScore, Long> {
    
    List<QuizScore> findByUserName(String userName);
    
    @Query(value = "SELECT * FROM quiz_scores ORDER BY score DESC, timestamp DESC LIMIT ?1", nativeQuery = true)
    List<QuizScore> findTopScores(int limit);
    
    @Query(value = "SELECT * FROM quiz_scores WHERE user_name = ?1 ORDER BY timestamp DESC LIMIT 5", nativeQuery = true)
    List<QuizScore> findRecentScores(String userName);
}
