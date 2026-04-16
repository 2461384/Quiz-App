package com.quiz.service;

import com.quiz.dto.QuestionDTO;
import com.quiz.dto.OptionDTO;
import com.quiz.entity.Question;
import com.quiz.entity.Option;
import com.quiz.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Get random unique questions
    public List<QuestionDTO> getRandomQuestions(int limit) {
        List<Question> allQuestions = questionRepository.findAll();
        Collections.shuffle(allQuestions);

        List<Question> uniqueQuestions = allQuestions.stream()
                .distinct()
                .collect(Collectors.toList());

        int size = Math.min(limit, uniqueQuestions.size());
        List<Question> selected = uniqueQuestions.subList(0, size);

        return convertToDTO(selected);
    }

    // Get all questions
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return convertToDTO(questions);
    }

    // Get question by ID
    public QuestionDTO getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        return convertToDTO(question);
    }

    // Add new question from DTO
    public QuestionDTO addQuestionFromDTO(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestionText(questionDTO.getQuestionText());
        question.setCategory(questionDTO.getCategory());
        question.setDifficulty(questionDTO.getDifficulty());

        List<Option> options = questionDTO.getOptions().stream()
                .map(optDTO -> {
                    Option option = new Option();
                    option.setOptionText(optDTO.getOptionText());
                    option.setCorrectAnswer(optDTO.isCorrectAnswer());
                    option.setQuestion(question);
                    return option;
                })
                .collect(Collectors.toList());

        question.setOptions(options);

        Question saved = questionRepository.save(question);
        return convertToDTO(saved);
    }

    // Update question by ID
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestionText(questionDTO.getQuestionText());
        question.setCategory(questionDTO.getCategory());
        question.setDifficulty(questionDTO.getDifficulty());

        List<Option> options = questionDTO.getOptions().stream()
                .map(optDTO -> {
                    Option option = new Option();
                    option.setOptionText(optDTO.getOptionText());
                    option.setCorrectAnswer(optDTO.isCorrectAnswer());
                    option.setQuestion(question);
                    return option;
                })
                .collect(Collectors.toList());

        question.setOptions(options);

        Question saved = questionRepository.save(question);
        return convertToDTO(saved);
    }

    // Delete question by ID
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found");
        }
        questionRepository.deleteById(id);
    }

    // Get questions by category
    public List<QuestionDTO> getQuestionsByCategory(String category) {
        List<Question> questions = questionRepository.findByCategory(category);
        return convertToDTO(questions);
    }

    // Get questions by difficulty
    public List<QuestionDTO> getQuestionsByDifficulty(String difficulty) {
        List<Question> questions = questionRepository.findByDifficulty(difficulty);
        return convertToDTO(questions);
    }

    // Helper: convert list
    private List<QuestionDTO> convertToDTO(List<Question> questions) {
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper: convert single
    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setCategory(question.getCategory());
        dto.setDifficulty(question.getDifficulty());

        List<OptionDTO> options = question.getOptions().stream()
                .map(option -> new OptionDTO(option.getId(), option.getOptionText(), option.isCorrectAnswer()))
                .collect(Collectors.toList());

        dto.setOptions(options);
        dto.setCorrectAnswerId(question.getCorrectAnswerId());

        return dto;
    }
}
