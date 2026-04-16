package com.quiz.dto;

public class OptionDTO {
    private Long id;
    private String optionText;
    private boolean correctAnswer;

    public OptionDTO() {
    }

    public OptionDTO(Long id, String optionText) {
        this.id = id;
        this.optionText = optionText;
    }

    public OptionDTO(Long id, String optionText, boolean correctAnswer) {
        this.id = id;
        this.optionText = optionText;
        this.correctAnswer = correctAnswer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public boolean isCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(boolean correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
