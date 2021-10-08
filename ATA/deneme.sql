-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Anamakine: localhost
-- Üretim Zamanı: 15 Mar 2020, 01:07:29
-- Sunucu sürümü: 5.5.16
-- PHP Sürümü: 5.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Veritabanı: `deneme`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  `Address` varchar(256) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Tablo döküm verisi `company`
--

INSERT INTO `company` (`ID`, `Name`, `Address`, `Phone`) VALUES
(0, 'Liman', 'Emmos Ave', '2147483647');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `ID` int(2) NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL,
  `URL` varchar(256) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Keywords` varchar(256) NOT NULL,
  `Content` text NOT NULL,
  `Header` text NOT NULL,
  `Lang` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Tablo döküm verisi `pages`
--

INSERT INTO `pages` (`ID`, `Name`, `URL`, `Description`, `Keywords`, `Content`, `Header`, `Lang`) VALUES
(1, 'help name', '/help', 'help des', 'help key', 'help ulan', '', 'TR');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reports`
--

CREATE TABLE IF NOT EXISTS `reports` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IP` varchar(15) NOT NULL,
  `URL` text NOT NULL,
  `Time` int(11) NOT NULL,
  `Method` varchar(6) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Tablo döküm verisi `reports`
--

INSERT INTO `reports` (`ID`, `IP`, `URL`, `Time`, `Method`) VALUES
(1, '::1', '/', 1584209982, 'GET'),
(2, '::1', '/assets/img/bootstraper-logo.png', 1584209982, 'GET'),
(3, '::1', '/images/agency/logo-inverse-140x37.png', 1584209982, 'GET'),
(4, '::1', '/favicon.ico', 1584209985, 'GET'),
(5, '::1', '/', 1584219522, 'GET'),
(6, '::1', '/assets/img/bootstraper-logo.png', 1584219524, 'GET'),
(7, '::1', '/images/agency/logo-inverse-140x37.png', 1584219525, 'GET'),
(8, '::1', '/favicon.ico', 1584219527, 'GET'),
(9, '::1', '/', 1584219530, 'GET'),
(10, '::1', '/assets/img/bootstraper-logo.png', 1584219530, 'GET'),
(11, '::1', '/images/agency/logo-inverse-140x37.png', 1584219531, 'GET'),
(12, '::1', '/favicon.ico', 1584219533, 'GET'),
(13, '::1', '/', 1584219544, 'GET'),
(14, '::1', '/assets/img/bootstraper-logo.png', 1584219544, 'GET'),
(15, '::1', '/images/agency/logo-inverse-140x37.png', 1584219544, 'GET'),
(16, '::1', '/favicon.ico', 1584219546, 'GET'),
(17, '::1', '/session/login', 1584219557, 'GET'),
(18, '::1', '/session/assets/img/bootstraper-logo.png', 1584219557, 'GET'),
(19, '::1', '/favicon.ico', 1584219559, 'GET'),
(20, '::1', '/admin', 1584220402, 'GET'),
(21, '::1', '/assets/img/bootstraper-logo.png', 1584220403, 'GET'),
(22, '::1', '/images/agency/logo-inverse-140x37.png', 1584220403, 'GET'),
(23, '::1', '/favicon.ico', 1584220406, 'GET');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `ValueINT` int(2) NOT NULL,
  `Value` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Tablo döküm verisi `settings`
--

INSERT INTO `settings` (`ID`, `UserID`, `Name`, `ValueINT`, `Value`) VALUES
(1, 1, 'Lang', 0, 'Français'),
(2, 0, 'Lang', 0, 'Türkçe');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OverID` int(11) NOT NULL,
  `EMail` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Name` varchar(128) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `Surname` varchar(128) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `CompanyID` int(11) NOT NULL,
  `Position` varchar(128) CHARACTER SET utf32 COLLATE utf32_turkish_ci NOT NULL,
  `Phone` varchar(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`ID`, `OverID`, `EMail`, `Password`, `Name`, `Surname`, `CompanyID`, `Position`, `Phone`) VALUES
(1, 0, 'mustafa.ozver@hotmail.com', '267c73642f97c81bb586837866bae118182ff76f', 'Mustafa', 'ÖZVER', 0, '', ''),
(2, 0, 'admin@admin', '7dd12f3a9afa0282a575b8ef99dea2a0c1becb51', 'Admin', '', 0, '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
