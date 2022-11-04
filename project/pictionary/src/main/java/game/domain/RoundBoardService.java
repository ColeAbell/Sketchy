package game.domain;

import game.data.RoundBoardRepository;
import game.model.Question;
import game.model.RoundBoard;
import game.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoundBoardService {

    private final RoundBoardRepository repository;

    public RoundBoardService(RoundBoardRepository repo){
        this.repository = repo;
    }

    public List<RoundBoard> findAll() {return repository.findAll();}

    public RoundBoard findById(int roundBoardId) {
        return repository.findById(roundBoardId);
    }

    public Result<RoundBoard> add(RoundBoard board){
        System.out.println("attempting to add in service");
        Result<RoundBoard> result = validate(board);
        if(!result.isSuccess()){
            return result;
        }
        if (board.getRoundBoardId() != 0) {
            result.addMessage("Round ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(board));
        return result;
    }

    public Result<RoundBoard> update(RoundBoard roundBoard) {
        Result<RoundBoard> result = validate(roundBoard);
        if (!result.isSuccess()) {
            return result;
        }

        if (roundBoard.getRoundBoardId() <= 0) {
            result.addMessage("round board id must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(roundBoard)) {
            System.out.println("didn't update");
            String msg = String.format("roundBoardId: %s, not found", roundBoard.getRoundBoardId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        System.out.println("did update");
        return result;
    }

    private Result<RoundBoard> validate(RoundBoard board) {
        Result<RoundBoard> result = new Result<>();
        if (board == null) {
            result.addMessage("board cannot be null", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
