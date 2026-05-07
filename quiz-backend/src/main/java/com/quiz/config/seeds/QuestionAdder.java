package com.quiz.config.seeds;

@FunctionalInterface
public interface QuestionAdder {
    void add(String text, String category, String difficulty,
             String correct, String w1, String w2, String w3);
}
