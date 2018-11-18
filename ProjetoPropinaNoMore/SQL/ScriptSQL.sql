-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema propinanomore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema propinanomore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `propinanomore` DEFAULT CHARACTER SET utf8 ;
USE `propinanomore` ;

-- -----------------------------------------------------
-- Table `propinanomore`.`orgao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`orgao` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL DEFAULT NULL,
  `sigla` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`edital`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`edital` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `ganhador` VARCHAR(255) NULL DEFAULT NULL,
  `objetoLicitado` VARCHAR(255) NULL DEFAULT NULL,
  `referencia` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `orgao_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_894a2xhwsov8duhji9ku7mccn` (`orgao_id` ASC),
  CONSTRAINT `FK_894a2xhwsov8duhji9ku7mccn`
    FOREIGN KEY (`orgao_id`)
    REFERENCES `propinanomore`.`orgao` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`denuncia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`denuncia` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `ano` INT(11) NOT NULL,
  `cpf` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `nome` VARCHAR(255) NULL DEFAULT NULL,
  `onde` VARCHAR(255) NULL DEFAULT NULL,
  `oque` VARCHAR(255) NULL DEFAULT NULL,
  `quando` VARCHAR(255) NULL DEFAULT NULL,
  `sigilo` BIT(1) NOT NULL,
  `telefone` VARCHAR(255) NULL DEFAULT NULL,
  `edital_id` BIGINT(20) NULL DEFAULT NULL,
  `orgao_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_qsk5qj5efxjqbxri1evcd8i67` (`edital_id` ASC),
  INDEX `FK_suj06rk33ujvg6p8h72ixglui` (`orgao_id` ASC),
  CONSTRAINT `FK_qsk5qj5efxjqbxri1evcd8i67`
    FOREIGN KEY (`edital_id`)
    REFERENCES `propinanomore`.`edital` (`id`),
  CONSTRAINT `FK_suj06rk33ujvg6p8h72ixglui`
    FOREIGN KEY (`orgao_id`)
    REFERENCES `propinanomore`.`orgao` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`denunciado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`denunciado` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(255) NULL DEFAULT NULL,
  `infoAdicional` VARCHAR(255) NULL DEFAULT NULL,
  `nome` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`denuncia_denunciado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`denuncia_denunciado` (
  `Denuncia_id` BIGINT(20) NOT NULL,
  `denunciado_id` BIGINT(20) NOT NULL,
  UNIQUE INDEX `UK_7hrljyc38549eeju31r0a6yqy` (`denunciado_id` ASC),
  INDEX `FK_swk666ww88awp92fojom5jxtw` (`Denuncia_id` ASC),
  CONSTRAINT `FK_7hrljyc38549eeju31r0a6yqy`
    FOREIGN KEY (`denunciado_id`)
    REFERENCES `propinanomore`.`denunciado` (`id`),
  CONSTRAINT `FK_swk666ww88awp92fojom5jxtw`
    FOREIGN KEY (`Denuncia_id`)
    REFERENCES `propinanomore`.`denuncia` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`prova`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`prova` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `caminhoArquivoServidor` VARCHAR(255) NULL DEFAULT NULL,
  `tipoProva` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `propinanomore`.`denuncia_prova`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `propinanomore`.`denuncia_prova` (
  `Denuncia_id` BIGINT(20) NOT NULL,
  `prova_id` BIGINT(20) NOT NULL,
  UNIQUE INDEX `UK_6k94osavokns7u7ofkqhu7w9m` (`prova_id` ASC),
  INDEX `FK_ce1hp3sbmts4qbm9xk0u55ym1` (`Denuncia_id` ASC),
  CONSTRAINT `FK_6k94osavokns7u7ofkqhu7w9m`
    FOREIGN KEY (`prova_id`)
    REFERENCES `propinanomore`.`prova` (`id`),
  CONSTRAINT `FK_ce1hp3sbmts4qbm9xk0u55ym1`
    FOREIGN KEY (`Denuncia_id`)
    REFERENCES `propinanomore`.`denuncia` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
