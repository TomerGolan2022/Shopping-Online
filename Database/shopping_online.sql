-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2022 at 03:02 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_online`
--
CREATE DATABASE IF NOT EXISTS `shopping_online` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shopping_online`;
-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `isActive` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cartId`, `userId`, `startDate`, `isActive`) VALUES
(17, 4, '2022-10-02', 'Yes'),
(18, 8, '2022-10-01', 'No'),
(19, 8, '2022-10-02', 'No'),
(20, 8, '2022-10-02', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'מוצרי חלב וביצים'),
(2, 'ירקות'),
(3, 'עוף'),
(4, 'פירות'),
(5, 'בשר'),
(6, 'דגים');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemId`, `productId`, `amount`, `totalPrice`, `cartId`) VALUES
(121, 4, '3', '98.70', 18),
(123, 8, '2', '101.80', 18),
(124, 7, '1', '34.90', 18),
(125, 6, '2', '63.80', 18),
(126, 5, '3', '98.70', 18),
(127, 9, '3', '17.70', 19),
(128, 10, '2', '9.80', 19),
(129, 11, '5', '32.50', 19),
(130, 12, '2', '11.80', 19),
(131, 1, '10', '49.00', 19),
(132, 5, '3', '98.70', 20),
(133, 3, '2', '11.80', 20),
(134, 2, '2', '11.80', 20);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `deliveryDate` date NOT NULL,
  `orderDate` date NOT NULL,
  `creditCard` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `totalPrice`, `city`, `street`, `deliveryDate`, `orderDate`, `creditCard`) VALUES
(12, 8, 18, '397.90', 'Tel-Aviv', 'Hertzel 17', '2022-10-05', '2022-10-03', '************2266'),
(13, 8, 19, '120.80', 'Ashkelon', 'Lachish 12', '2022-10-05', '2022-10-03', '************9499'),
(14, 8, 20, '122.30', 'Tel-Aviv', 'Lachish 12', '2022-10-05', '2022-10-03', '************1611');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `categoryId`, `price`, `imageName`) VALUES
(1, 'מעדן חלבון PRO 11 בטעם וניל', 1, '4.90', '9d9fc026-f35c-47b8-9de0-9064238c015b.jpg'),
(2, 'עגבנייה 1 ק\"ג', 2, '5.90', '811d662f-281c-4edb-8e24-f904ea0d21cf.jpg'),
(3, 'מלפפון 1 ק\"ג', 2, '5.90', '68d0f56a-7865-476a-8e8c-e7b8e4594e5f.jpg'),
(4, 'כרעיים עוף טרי כ-1 ק\"ג', 3, '32.90', '7fc0755d-d2de-481f-a00e-12a429e074e6.jpg'),
(5, 'שניצל עוף פרוס טרי כ-1 ק\"ג', 3, '32.90', '69052fd1-ea05-4f7a-8450-e010d8b10f1d.jpg'),
(6, 'חזה עוף שלם טרי כ-1 ק\"ג', 3, '31.90', '1a757a55-f025-46f2-8d79-2ecd9c8f5df7.png'),
(7, 'שוקיים עוף טרי כ-1 ק\"ג', 3, '34.90', 'cfc71ddd-96cb-494a-90c8-1bd381fb5ffe.jpeg'),
(8, 'בשר טחון טרי כ-1 ק\"ג', 5, '50.90', '8405807e-4399-4dc1-bc2a-0d7809188eec.png'),
(9, 'חלב בקרטון 3% 1 ליטר', 1, '5.90', '17489fd6-c6b9-434b-8c4d-a57ba40eff18.jpg'),
(10, 'גבינה לבנה 5% 250 גרם', 1, '4.90', 'c4614cf0-a205-46a0-8ed1-22dbe771ef43.jpg'),
(11, 'משקה חלבון PRO 20 בטעם בננה', 1, '6.50', 'f67de8cf-9b0f-434b-8ffe-251ee48f6ee7.jpg'),
(12, 'קוטג\' שטראוס 5% 250 גרם', 1, '5.90', 'b1cf9bca-f128-4ae2-9a10-d28c9fe95986.jpg'),
(13, 'בצל יבש 1 ק\"ג', 2, '4.90', '6670ffe1-790e-4d94-9425-dfeff16bb018.png'),
(14, 'תפוח אדמה לבן 1 ק\"ג', 2, '3.90', '4c8b8e70-8fe2-4def-b21c-d1101e96e327.jpg'),
(15, 'תפוח עץ חרמון 1 ק\"ג', 4, '11.90', 'b697e144-cd1e-4f26-be61-731b52b6cb57.jpg'),
(16, 'בננה 1 ק\"ג', 4, '8.90', '1d49fdce-e1a6-4f7c-b4e0-15c139ffb1aa.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(50) NOT NULL,
  `identifyNumber` varchar(9) NOT NULL,
  `password` varchar(128) NOT NULL,
  `city` varchar(20) NOT NULL,
  `street` varchar(30) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `identifyNumber`, `password`, `city`, `street`, `role`) VALUES
(4, 'Tomer', 'Golan', 'tomergolan2022@gmail.com', '111111111', 'cbcb2db6539e50ee06e0ea2d95e722074edef25ff9a6aac09e2cd80ed3e3bb7abb6369d94e280b14970c7bbf6af7362715db4909572a34c00fa407b5291918f3', 'Ashkelon', 'Lachish 12', 'Admin'),
(8, 'Bart', 'Simpson', 'bartsimpson1990@gmail.com', '335164774', 'cbcb2db6539e50ee06e0ea2d95e722074edef25ff9a6aac09e2cd80ed3e3bb7abb6369d94e280b14970c7bbf6af7362715db4909572a34c00fa407b5291918f3', 'Tel-Aviv', 'Lachish', 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`,`productId`,`cartId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`,`userId`,`cartId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
