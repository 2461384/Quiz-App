package com.quiz.dto;

import java.util.List;

public class QuestionDTO {
    private Long id;
    private String questionText;
    // private String category;
    // private String difficulty;
    private List<OptionDTO> options;
    private Long correctAnswerId;

    public QuestionDTO() {
    }

    public QuestionDTO(Long id, String questionText, String category, String difficulty, List<OptionDTO> options, Long correctAnswerId) {
        this.id = id;
        this.questionText = questionText;
        // this.category = category;
        // this.difficulty = difficulty;
        this.options = options;
        this.correctAnswerId = correctAnswerId;
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

    public List<OptionDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDTO> options) {
        this.options = options;
    }

    public Long getCorrectAnswerId() {
        return correctAnswerId;
    }

    public void setCorrectAnswerId(Long correctAnswerId) {
        this.correctAnswerId = correctAnswerId;
    }
}
