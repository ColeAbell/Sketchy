package game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import game.model.Question;

import java.sql.ResultSet;
import java.sql.SQLException;

public class QuestionMapper implements RowMapper<Question> {
    @Override
    public Question mapRow(ResultSet resultSet, int i) throws SQLException {
        Question question = new Question();
        question.setQuestionId(resultSet.getInt("questionId"));
        question.setContent(resultSet.getString("content"));
        question.setCategoryId(resultSet.getInt("categoryId"));
        return question;
    }
}
