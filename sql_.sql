-- Drop tables in correct order to avoid foreign key conflicts
DROP TABLE IF EXISTS `thesis_statistics`;
DROP TABLE IF EXISTS `peer_reviews`;
DROP TABLE IF EXISTS `thesis`;
DROP TABLE IF EXISTS `chat_messages`;
DROP TABLE IF EXISTS `faq`;
DROP TABLE IF EXISTS `contact_form`;
DROP TABLE IF EXISTS `about_us`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(100) NOT NULL,
    `last_name` varchar(100) NOT NULL,
    `email` varchar(150) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` enum('admin', 'user') NOT NULL DEFAULT 'user',
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `phone` varchar(20) DEFAULT NULL,
    `gender` varchar(10) DEFAULT NULL,
    `bio` text DEFAULT NULL,
    `user_type` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `about_us` (
    `about_id` int(11) NOT NULL AUTO_INCREMENT,
    `mission_statement` text NOT NULL,
    `team_members` text NOT NULL,
    `history` text NOT NULL,
    `contact_info` text NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`about_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `chat_messages` (
    `message_id` int(11) NOT NULL AUTO_INCREMENT,
    `sender_id` int(11) DEFAULT NULL,
    `recipient_id` int(11) DEFAULT NULL,
    `message` text NOT NULL,
    `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`message_id`),
    CONSTRAINT `fk_sender` FOREIGN KEY (`sender_id`) 
    REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_recipient` FOREIGN KEY (`recipient_id`) 
    REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contact_form` (
    `contact_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(150) NOT NULL,
    `email` varchar(150) NOT NULL,
    `subject` varchar(255) NOT NULL,
    `message` text NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `faq` (
    `faq_id` int(11) NOT NULL AUTO_INCREMENT,
    `question` varchar(255) NOT NULL,
    `answer` text NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`faq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `thesis` (
    `thesis_id` int(11) NOT NULL AUTO_INCREMENT,
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
    `author` varchar(255) DEFAULT NULL,
    `status` enum('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    PRIMARY KEY (`thesis_id`),
    KEY `idx_year` (`year`),
    KEY `idx_keywords` (`keywords`),
    FULLTEXT KEY `idx_title_abstract` (`title`, `abstract`),
    CONSTRAINT `fk_thesis_author` FOREIGN KEY (`author_id`) 
    REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `peer_reviews` (
    `review_id` int(11) NOT NULL AUTO_INCREMENT,
    `thesis_id` int(11) DEFAULT NULL,
    `reviewer_id` int(11) DEFAULT NULL,
    `review_comment` text DEFAULT NULL,
    `rating` int(11) DEFAULT NULL CHECK (rating BETWEEN 1 AND 5),
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`review_id`),
    CONSTRAINT `fk_review_thesis` FOREIGN KEY (`thesis_id`) 
    REFERENCES `thesis` (`thesis_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`reviewer_id`) 
    REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `thesis_statistics` (
    `stat_id` int(11) NOT NULL AUTO_INCREMENT,
    `thesis_id` int(11) NOT NULL,
    `views` int(11) DEFAULT 0,
    `downloads` int(11) DEFAULT 0,
    `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`stat_id`),
    UNIQUE KEY `unique_thesis_stat` (`thesis_id`),
    CONSTRAINT `fk_thesis_stats` FOREIGN KEY (`thesis_id`) 
    REFERENCES `thesis` (`thesis_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -- Add sample data
-- -- Add sample users
-- INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`) VALUES
-- ('John', 'Doe', 'john@example.com', '$2y$10$dummy_hash1', 'user'),
-- ('Jane', 'Smith', 'jane@example.com', '$2y$10$dummy_hash2', 'user'),
-- ('Admin', 'User', 'admin@example.com', '$2y$10$dummy_hash3', 'admin');

-- -- Add sample thesis
-- INSERT INTO `thesis` (`title`, `abstract`, `author_id`, `year`, `email`, `status`) VALUES
-- ('First Thesis', 'Abstract for first thesis', 1, 2024, 'john@example.com', 'published'),
-- ('Second Thesis', 'Abstract for second thesis', 2, 2024, 'jane@example.com', 'published'),
-- ('Third Thesis', 'Abstract for third thesis', 1, 2024, 'john@example.com', 'published');

-- -- Add thesis statistics
-- INSERT INTO `thesis_statistics` (`thesis_id`, `views`, `downloads`) VALUES
-- (1, 150, 50),
-- (2, 120, 40),
-- (3, 100, 30);