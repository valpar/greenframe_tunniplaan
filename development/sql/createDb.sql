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
  `subject` VARCHAR(160) NOT NULL,
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
-- Table `scheduleDb`.`lecturers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`lecturers` (
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
  `courseLong` VARCHAR(200) NOT NULL,  
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
  `comment` VARCHAR(255) NULL,
  `subjects_id` INT NOT NULL,
  `distanceLink` VARCHAR(150) NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `subjects_id`),
  INDEX `fk_scheduled_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_scheduled_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `scheduleDb`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `scheduleDb`.`homeworks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`homeworks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(2500) NULL,
  `dueDate` DATETIME NULL,
  `subjects_id` INT NOT NULL,
  `extrasLink` VARCHAR(250) NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `subjects_id`),
  INDEX `fk_homeworks_subjects1_idx` (`subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_homeworks_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `scheduleDb`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`scheduled_has_lecturers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`scheduled_has_lecturers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `schedule_id` INT NOT NULL,
  `lecturers_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`scheduled_has_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`scheduled_has_rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scheduled_id` INT NOT NULL,
  `rooms_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduleDb`.`scheduled_has_courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduleDb`.`scheduled_has_courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scheduled_id` INT NOT NULL,
  `courses_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
