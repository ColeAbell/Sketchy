package game.data;

import game.data.mappers.UserMapper;
import game.model.RoundBoard;
import game.data.mappers.RoundBoardMapper;
import game.model.User;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class RoundBoardTemplateRepository implements RoundBoardRepository {
    private final JdbcTemplate jdbcTemplate;

    public RoundBoardTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override

    public List<RoundBoard> findAll() {
   

        final String sql = "select roundBoardId, questionId, userId, guessed, victor, roundOver, startTime "
                + "from RoundBoard;";
        return jdbcTemplate.query(sql, new RoundBoardMapper());
    }


    @Override
    public RoundBoard findById(int roundBoardId) {


        final String sql = "select roundBoardId, questionId, userId, guessed, victor, roundOver, startTime "

                + "from RoundBoard "
                + "where roundBoardId = ?;";

        return jdbcTemplate.query(sql, new RoundBoardMapper(), roundBoardId).stream().findFirst().orElse(null);
    }

    @Override
    public RoundBoard add(RoundBoard roundBoard) {

        System.out.println("attempting to add board");
        final String sql = "insert into RoundBoard (questionId, userId, guessed, victor, roundOver, startTime) "
                + " values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, roundBoard.getQuestionId());;
            ps.setInt(2, roundBoard.getUserId());
            ps.setBoolean(3, roundBoard.isGuessed());
            ps.setInt(4, roundBoard.getVictor());
            ps.setBoolean(5, roundBoard.isRoundOver());
            ps.setString(6, LocalDateTime.now().toString());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        roundBoard.setRoundBoardId(keyHolder.getKey().intValue());
        return roundBoard;
    }

    @Override
    public boolean update(RoundBoard roundBoard){
        System.out.println("attempting update");
        final String sql = "update RoundBoard set "
                + "guessed = ?, "
                + "victor = ?, "
                + "roundOver = ? "
                + "where roundBoardId = ?;";
        return jdbcTemplate.update(sql, roundBoard.isGuessed(), roundBoard.getVictor(), roundBoard.isRoundOver(), roundBoard.getRoundBoardId()) > 0;

    }
}
