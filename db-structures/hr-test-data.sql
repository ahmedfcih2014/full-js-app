-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 13, 2021 at 09:00 PM
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

--
-- Dumping data for table `advances`
--

INSERT INTO `advances` (`id`, `employee_id`, `operation_type`, `operation_amount`, `created_at`, `updated_at`) VALUES
(2, 1, 'deposit', 500.00, '2021-01-13 19:08:23', NULL);

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `operation_date`, `operation_type`, `employee_id`, `created_at`, `updated_at`) VALUES
(1, '2021-01-13 12:30:00', 'attendance', 2, '2021-01-13 17:07:10', NULL);

--
-- Dumping data for table `deductions_n_bonuses`
--

INSERT INTO `deductions_n_bonuses` (`id`, `employee_id`, `operation_type`, `operation_amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'bonus', 150.00, '2021-01-13 17:41:45', NULL);

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `national_id`, `join_date`, `salary`, `job_title_id`, `setting_id`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'Ahmed Hesham', '29604270101391', '2018-09-26', '15000.00', 4, 1, '01033406144', '2021-01-13 16:56:18', NULL),
(2, 'Karim', '29301010111111', '2020-12-01', '7000.00', 3, 2, '01234567890', '2021-01-13 17:29:57', NULL);

--
-- Dumping data for table `emplyee_settings`
--

INSERT INTO `emplyee_settings` (`id`, `name`, `yearly_vacations`, `work_day_start`, `work_day_end`, `weakly_vacations`, `created_at`, `updated_at`) VALUES
(1, 'Full Time Job', 21, '9:00 AM', '5:00 PM', 2, '2021-01-13 16:54:35', NULL),
(2, 'Part Time Job', 14, '9:00 AM', '5:00 PM', 4, '2021-01-13 16:57:01', NULL);

--
-- Dumping data for table `job_titles`
--

INSERT INTO `job_titles` (`id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(3, 'Front End Engineer', 'Front End Engineer', '2021-01-09 15:53:55', NULL),
(4, 'Software Engineer', 'Software Engineer', '2021-01-09 16:52:58', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
