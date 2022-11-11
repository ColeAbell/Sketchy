-- MySQL Script generated by MySQL Workbench
-- Fri Aug 19 12:02:33 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sketchy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sketchy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sketchy` DEFAULT CHARACTER SET utf8 ;
USE `sketchy` ;

-- -----------------------------------------------------
-- Table `sketchy`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sketchy`.`Category` ;

CREATE TABLE IF NOT EXISTS `sketchy`.`Category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE INDEX `idCategory_UNIQUE` (`categoryId` ASC) VISIBLE,
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sketchy`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sketchy`.`Question` ;

CREATE TABLE IF NOT EXISTS `sketchy`.`Question` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
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
-- Table `sketchy`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sketchy`.`User` ;

CREATE TABLE IF NOT EXISTS `sketchy`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  `isDrawing` TINYINT(1) NOT NULL,
  `lastActive` DATETIME,
  `lastDrawn` DATETIME,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sketchy`.`RoundBoard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sketchy`.`RoundBoard` ;

CREATE TABLE IF NOT EXISTS `sketchy`.`RoundBoard` (
  `roundBoardId` INT NOT NULL AUTO_INCREMENT,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  `guessed` TINYINT NOT NULL DEFAULT 0,
  `victor` INT NOT NULL DEFAULT 0,
  `roundOver` TINYINT NOT NULL DEFAULT 0,
  `startTime` DATETIME,
  PRIMARY KEY (`roundBoardId`))
ENGINE = InnoDB;

insert into `Category`(`type`) values
("Food"), ("Movies"), ("Animal Kingdom"), ("Nature"), ("Object"), ("Outer Space"), ("Holidays"), ("Activities"), ("Supernatural");

insert into `Question` (`content`, `categoryId`) values
("pizza", 1), ("salad", 1), ("coffee", 1), ("cake", 1), ("watermelon", 1), ("cheese", 1), ("egg", 1), ("bagel", 1), ("ice cream", 1), ("sandwich", 1),
("E.T", 2), ("indiana jones", 2), ("batman",  2), ("scream", 2), ("shrek", 2), ("harry potter", 2), ("psycho", 2), ("snow white", 2), ("lion king", 2), ("jaws", 2),
("tiger", 3), ("toucan", 3), ("spider", 3), ("monkey", 3), ("peacock", 3), ("butterfly", 3), ("dolphin", 3), ("horse", 3), ("jellyfish", 3), ("cat", 3),
("beach", 4), ("flower", 4), ("ocean", 4), ("tree", 4), ("waterfall", 4), ("volcano", 4), ("mountain", 4), ("cactus", 4), ("desert", 4), ("venus fly trap", 4),
("boat", 5), ("train", 5), ("car", 5), ("blender", 5), ("stop light", 5), ("door", 5), ("lamp", 5), ("mirror", 5), ("tub", 5), ("sword", 5),
("alien", 6), ("spaceship", 6), ("saturn", 6), ("earth", 6), ("black hole", 6), ("asteroid", 6), ("sun", 6), ("moon", 6), ("satellite", 6), ("astronaut", 6),
("christmas", 7), ("thanksgiving", 7), ("easter", 7), ("hanukkah", 7), ("independence day", 7), ("halloween", 7), ("mother's day", 7), ("groundhog day", 7),
("archery", 8), ("fishing", 8), ("basketball", 8), ("baseball", 8), ("running", 8), ("dancing", 8), ("singing", 8), ("video games", 8), ("fencing", 8),
("vampire", 9), ("ghost", 9), ("werewolf", 9), ("frankenstein", 9), ("witch", 9), ("dragon", 9), ("fairie", 9), ("demon", 9), ("santa claus", 9), ("gnome", 9);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;