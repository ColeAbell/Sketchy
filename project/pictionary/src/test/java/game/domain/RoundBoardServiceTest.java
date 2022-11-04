package game.domain;

import game.data.RoundBoardRepository;
import game.model.RoundBoard;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RoundBoardServiceTest {

    @Autowired
    RoundBoardService service;

    @MockBean
    RoundBoardRepository repository;

    @Test
    void shouldAdd() {
        RoundBoard roundBoard = makeRoundBoard();
        Result<RoundBoard> actual = service.add(roundBoard);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        RoundBoard roundBoard = makeRoundBoard();
        roundBoard.setRoundBoardId(50);
        Result<RoundBoard> actual = service.add(roundBoard);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        RoundBoard roundBoard = makeRoundBoard();
        roundBoard.setRoundBoardId(1);

        when(repository.update(roundBoard)).thenReturn(true);
        Result<RoundBoard> actual = service.update(roundBoard);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        RoundBoard roundBoard = makeRoundBoard();

        when(repository.update(roundBoard)).thenReturn(false);
        Result<RoundBoard> actual = service.update(roundBoard);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        RoundBoard roundBoard = makeRoundBoard();

        Result<RoundBoard> actual = service.update(roundBoard);
        assertEquals(ResultType.INVALID, actual.getType());

        roundBoard.setRoundBoardId(0);
        actual = service.update(roundBoard);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    RoundBoard makeRoundBoard() {
        RoundBoard roundBoard = new RoundBoard();
        roundBoard.setRoundBoardId(0);
        roundBoard.setQuestionId(1);
        roundBoard.setUserId(1);
        roundBoard.setRoundOver(false);
        roundBoard.setGuessed(false);
        roundBoard.setVictor(2);
        return roundBoard;
    }
}