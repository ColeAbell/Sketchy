-- MySQL Script generated by MySQL Workbench
-- Fri Aug 19 12:02:33 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pictionary
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pictionary
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pictionary` DEFAULT CHARACTER SET utf8 ;
USE `pictionary` ;

-- -----------------------------------------------------
-- Table `pictionary`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pictionary`.`Category` ;

CREATE TABLE IF NOT EXISTS `pictionary`.`Category` (
  `categoryId` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE INDEX `idCategory_UNIQUE` (`categoryId` ASC) VISIBLE,
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pictionary`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pictionary`.`Question` ;

CREATE TABLE IF NOT EXISTS `pictionary`.`Question` (
  `questionId` INT NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `categoryId` INT NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE INDEX `questionId_UNIQUE` (`questionId` ASC) VISIBLE,
  UNIQUE INDEX `content_UNIQUE` (`content` ASC) VISIBLE,
  INDEX `fk_Question_Category_idx` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `pictionary`.`Category` (`categoryId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pictionary`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pictionary`.`User` ;

CREATE TABLE IF NOT EXISTS `pictionary`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  `isDrawing` TINYINT(1) NOT NULL,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pictionary`.`RoundBoard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pictionary`.`RoundBoard` ;

CREATE TABLE IF NOT EXISTS `pictionary`.`RoundBoard` (
  `roundBoardId` INT NOT NULL AUTO_INCREMENT,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`roundBoardId`),
  INDEX `fk_RoundBoard_Question1_idx` (`questionId` ASC) VISIBLE,
  INDEX `fk_RoundBoard_User1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_RoundBoard_Question1`
    FOREIGN KEY (`questionId`)
    REFERENCES `pictionary`.`Question` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RoundBoard_User1`
    FOREIGN KEY (`userId`)
    REFERENCES `pictionary`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

delimiter //
create procedure set_known_good_state()
begin

	delete from Category;
    alter table Category auto_increment = 1;
    delete from Question;
    alter table Question auto_increment = 1;
    delete from `User`;
    alter table `User` auto_increment = 1;
    delete from RoundBoard;
    alter table RoundBoard auto_increment = 1;
    
    insert into Category(categoryId, `type`) values
        (1, 'Movies')
        
	insert into Question(questionId, content, categoryId) values
        (1, 'Star Wars', 1)
        
	insert into `User`(userId, userName, points, isDrawing) values
        (1, 'Person', 5, false)
        
	insert into RoundBoard(roundBoardId, questionId, userId) values
        (1, 1, 1)

end
delimiter ;