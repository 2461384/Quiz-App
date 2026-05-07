package com.quiz.repository;

import com.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategory(String category);
    List<Question> findByDifficulty(String difficulty);
    List<Question> findByCategoryAndDifficulty(String category, String difficulty);
    boolean existsByQuestionText(String questionText);

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT q.category FROM Question q WHERE q.category IS NOT NULL ORDER BY q.category")
    List<String> findDistinctCategories();

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT q.difficulty FROM Question q WHERE q.difficulty IS NOT NULL ORDER BY q.difficulty")
    List<String> findDistinctDifficulties();
}