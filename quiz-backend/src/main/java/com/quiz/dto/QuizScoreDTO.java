package com.quiz.dto;

import java.time.LocalDateTime;

public class QuizScoreDTO {
    private Long id;
    private String userName;
    private int score;
    private int totalQuestions;
    private LocalDateTime timestamp;
    private double percentage;

    public QuizScoreDTO() {
    }

    public QuizScoreDTO(Long id, String userName, int score, int totalQuestions, LocalDateTime timestamp, double percentage) {
        this.id = id;
        this.userName = userName;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.timestamp = timestamp;
        this.percentage = percentage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
}
