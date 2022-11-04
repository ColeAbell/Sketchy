package game.model;

import java.util.Objects;

public class Question {

    private int questionId;
    private String content;
    private int categoryId;

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Question)) return false;
        Question question = (Question) o;
        return questionId == question.questionId && categoryId == question.categoryId && Objects.equals(content, question.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, content, categoryId);
    }
}
