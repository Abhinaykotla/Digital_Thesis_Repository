-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wdm`
--

-- --------------------------------------------------------

--
-- Table structure for table `peer_reviews`
--

CREATE TABLE `peer_reviews` (
  `review_id` int(11) NOT NULL,
  `thesis_id` int(11) DEFAULT NULL,
  `reviewer_id` int(11) DEFAULT NULL,
  `review_comment` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peer_reviews`
--

INSERT INTO `peer_reviews` (`review_id`, `thesis_id`, `reviewer_id`, `review_comment`, `rating`, `created_at`, `updated_at`) VALUES
(20, 14, 13, 'Informative', 5, '2024-12-02 06:20:07', '2024-12-02 06:20:07'),
(22, 20, 10, 'Very useful!', 5, '2024-12-02 07:05:47', '2024-12-02 07:05:47'),
(23, 19, 10, 'Helps understand time complexities in a new way\n', 5, '2024-12-02 07:06:21', '2024-12-02 07:06:21'),
(24, 18, 10, 'Future works: Add a way to integrate it into other applications with APIs\n', 4, '2024-12-02 07:06:57', '2024-12-02 07:06:57'),
(25, 17, 14, 'Hepls understanding of sockets and multithreading in Python easily. +1', 5, '2024-12-02 07:09:52', '2024-12-02 07:09:52'),
(26, 18, 14, 'Helpfull in support chat applications', 5, '2024-12-02 07:10:23', '2024-12-02 07:10:23');

-- --------------------------------------------------------

--
-- Table structure for table `theses`
--

CREATE TABLE `theses` (
  `thesis_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theses`
--

INSERT INTO `theses` (`thesis_id`, `title`, `abstract`, `topic`, `author_id`, `year`, `keywords`, `file_url`, `created_at`, `updated_at`, `email`, `author`) VALUES
(14, 'News Summarization using T5 Transformer', 'Business Problem: Readers frequently do not have time to read entire articles, and reading merely the headline and subheadings does not provide them with a complete picture of the content. News organizations such as the Associated Press, Bloomberg, and Reuters are actively trying to automate stories in areas such as finance and sports. It is hard for news organizations to produce summaries for every piece they publish. As a result, having in-built tools that summarize stories for users may be a good idea for news apps.', 'Text Summarization', 10, 2024, 'T5, ML, Summarization, News', '\\uploads\\f8da6424ab9205e6d6c645400.pdf', '2024-12-02 03:32:37', '2024-12-02 03:32:37', 'abhinaykotla@gmail.com', 'Abhinay Kotla'),
(17, 'Fault Tolerant Two Phase Commit Protocol ', 'This project demonstrates a distributed fault-tolerant 2-phase commit (2PC) protocol with failure simulations, covering multiple parts of the protocol.', 'Distributed Systems', 10, 2024, '2PC, DS, Fault Tolerant', '\\uploads\\b8268d538240f677e69b65801.pdf', '2024-12-02 06:07:44', '2024-12-02 07:08:57', 'abhinaykotla@gmail.com', 'Abhinay Kotla'),
(18, 'Emotionally Intelligent Chatbot', 'This project aims to develop a chatbot with emotional intelligence, capable of understanding and responding to user emotions. The chatbot will be designed to detect the emotional tone of a conversation and adapt its responses to create a more empathetic interaction. The project will involve multiple phases, from building a basic chatbot to implementing emotion detection and, optionally, multimodal capabilities.', 'AI ', 12, 2024, 'AI, Chat, ML', '\\uploads\\b8268d538240f677e69b65802.pdf', '2024-12-02 06:30:07', '2024-12-02 06:30:07', 'shriisudhan@gmail.com', 'Kannan Shrii Sudhan'),
(19, 'Search Algorithm Performance Comparison', 'This project provides a basic comparison of four distinct search algorithms, demonstrating their performance across varying input sizes. The project is implemented in Python and includes the following algorithms:\r\n\r\nLinear Search\r\nBinary Search (within a sorted array)\r\nBinary Search Tree\r\nRed-Black Tree', 'Computing', 14, 2024, 'computing', '\\uploads\\b8268d538240f677e69b65803.pdf', '2024-12-02 06:33:29', '2024-12-02 06:33:29', 'yogeswar@gmail.com', 'Kondreddigari Yogeswar Reddy'),
(20, 'Gender recognisition voice', 'This project uses multiple machine learning models to recognize the gender of a speaker from a .wav audio file. It analyzes 14 individual traits of human voice to make the prediction.', 'Neural Networks', 10, 2024, 'ML, Regression', '\\uploads\\b8268d538240f677e69b65804.pdf', '2024-12-02 07:03:40', '2024-12-02 07:03:40', 'abhinaykotla@gmail.com', 'Abhinay Kotla');

-- --------------------------------------------------------

--
-- Table structure for table `thesis_statistics`
--

CREATE TABLE `thesis_statistics` (
  `stat_id` int(11) NOT NULL,
  `thesis_id` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `downloads` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thesis_statistics`
--

INSERT INTO `thesis_statistics` (`stat_id`, `thesis_id`, `views`, `downloads`) VALUES
(10, 14, 52, 6),
(12, 17, 32, 4),
(13, 18, 47, 2),
(25, 19, 13, 0),
(27, 20, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','author') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(11) DEFAULT NULL,
  `gender` varchar(11) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `email`, `password`, `role`, `created_at`, `phone`, `gender`, `bio`) VALUES
(1, 'Admin Main', 'admin@gmail.com', '$2b$10$udATnP.Q9ZMbpyBDLaNQFuJ0V82FFWnVb7YiQHE0DW0qq/tUR8uHu', 'admin', '2024-12-02 02:57:56', '999999999', 'other', 'Main Admin with user ID 1'),
(10, 'Abhinay Kotla', 'abhinaykotla@gmail.com', '$2b$10$piZESL22vXqQBNttkjlYdeV9qIKCHY1iamo2A2O1i4bHRDHNpmb1K', 'author', '2024-12-02 03:11:25', '1002195827', 'male', 'Abhinay kotla bio: \nInterested in AI and ML. '),
(11, 'Ananya ', 'ananya@gmail.com', '$2b$10$nMWaM8R47UkCpB7Lzk9JU.3D65QSvPikGvVRHUZWlv1opx.AGtxzu', 'author', '2024-12-02 03:21:12', '1002170527', 'female', 'Katram Ananya'),
(12, 'Kannan Shrii Sudhan', 'shriisudhan@gmail.com', '$2b$10$qSGK88k8z5bB1W9OkZzc1eG7CLTL2/7ws2C0AkEv.G4mHyinrKp/u', 'author', '2024-12-02 03:24:06', '1002167382', 'male', 'Kannan Shrii Sudhan'),
(13, 'Kalidindi Harshavardhan Varma', 'harshavardan@gmail.com', '$2b$10$aLsRxgo.jBptX3ixBjBWs.VLkF6vLsp7bkb03ih1n2IIL0VUuFhZ2', 'author', '2024-12-02 03:24:45', '1002157596', 'male', 'Kalidindi Harshavardhan Varma'),
(14, 'Kondreddigari Yogeswar Reddy', 'yogeswar@gmail.com', '$2b$10$xJZy.vTsDI3rJ6KwgknFQO9mn6a6vv2loZQizz3jDwNIfO8XEmw8O', 'author', '2024-12-02 03:26:23', '1002123130', 'male', 'Kondreddigari Yogeswar Reddy');

-- --------------------------------------------------------

--
-- Table structure for table `user_chats`
--

CREATE TABLE `user_chats` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `update_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_chats`
--

INSERT INTO `user_chats` (`id`, `sender_id`, `name`, `receiver_id`, `message`, `date`, `update_time`) VALUES
(101, 11, 'Your Name', 10, 'hey', '2024-12-01 23:55:01', '2024-12-02 05:55:01'),
(102, 10, 'Your Name', 11, 'hello', '2024-12-01 23:55:05', '2024-12-02 05:55:05'),
(103, 10, 'Your Name', 11, 'test', '2024-12-01 23:57:58', '2024-12-02 05:57:58'),
(107, 10, 'Your Name', 1, 'Assign admin to me ', '2024-12-02 00:10:51', '2024-12-02 06:10:51'),
(108, 12, 'Your Name', 1, 'Hello admin', '2024-12-02 00:11:47', '2024-12-02 06:11:47'),
(109, 14, 'Your Name', 1, 'Can you delete inappropriate comments on my thesis please. Thanks in advance.', '2024-12-02 01:12:10', '2024-12-02 07:12:10'),
(112, 1, 'Your Name', 14, 'IC issue', '2024-12-02 01:12:39', '2024-12-02 07:12:39'),
(122, 14, 'Your Name', 1, 'I am struck, please help', '2024-12-02 01:24:07', '2024-12-02 07:24:07'),
(123, 1, 'Your Name', 14, 'Done, Deleted the comment. Please reload the page to see the changes', '2024-12-02 01:24:54', '2024-12-02 07:24:54'),
(124, 14, 'Your Name', 1, 'hello', '2024-12-02 01:26:31', '2024-12-02 07:26:31'),
(125, 1, 'Your Name', 14, 'Hello Yogesh, Ho can I help?', '2024-12-02 01:26:56', '2024-12-02 07:26:56'),
(126, 10, 'Your Name', 1, 'Help me manage comments on my sub', '2024-12-02 20:25:41', '2024-12-03 02:25:41'),
(127, 1, 'Your Name', 10, 'Sure let me know how I can help', '2024-12-02 20:25:57', '2024-12-03 02:25:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `thesis_id` (`thesis_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `theses`
--
ALTER TABLE `theses`
  ADD PRIMARY KEY (`thesis_id`);

--
-- Indexes for table `thesis_statistics`
--
ALTER TABLE `thesis_statistics`
  ADD PRIMARY KEY (`stat_id`),
  ADD KEY `thesis_id` (`thesis_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_chats`
--
ALTER TABLE `user_chats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `theses`
--
ALTER TABLE `theses`
  MODIFY `thesis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `thesis_statistics`
--
ALTER TABLE `thesis_statistics`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_chats`
--
ALTER TABLE `user_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD CONSTRAINT `peer_reviews_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
