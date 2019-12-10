-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: AIPE
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cartes`
--

DROP TABLE IF EXISTS `Cartes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cartes` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `niveau_sonore` smallint(6) DEFAULT NULL,
  `micro` varchar(20) DEFAULT NULL,
  `id_carte` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cartes`
--

LOCK TABLES `Cartes` WRITE;
/*!40000 ALTER TABLE `Cartes` DISABLE KEYS */;
INSERT INTO `Cartes` VALUES (1,23,' 1',' Roxette'),(2,14,' 1',' Roxette'),(3,18,' 1',' Roxette'),(4,25,' 1',' Roxette'),(5,17,' 1',' Roxette'),(6,20,' 1',' Roxette'),(7,19,' 1',' Roxette'),(8,12,' 1',' Roxette'),(9,28,' 1',' Roxette'),(10,18,' 1',' Roxette'),(11,17,' 1',' Roxette'),(12,20,' 1',' Roxette'),(13,30,' 1',' Roxette'),(14,17,' 1',' Roxette'),(15,11,' 1',' Roxette'),(16,18,' 1',' Roxette'),(17,28,' 1',' Roxette'),(18,19,' 1',' Roxette'),(19,18,' 1',' Roxette'),(20,17,' 1',' Roxette'),(21,26,' 1',' Roxette'),(22,25,' 1',' Roxette'),(23,13,' 1',' Roxette'),(24,17,' 1',' Roxette'),(25,23,' 1',' Roxette'),(26,16,' 1',' Roxette'),(27,13,' 1',' Roxette'),(28,17,' 1',' Roxette'),(29,24,' 1',' Roxette'),(30,23,' 1',' Roxette'),(31,13,' 1',' Roxette'),(32,23,' 1',' Roxette'),(33,14,' 1',' Roxette'),(34,21,' 1',' Roxette'),(35,13,' 1',' Roxette'),(36,27,' 1',' Roxette'),(37,22,' 1',' Roxette'),(38,25,' 1',' Roxette'),(39,19,' 1',' Roxette'),(40,26,' 1',' Roxette'),(41,26,'1','Roxette'),(42,20,'1','Roxette'),(43,27,'1','Roxette'),(44,16,'1','Roxette'),(45,30,'1','Roxette'),(46,27,'1','Roxette'),(47,27,'1','Roxette'),(48,23,'1','Roxette'),(49,24,'1','Roxette'),(50,29,'1','Roxette'),(51,26,'1','Roxette'),(52,18,'1','Roxette'),(53,15,'1','Roxette'),(54,17,'1','Roxette'),(55,25,'1','Roxette'),(56,28,'N15','Roxette'),(57,10,'N15','Roxette'),(58,25,'N15','Roxette'),(59,30,'N15','Roxette'),(60,26,'N15','Roxette'),(61,15,'N15','Roxette'),(62,18,'N15','Roxette'),(63,17,'N15','Roxette'),(64,23,'N15','Roxette'),(65,25,'N15','Roxette'),(66,11,'N15','Roxette'),(67,23,'N15','Roxette'),(68,25,'N15','Roxette'),(69,28,'N15','Roxette'),(70,15,'N15','Roxette');
/*!40000 ALTER TABLE `Cartes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Salles`
--

DROP TABLE IF EXISTS `Salles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Salles` (
  `ID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Salles`
--

LOCK TABLES `Salles` WRITE;
/*!40000 ALTER TABLE `Salles` DISABLE KEYS */;
INSERT INTO `Salles` VALUES ('1');
/*!40000 ALTER TABLE `Salles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartesSallesRelation`
--

DROP TABLE IF EXISTS `CartesSallesRelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartesSallesRelation` (
  `ID_Cartes` varchar(20) DEFAULT NULL,
  `ID_Salles` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartesSallesRelation`
--

LOCK TABLES `CartesSallesRelation` WRITE;
/*!40000 ALTER TABLE `CartesSallesRelation` DISABLE KEYS */;
INSERT INTO `CartesSallesRelation` VALUES ('Roxette','N15');
/*!40000 ALTER TABLE `CartesSallesRelation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InfoCartes`
--

DROP TABLE IF EXISTS `InfoCartes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InfoCartes` (
  `ID` varchar(20) DEFAULT NULL,
  `IP` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InfoCartes`
--

LOCK TABLES `InfoCartes` WRITE;
/*!40000 ALTER TABLE `InfoCartes` DISABLE KEYS */;
INSERT INTO `InfoCartes` VALUES ('Roxette','172.16.235.1');
/*!40000 ALTER TABLE `InfoCartes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 18:30:12
