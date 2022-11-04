package game.data;

import game.model.RoundBoard;

import java.util.List;

public interface RoundBoardRepository {
    RoundBoard findById(int roundBoardId);

    RoundBoard add(RoundBoard roundBoard);

    List<RoundBoard> findAll();

    boolean update(RoundBoard roundBoard);
}
