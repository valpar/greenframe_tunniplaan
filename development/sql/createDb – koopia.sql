-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema scheduleDb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scheduleDb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scheduleDb` DEFAULT CHARACTER SET utf8 ;
USE `scheduleDb` ;

-- -----------------------------------------------------
-- Table `scheduleDb`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`subjects` (
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
-- Table `scheduleDb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`users` (
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
-- Table `scheduleDb`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`teachers` (
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
-- Table `scheduleDb`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`scheduled`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`scheduled` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startTime` DATETIME NULL,
  `endTime` DATETIME NULL,
  `rooms_id` INT NULL,
  `comment` VARCHAR(255) NULL,
  `courses_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`id`, `courses_id`, `subjects_id`),
  INDEX `fk_scheduled_rooms1_idx` (`rooms_id` ASC) VISIBLE,
  INDEX `fk_scheduled_courses1_idx` (`courses_id` ASC) VISIBLE,
  INDEX `fk_scheduled_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_scheduled_rooms1`
    FOREIGN KEY (`rooms_id`)
    REFERENCES `scheduleDb`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduled_courses1`
    FOREIGN KEY (`courses_id`)
    REFERENCES `scheduleDb`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduled_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `scheduleDb`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`teachers_has_subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`teachers_has_subjects` (
  `teachers_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  PRIMARY KEY (`teachers_id`, `subjects_id`),
  INDEX `fk_teachers_has_subjects_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  INDEX `fk_teachers_has_subjects_teachers1_idx` (`teachers_id` ASC) VISIBLE,
  CONSTRAINT `fk_teachers_has_subjects_teachers1`
    FOREIGN KEY (`teachers_id`)
    REFERENCES `scheduleDb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teachers_has_subjects_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `scheduleDb`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
