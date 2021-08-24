-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: tccNode
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2,'root@root.com','root','roottoken');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `slug` varchar(45) NOT NULL,
  `img` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `img_UNIQUE` (`img`),
  KEY `fk_products_1_idx` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (21,'Creatina Max',78.25,'A Creatina - Max Titanium é um produto da Max Titanium, marca que conquistou o Prêmio de Excelência Revista Suplementação 2009 na categoria Marca Revelação. A Max Titanium é uma linha de produtos da Supley Laboratório, empresa nacional localizada em Matão/SP, especializada na fabricação de suplementos alimentares.','creatina','creatinaMax.png'),(22,'Creatina Integralmedica',66.56,'A Creatina Hardcore Reload é um aminoácido que ocorre naturalmente em humanos e também é consumida na dieta. Atua no estoque de energia que os músculos e os outros tecidos necessitam. Quando consumida adequadamente como creatina exógena, faz com que os estoques musculares e cerebrais de creatina se tornem mais elevados, assim como os seus derivados: fosforilado e a fosfocreatina.','creatina','creatina_300g.png'),(23,'CREATINE DARKNESS INTEGRALMÉDICA - 350G',77.67,'100% pura, feita exclusivamente com Creapure, creatina monoidratada alemã, reconhecida por sua eficiência, sem a adição de qualquer outro ingrediente.','creatina','aminoacido-creatina-350g-darkness.png'),(24,'Creatina Probiotica - 300g',55.45,'é um produto destinado a complementar os estoques endógenos de creatina, proporcionando mais força para realizar atividades de curta duração e/ou intermitentes. Além disso, age como facilitadora da entrada de água no tecido muscular, promovendo aumento de volume, e maior aporte de nutrientes facilitando assim,  o ganho de massa muscular.','creatina','probiotica2019-creatina-pura-300g_2_.png'),(25,'Creatina Monohidratada',40.4,'A Creatina da New Millen é o suplemento ideal para os praticantes de atividades físicas que gostam de atingir metas em suas atividades físicas. Esse aminoácido contribui para a produção de energia para as células musculares, fazendo com que o rendimento aumente. É a forma de creatina mais consumida e a mais utilizada em estudos científicos.','creatina','creatina-monohidratada-150-g-new-millen.jpg'),(26,'Creatina 400 g - Universal',100.89,'Creatina Powder (2 potes de 200g) - Universal Nutrition A Creatina é um dos suplementos Alimentares mais consumidos no mundo. A creatina pode ser sintetizada no fígado, rins e pâncreas por meio dos aminoácidos arginina, glicina e metionina. Ela também é encontrada em baixas proporções nas carnes. Tanto a creatina consumida quanto a produzida pelo organismo ficam estocadas nas células musculares para serem utilizadas durante os períodos de exercícios rápidos e de curta duração. Assim, a principal função da creatina é fornecer energia(ATP) para os músculos no momento da atividade física, melhorando o rendimento do treino. Atletas de alta performance necessitam de maiores estoques de creatina, sendo necessária a sua suplementação. Quando consumida adequadamente, faz com que os estoques musculares de creatina se tornem mais elevados, proporcionando, assim, aumento de força e explosão. Alguns estudos mostram também que o consumo de creatina contribui para o aumento da síntese protéica e redução do catabolismo protéico, traduzindo em ganho de massa muscular.','creatina','172-4687-001_zoom1.jpg'),(27,'      Creatina Optimums - 88 capsulas',60.67,'      Creatina encapsulada monohidratada com materia prima importada dos estados unidos, baixa concentração porem custo beneficio','creatina','94d8b94e62e767d6bdfd0048b8843704.jpg'),(28,'Creatina em Cápsula - Creatina Hardcore Integralmédica',40.45,'Mais força e explosão significam mais ganhos. Para atingir o máximo desempenho é necessário consumir o melhor da suplementação, e a creatina é uma peça chave com eficácia comprovada em diversos estudos.','creatina','CREATINA_HARDCORE_60COMP.png'),(29,'CREATINA MONOHIDRATADA 100G MAX TITANIUM - UN',28.99,'A creatina é um nutriente responsável pela produção de energia que serve as células musculares, se tornado o suplemento ideal para os esportistas que gostam de atingir metas audaciosas em suas atividades físicas. Além disso a creatina auxilia o aumento da eficiência da síntese proteica.','creatina','163-Creatine-Max-EmporioQuatroEstrelas.png'),(30,'Creatina 300g – Absolut Nutrition',59.9,'A Creatina 100% Pure da Absolut Nutrition tem em sua composição creatina micronizada e monohidratada, fornecendo assim dois tipos de creatina em um só produto. Composta por três aminoácidos, arginina, glicina e metionina, é uma excelente fonte de reposição energética para contração muscular, além de preservar os estoques de glicogênio do músculo, aumentando assim a performance do exercício, com o diferencial de uma matéria-prima altamente refinada, extraída com processos tecnológicos de ponta, a creatina 100% pure atende atletas que buscam suplementação pré-treino e pós-treino.','creatina','creatina-absolut-300g1-2e286aa42f4fb219c416018268463974-480-0.png'),(31,'Creatina Powder',74.9,'A Creatina Powder é um aminoácido monohidratado que melhora o desempenho do corpo e aumenta a força nos músculos durante os exercícios físicos.  Ela é um suplemento ergogênico (para construir músculos), e numerosos estudos comprovaram sua eficácia para esse fim.','creatina','creatina-powder-produto-1596631339-1200-69a435de.png'),(32,'Creatina Integralmedica - 150G',55.67,'Creatina de 150 gramas monohidratada da linha hardcore','creatina','creatina-integralmedica-150g.png'),(33,'Sinister Mass - Integralmedica',88.88,'A busca por um ganho efetivo de massa muscular demanda treinos constantes e um aporte calórico compatível. É fundamental que esse aporte seja feito de modo estratégico, balanceando adequadamente a ingestão de proteínas, carboidratos e gorduras. SINISTER MASS da Integralmédica traz uma combinação inteligente de duas proteínas de alto valor biológico (whey protein concentrate, whey protein isolate), um carboidrato de energia rápida (maltodextrina) e outro de liberação gradual (waxy maize). A fórmula também oferta creatina (3 g por porção), composto relacionado à explosão muscular, necessária durante os treinos, e também ao aumento de massa muscular. Nutrição e treino adequados estão na base da evolução física de atletas e esportistas. Com três décadas de tradição, a Integralmédica traduz a ciência da nutrição esportiva em uma vasta linha de suplementos adequados a diferentes objetivos de desempenho, estética e saúde. Integralmédica é inovação, qualidade e tecnologia ao alcance de atletas e praticantes de atividades físicas de todos os níveis.','Hipercalorico','sinister-mass-baunilha-3kg-integralmedica.png'),(34,'Hipermass Atlhetica - 3KG',77.67,'Atlhetica Nutrition é um suplemento hipercalórico para atletas, agora com adição de creatina, além da maltodextrina e proteína 3W','Hipercalorico','700131-doce-de-leite-min.png'),(35,'Ftw Delicous Mass - 3KG',78.6,'Hipercalorico FTW, linha gourmet','Hipercalorico','ftw-delicious-mass-banana-com-acai-leite-condensado.png'),(36,'MONSTERONE',113.8,'Monsterone, um potente hipercalórico da linha Darkness, combina ingredientes de modo estratégico para auxiliar os praticantes mais hardcore da musculação a ganharem massa magra.','Hipercalorico','hipercalorico-monsterone-morango-3kg-darkness.png'),(37,'Super Gainer',99.9,'O Super Gainers (3000g) Max Titanium auxilia na formação muscular e melhora o rendimento durante os treinos. Possui uma combinação eficaz de creatina, maltodextrina e waxymaize.','Hipercalorico','705138-vitamina_de_frutas.png'),(38,'HI-MASS',109.9,'Masstodon® da linha Caveira Preta Series® da Black Skull USA™ é uma nutrição em formato portátil e para o dia a dia. Um hipercalórico para auxiliar na recuperação muscular após, exercícios intensos e no aumento da massa magra. Contém 12g de Proteína, 138g de Carboidrato, 2g de Gorduras e 618kcal por dose! Recomendado o consumo de 160g (16 colheres de sopa). INGREDIENTES: Maltodextrina, proteína concentrada do soro de leite, cacau em pó, aromatizante e edulcorante sucralose. NÃO CONTEM GLÚTEN.','Hipercalorico','HI-MASS_Chocolate_2.png'),(39,'Max Mass Titanium - 3KG',89.77,'O Mass Titanium 17500 da Max Titanium foi elaborado a partir de pesquisas revolucionárias na área de nutrição, oferecendo o aporte de nutrientes necessário para o máximo rendimento; sua fórmula visa o ganho de massa. O Mass Titanium 17500 contém em sua fórmula exclusiva três tipos de proteínas com alto valor biológico: Whey protein concentrada, colágeno hidrolisado e albumina do ovo.','Hipercalorico','mass-titanium1-7f8724c01c49a5fcbf16160948642754-640-0.png'),(40,'Mass beef - 3kg',169.9,'Mass Beef RM2 é um Hipercalorico sem Lactose em Curitiba desenvolvido com o objetivo de fornecer uma complementação alimentar calórica, com excelente fonte proteica.  Sendo Beef (proteína isolada e hidrolisada de carne) e albumina, proteínas animais de rápida e lenta absorção para que você se mantenha no estado anabólico ao longo do dia e noite. Sua composição contém waxy maize (amido de milho modificado) um carboidrato que possui uma rápida absorção.','Hipercalorico','MASSBEEF-RM2-3kg-chocolate.png'),(41,'KIT HIPERCALORICOS NEWNUTRITION',222.11,'3 HIPERCALORICOS NEW NUTRITION 0 LACTOSE','Hipercalorico','como-tomar-hipercalorico.png'),(42,'HIPERCALÓRICO TOPWAY',20,'Para fornecer mais energia para o treino e auxiliar na construção de massa muscular forte. HIPERCALÓRICO TOPWAY® com 12g de proteína, 138g de carboidrato e 618 kcal em uma única dose.','Hipercalorico','19_4_0_012_imagemhipercaloricotopway15kgfoto.png'),(43,'BIG MASS GROWTH',111,'Big Mass é um suplemento hipercalórico desenvolvido especialmente para aqueles que buscam alcançar a hipertrofia e ganhar massa muscular. Estrategicamente rico em proteínas, MCT, creatina e carboidratos, o Big Mass Pro é capaz de auxiliar na busca pelos melhores resultados para aqueles que treinam diariamente.','Hipercalorico','big-mass.png'),(44,'MASS PREMIUM 14400 3W 3KG NEW MILLEN ',71.68,'Mass Premium da New Millen foi desenvolvida para praticantes de atividades físicas, que necessitam aumentar a ingestão energética e de nutrientes. É composta por proteínas Concentrada, Isolada e Hidrosilada do soro do leite, Caseína e Albumina. Leva em sua fórmula o exclusivo complexo vitamínico mineral ZEMAG, com grande importância na estimulação síntese protéica muscular.','Hipercalorico','mass_premium_14400_3w_3kg_new_millen_721_1_20201215124312.png'),(45,'Lipodrol - 60caps',66.66,'O Lipodrol é um termogênico que oferta 286mg de cafeína na porção recomendada para o consumo.','Termogenicos','termogenico-lipodrol-cafeina-60-capsulas-integralmedica.png'),(46,'Therma HD Night Time - 90 Caps',79.9,' O Therma HD Integralmédica é ideal para quem busca máxima queima de gordura e emagrecimento, sendo um suplemento de ação constante dia/noite, sem efeitos colaterais como agitação ou irritação. Para conquistar resultados sólidos com base em uma suplementação de qualidade.','Termogenicos','THERMA-HD-NIGHT-TIME.png'),(47,'Sineflex Hardcore - 120 caps',77.54,'Sineflex hardcore é um termogênico inovador 2X mais potente com a tecnologia pure bocker, um blend exclusivo da Power Supplements.','Termogenicos','7803119_sineflex-hardcore-power-supplements-5923_m1_636045360933796000.png'),(48,'T SEK - 120G',32,'O T-Sek 120g Power Supplements é uma fórmula inovadora cujo o objetivo é te auxiliar na perda do inchaço e peso causados pela retenção de água. Um de seus diferenciais é a presença de colágeno em sua fórmula, que auxilia na firmeza da pele e ajudará na firmeza do abdômen enquanto seu corpo elimina o excesso de água e perde medidas.','Termogenicos','t_sek_120g_power_supplements_379_1_20190225162934.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productsCategory`
--

DROP TABLE IF EXISTS `productsCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productsCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_productsCategory_1_idx` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productsCategory`
--

LOCK TABLES `productsCategory` WRITE;
/*!40000 ALTER TABLE `productsCategory` DISABLE KEYS */;
INSERT INTO `productsCategory` VALUES (14,'creatina'),(15,'Hipercalorico'),(16,'Termogenicos');
/*!40000 ALTER TABLE `productsCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (19,'asdadasdsa@asdada','asdada','$2a$10$8QV9buLOg8oIjcLCY4Wk3urTehf.uyFSsE.lye/lUBplk2Fb2N1Ni'),(20,'careta7855@gmail.com','Ana Banana','$2a$10$YE2zeYsb6ipSCAYeb6ptw.YoI3nNCtHPHIeN41KPQUyeErp9chPkK'),(21,'brunolegal10@gmail.com','Bruno','$2a$10$CGyWoGMtgAhhyAVxgq6S1u8UdiX8TuNxAEmgGO8YRqcdPEbH5Mcpi'),(22,'brunorpcwb@gmail.com','Bruno E Pereira','$2a$10$zfe3JSKTvi3PeJmPnx9R8utyWYDil8NwI20d.YCCEcnRKXAo6Nw4.'),(23,'pinto@gmail.com','pinto','$2a$10$n1Jl68CYKz59PcBHpUsIiOGwDmNYpBpcYnuy3kwDTNDRwB0Pan0Ha'),(24,'juju@nino.com','Edicleia Muito Linda ','$2a$10$uBD6z4XFTseqN4IVRVEFe./10nBncRsbSC5GdH16lSsQfhf8GZfWO');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-24  3:18:52
