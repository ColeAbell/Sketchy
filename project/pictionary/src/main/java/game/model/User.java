package game.model;

import java.time.LocalDateTime;
import java.util.Objects;

public class User {

    private int userId;
    private String userName;
    private int points;
    private boolean isDrawing;

    private LocalDateTime lastActive;

    private LocalDateTime lastDrawn;



    public User() {

    }

    public User(int userId, String userName, int points, boolean isDrawing, LocalDateTime lastActive, LocalDateTime lastDrawn) {
        this.userId = userId;
        this.userName = userName;
        this.points = points;
        this.isDrawing = isDrawing;
        this.lastActive =  lastActive;
        this.lastDrawn = lastDrawn;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getLastDrawn() {
        return lastDrawn;
    }

    public void setLastDrawn(LocalDateTime lastDrawn) {
        this.lastDrawn = lastDrawn;
    }

    public LocalDateTime getLastActive() {
        return lastActive;
    }

    public void setLastActive(LocalDateTime lastActive) {
        this.lastActive = lastActive;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public boolean getIsDrawing() {
        return isDrawing;
    }

    public void setIsDrawing(boolean drawing) {
        isDrawing = drawing;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return userId == user.userId && points == user.points && isDrawing == user.isDrawing && Objects.equals(userName, user.userName) && Objects.equals(lastActive, user.lastActive) && Objects.equals(lastDrawn, user.lastDrawn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, userName, points, isDrawing, lastActive, lastDrawn);
    }
}