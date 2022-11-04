package game.data;

import game.model.Question;
import game.data.mappers.QuestionMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class QuestionTemplateRepository implements QuestionRepository{
    private final JdbcTemplate jdbcTemplate;

    public QuestionTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Question> findAll() {
        final String sql = "select questionId, content, categoryId "
                + "from Question limit 1000;";
        return jdbcTemplate.query(sql, new QuestionMapper());
    }

    @Override
    public Question findById(int questionId) {

        final String sql = "select questionId, content, categoryId "
                + "from Question "
                + "where questionId = ?;";

        return jdbcTemplate.query(sql, new QuestionMapper(), questionId).stream().findFirst().orElse(null);
    }

    @Override
    public Question add(Question question) {

        final String sql = "insert into Question (content, categoryId) "
                + "values (?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, question.getContent());
            ps.setInt(2, question.getCategoryId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        question.setQuestionId(keyHolder.getKey().intValue());
        return question;
    }

    @Override
    public boolean update(Question question) {
        final String sql = "update Question set "
                + "content = ?, "
                + "categoryId = ? "
                + "where questionId = ?;";

        return jdbcTemplate.update(sql,
                question.getContent(),
                question.getCategoryId(),
                question.getQuestionId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int questionId) {
        jdbcTemplate.update("delete from RoundBoard where questionId = ?;", questionId);
        return jdbcTemplate.update("delete from RoundBoard where questionId = ?;", questionId) > 0;
    }
}
