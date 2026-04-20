package com.quiz.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;

    // @Column(nullable = false)
    // private String category;

    // @Column(nullable = false)
    // private String difficulty;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Option> options;

    public Question() {
    }

    public Question(Long id, String questionText, String category, String difficulty, List<Option> options) {
        this.id = id;
        this.questionText = questionText;
        // this.category = category;
        // this.difficulty = difficulty;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    // public String getCategory() {
    //     return category;
    // }

    // public void setCategory(String category) {
    //     this.category = category;
    // }

    // public String getDifficulty() {
    //     return difficulty;
    // }

    // public void setDifficulty(String difficulty) {
    //     this.difficulty = difficulty;
    // }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

    public Long getCorrectAnswerId() {
        if (options != null) {
            for (Option option : options) {
                if (option.isCorrectAnswer()) {
                    return option.getId();
                }
            }
        }
        return null;
    }
}
