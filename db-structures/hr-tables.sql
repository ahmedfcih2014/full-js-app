-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 19, 2021 at 01:35 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple_erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `advances`
--

CREATE TABLE `advances` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `operation_type` enum('withdraw','deposit') NOT NULL DEFAULT 'withdraw',
  `operation_amount` double(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `advances`
--

INSERT INTO `advances` (`id`, `employee_id`, `operation_type`, `operation_amount`, `created_at`, `updated_at`) VALUES
(1, 2, 'withdraw', 1500.00, '2021-01-19 11:08:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` int(11) NOT NULL,
  `operation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `operation_type` enum('attendance','leave') NOT NULL DEFAULT 'attendance',
  `employee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `operation_date`, `operation_type`, `employee_id`, `created_at`, `updated_at`) VALUES
(2, '2021-01-12 14:05:00', 'attendance', 4, '2021-01-12 14:01:23', NULL),
(3, '2021-01-19 06:40:07', 'attendance', 2, '2021-01-19 11:49:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deductions_n_bonuses`
--

CREATE TABLE `deductions_n_bonuses` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `operation_type` enum('deduction','bonus') NOT NULL DEFAULT 'deduction',
  `operation_amount` double(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `national_id` varchar(255) NOT NULL,
  `join_date` date NOT NULL DEFAULT current_timestamp(),
  `salary` decimal(10,2) NOT NULL DEFAULT 0.00,
  `job_title_id` int(11) NOT NULL,
  `setting_id` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `national_id`, `join_date`, `salary`, `job_title_id`, `setting_id`, `phone`, `created_at`, `updated_at`) VALUES
(2, 'Fatima', '29101011111110', '2016-01-01', '15000.00', 1, 1, '01010101010', '2021-01-12 14:00:15', NULL),
(4, 'New Employee Updated', '29604270101391', '2021-01-01', '1000.00', -3, 2, '01033406144', '2021-01-19 11:27:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `emplyee_settings`
--

CREATE TABLE `emplyee_settings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `yearly_vacations` int(11) NOT NULL DEFAULT 21,
  `work_day_start` varchar(25) DEFAULT NULL,
  `work_day_end` varchar(25) DEFAULT NULL,
  `weakly_vacations` int(11) NOT NULL DEFAULT 2,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emplyee_settings`
--

INSERT INTO `emplyee_settings` (`id`, `name`, `yearly_vacations`, `work_day_start`, `work_day_end`, `weakly_vacations`, `created_at`, `updated_at`) VALUES
(1, 'Full Time', 30, '9:00 AM', '5:00 PM', 2, '2021-01-10 15:32:38', NULL),
(2, 'Part Time', 21, '2:00 PM', '6:00 PM', 2, '2021-01-10 15:56:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_titles`
--

CREATE TABLE `job_titles` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_titles`
--

INSERT INTO `job_titles` (`id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(1, 'testing', 'testing qwdqwd', '2021-01-10 15:52:27', NULL),
(2, 'Tester', 'Tester', '2021-01-12 14:01:00', NULL),
(3, 'new', 'new', '2021-01-19 10:32:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `salary` double(10,2) DEFAULT 0.00,
  `date_from` date NOT NULL DEFAULT current_timestamp(),
  `date_to` date NOT NULL DEFAULT current_timestamp(),
  `deduction_amount` double(10,2) NOT NULL DEFAULT 0.00,
  `bonus_amount` double(10,2) NOT NULL DEFAULT 0.00,
  `advances_amount` double(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advances`
--
ALTER TABLE `advances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_FK` (`employee_id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_FK` (`employee_id`);

--
-- Indexes for table `deductions_n_bonuses`
--
ALTER TABLE `deductions_n_bonuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_FK` (`employee_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_title_FK` (`job_title_id`),
  ADD KEY `setting_FK` (`setting_id`);

--
-- Indexes for table `emplyee_settings`
--
ALTER TABLE `emplyee_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_titles`
--
ALTER TABLE `job_titles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_FK` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advances`
--
ALTER TABLE `advances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deductions_n_bonuses`
--
ALTER TABLE `deductions_n_bonuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `emplyee_settings`
--
ALTER TABLE `emplyee_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_titles`
--
ALTER TABLE `job_titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;