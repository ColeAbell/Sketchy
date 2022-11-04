package game.data.mappers;

import game.model.RoundBoard;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class RoundBoardMapper implements RowMapper<RoundBoard> {
    @Override
    public RoundBoard mapRow(ResultSet resultSet, int i) throws SQLException {
        RoundBoard roundBoard = new RoundBoard();
        roundBoard.setRoundBoardId(resultSet.getInt("roundBoardId"));
        roundBoard.setQuestionId(resultSet.getInt("questionId"));
        roundBoard.setUserId(resultSet.getInt("userId"));
        roundBoard.setGuessed(resultSet.getBoolean("guessed"));
        roundBoard.setVictor(resultSet.getInt("victor"));
        roundBoard.setRoundOver(resultSet.getBoolean("roundOver"));
        roundBoard.setStartTime(resultSet.getObject("startTime", LocalDateTime.class));
        return roundBoard;
    }
}
