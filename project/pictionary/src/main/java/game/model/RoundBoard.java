package game.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public class RoundBoard {

    private int roundBoardId;
    private int questionId;
    private int userId;
    public boolean isRoundOver() {
        return roundOver;
    }
    public void setRoundOver(boolean roundOver) {
        this.roundOver = roundOver;
    }
    private boolean roundOver;

    private boolean guessed;
    private int victor;

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    private LocalDateTime startTime;

    public boolean isGuessed() {
        return guessed;
    }

    public void setGuessed(boolean guessed) {
        this.guessed = guessed;
    }

    public int getVictor() {
        return victor;
    }

    public void setVictor(int victor) {
        this.victor = victor;
    }

    public int getRoundBoardId() {
        return roundBoardId;
    }

    public void setRoundBoardId(int roundBoardId) {
        this.roundBoardId = roundBoardId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoundBoard)) return false;
        RoundBoard that = (RoundBoard) o;
        return roundBoardId == that.roundBoardId && questionId == that.questionId && userId == that.userId && guessed == that.guessed && victor == that.victor && roundOver == that.roundOver && startTime == that.startTime;
    }

    @Override
    public int hashCode() {
        return Objects.hash(roundBoardId, questionId, userId, guessed, victor, roundOver, startTime);
    }
}
