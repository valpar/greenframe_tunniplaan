-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schedule` DEFAULT CHARACTER SET utf8 ;
USE `schedule` ;

-- -----------------------------------------------------
-- Table `schedule`.`subjects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`subjects` ;

CREATE TABLE IF NOT EXISTS `schedule`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(60) NOT NULL,
  `subjectCode` VARCHAR(45) NULL,
  `creditPoint` INT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `subjectCode_UNIQUE` (`subjectCode` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`users` ;

CREATE TABLE IF NOT EXISTS `schedule`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`teachers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`teachers` ;

CREATE TABLE IF NOT EXISTS `schedule`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`courses` ;

CREATE TABLE IF NOT EXISTS `schedule`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`rooms` ;

CREATE TABLE IF NOT EXISTS `schedule`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`scheduled`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`scheduled` ;

CREATE TABLE IF NOT EXISTS `schedule`.`scheduled` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startTime` DATETIME NULL,
  `endTime` DATETIME NULL,
  `rooms_id` INT NULL,
  `courses_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  `distanceLink` VARCHAR(150) NULL,
  PRIMARY KEY (`id`, `courses_id`, `subjects_id`),
  INDEX `fk_scheduled_rooms1_idx` (`rooms_id` ASC) VISIBLE,
  INDEX `fk_scheduled_courses1_idx` (`courses_id` ASC) VISIBLE,
  INDEX `fk_scheduled_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_scheduled_rooms1`
    FOREIGN KEY (`rooms_id`)
    REFERENCES `schedule`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduled_courses1`
    FOREIGN KEY (`courses_id`)
    REFERENCES `schedule`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduled_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `schedule`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`teachers_has_subjects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`teachers_has_subjects` ;

CREATE TABLE IF NOT EXISTS `schedule`.`teachers_has_subjects` (
  `teachers_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`teachers_id`, `subjects_id`),
  INDEX `fk_teachers_has_subjects_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  INDEX `fk_teachers_has_subjects_teachers1_idx` (`teachers_id` ASC) VISIBLE,
  CONSTRAINT `fk_teachers_has_subjects_teachers1`
    FOREIGN KEY (`teachers_id`)
    REFERENCES `schedule`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teachers_has_subjects_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `schedule`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`homeworks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schedule`.`homeworks` ;

CREATE TABLE IF NOT EXISTS `schedule`.`homeworks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(350) NULL,
  `dueDate` DATETIME NULL,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`id`, `subjects_id`),
  INDEX `fk_homeworks_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_homeworks_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `schedule`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
