-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2020 at 11:49 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `butyfuldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorytbl`
--

CREATE TABLE `categorytbl` (
  `CategoryId` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorytbl`
--

INSERT INTO `categorytbl` (`CategoryId`, `CategoryName`) VALUES
(1, 'Category 1'),
(2, 'Category 2');

-- --------------------------------------------------------

--
-- Table structure for table `itemmastertbl`
--

CREATE TABLE `itemmastertbl` (
  `ItemId` int(11) NOT NULL,
  `ItemCode` varchar(255) NOT NULL COMMENT 'This is Alphanumeric Code for Item',
  `Description` varchar(255) NOT NULL COMMENT 'Only labeled Description but it is the name of item.',
  `Unit` varchar(5) NOT NULL COMMENT '1-PCS,2-KG,3-Other',
  `Inventory` int(11) NOT NULL COMMENT 'No of Inventory',
  `ActualCost` double NOT NULL COMMENT 'The cost per unit',
  `TotalValue` double NOT NULL COMMENT 'Inventory*Actual Cost',
  `CategoryId` int(11) NOT NULL COMMENT 'The reference of Category Tbl',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemmastertbl`
--

INSERT INTO `itemmastertbl` (`ItemId`, `ItemCode`, `Description`, `Unit`, `Inventory`, `ActualCost`, `TotalValue`, `CategoryId`, `CreatedAt`) VALUES
(1, 'Item 1', 'Item 1 Description', 'PCS', 211, 50, 5000, 1, '2020-07-30 09:35:19'),
(2, 'BForece', 'INJ', 'Other', 227, 150, 21000, 1, '2020-07-30 03:35:03'),
(3, 'Item 2', 'Item2 description', 'KG', 179, 10, 500, 2, '2020-07-30 09:40:12'),
(4, 'kfkf', 'ffgg', 'KG', 50, 234, 2808, 2, '2020-07-30 03:52:07'),
(5, 'new item', 'new item description', 'KG', 89, 100, 1000, 2, '2020-07-30 09:41:24'),
(6, 'demo', 'demo dewc', 'PCS', 10, 100, 1000, 1, '2020-07-30 09:40:47');

-- --------------------------------------------------------

--
-- Table structure for table `modulestbl`
--

CREATE TABLE `modulestbl` (
  `ModuleId` int(11) NOT NULL,
  `ModuleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modulestbl`
--

INSERT INTO `modulestbl` (`ModuleId`, `ModuleName`) VALUES
(1, 'Item Master'),
(2, 'Item Master Report'),
(3, 'Production'),
(4, 'Users');

-- --------------------------------------------------------

--
-- Table structure for table `permissiontbl`
--

CREATE TABLE `permissiontbl` (
  `PermissionId` int(11) NOT NULL,
  `ModuleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `flgIsAccess` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permissiontbl`
--

INSERT INTO `permissiontbl` (`PermissionId`, `ModuleId`, `UserId`, `flgIsAccess`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(4, 4, 1, 1),
(5, 1, 2, 1),
(6, 2, 2, 0),
(7, 3, 2, 0),
(8, 4, 2, 0),
(9, 1, 3, 1),
(10, 2, 3, 1),
(11, 3, 3, 1),
(12, 4, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productiontbl`
--

CREATE TABLE `productiontbl` (
  `ProductionId` int(11) NOT NULL,
  `ProductionDate` date NOT NULL COMMENT 'The date of production',
  `TblId` int(11) NOT NULL COMMENT 'The Id of table No.',
  `ProductionTime` time NOT NULL COMMENT 'The Time of Production',
  `MasterBox` int(11) NOT NULL COMMENT 'The number of Master Boxes Produced.',
  `ItemId` int(11) NOT NULL COMMENT 'This is for the Item Id',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'The timestamp for creation.'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productiontbl`
--

INSERT INTO `productiontbl` (`ProductionId`, `ProductionDate`, `TblId`, `ProductionTime`, `MasterBox`, `ItemId`, `CreatedAt`) VALUES
(1, '2020-07-29', 1, '00:12:00', 10, 1, '2020-07-29 17:11:47'),
(2, '2020-07-14', 2, '14:03:00', 10, 1, '2020-07-29 18:19:07'),
(3, '2020-07-30', 2, '08:48:00', 10, 1, '2020-07-30 03:18:36'),
(4, '2020-07-30', 3, '08:49:00', 50, 2, '2020-07-30 03:19:34'),
(5, '2020-07-30', 1, '09:09:00', 24, 2, '2020-07-30 03:20:53'),
(6, '2020-07-30', 2, '09:51:00', 45, 1, '2020-07-30 03:21:39'),
(7, '2020-07-30', 4, '09:09:00', 6, 3, '2020-07-30 03:29:17'),
(8, '2020-07-30', 4, '09:00:00', 6, 3, '2020-07-30 03:32:08'),
(9, '2020-07-30', 4, '09:57:00', 100, 3, '2020-07-30 03:34:11'),
(10, '2020-07-29', 3, '20:08:00', 13, 2, '2020-07-30 03:35:03'),
(11, '2020-07-28', 1, '00:00:00', 2, 1, '2020-07-30 03:36:31'),
(12, '2020-07-22', 2, '08:08:00', 23, 4, '2020-07-30 03:38:51'),
(13, '2020-07-22', 2, '09:08:00', 12, 4, '2020-07-30 03:51:35'),
(14, '2020-07-22', 1, '09:08:00', 3, 4, '2020-07-30 03:52:07'),
(15, '2020-07-15', 3, '09:01:00', 12, 5, '2020-07-30 03:56:20'),
(16, '2020-07-30', 4, '03:07:00', 34, 1, '2020-07-30 09:35:19'),
(17, '2020-07-30', 0, '15:07:00', 0, 0, '2020-07-30 09:39:56'),
(18, '2020-07-30', 0, '15:07:00', 23, 3, '2020-07-30 09:40:12'),
(19, '2020-07-22', 3, '15:07:00', 67, 5, '2020-07-30 09:41:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbnotbl`
--

CREATE TABLE `tbnotbl` (
  `TblId` int(11) NOT NULL,
  `TblNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbnotbl`
--

INSERT INTO `tbnotbl` (`TblId`, `TblNo`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `usertbl`
--

CREATE TABLE `usertbl` (
  `UserId` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertbl`
--

INSERT INTO `usertbl` (`UserId`, `Username`, `Password`, `isAdmin`, `CreatedAt`) VALUES
(1, 'admin', 'admin', 1, '2020-07-29 16:48:11'),
(2, 'sanket', 'sanket', 0, '2020-07-29 18:20:26'),
(3, 'viru', 'viru321123', 1, '2020-07-30 03:20:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorytbl`
--
ALTER TABLE `categorytbl`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `itemmastertbl`
--
ALTER TABLE `itemmastertbl`
  ADD PRIMARY KEY (`ItemId`);

--
-- Indexes for table `modulestbl`
--
ALTER TABLE `modulestbl`
  ADD PRIMARY KEY (`ModuleId`);

--
-- Indexes for table `permissiontbl`
--
ALTER TABLE `permissiontbl`
  ADD PRIMARY KEY (`PermissionId`);

--
-- Indexes for table `productiontbl`
--
ALTER TABLE `productiontbl`
  ADD PRIMARY KEY (`ProductionId`);

--
-- Indexes for table `tbnotbl`
--
ALTER TABLE `tbnotbl`
  ADD PRIMARY KEY (`TblId`);

--
-- Indexes for table `usertbl`
--
ALTER TABLE `usertbl`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorytbl`
--
ALTER TABLE `categorytbl`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `itemmastertbl`
--
ALTER TABLE `itemmastertbl`
  MODIFY `ItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `modulestbl`
--
ALTER TABLE `modulestbl`
  MODIFY `ModuleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permissiontbl`
--
ALTER TABLE `permissiontbl`
  MODIFY `PermissionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productiontbl`
--
ALTER TABLE `productiontbl`
  MODIFY `ProductionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbnotbl`
--
ALTER TABLE `tbnotbl`
  MODIFY `TblId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usertbl`
--
ALTER TABLE `usertbl`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
