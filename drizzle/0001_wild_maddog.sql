CREATE TABLE `alert_channels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('email','sms','telegram','webhook','slack') NOT NULL DEFAULT 'email',
	`config` json,
	`isActive` boolean DEFAULT true,
	`lastAlertAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alert_channels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `darkweb_monitors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`siteName` varchar(255) NOT NULL,
	`siteUrl` text,
	`postTitle` varchar(500),
	`postContent` text,
	`threatLevel` enum('critical','high','medium','low') NOT NULL DEFAULT 'low',
	`dataTypes` json,
	`affectedEntity` varchar(500),
	`discoveredAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('new','reviewed','escalated','dismissed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `darkweb_monitors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dashboard_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`statKey` varchar(100) NOT NULL,
	`statValue` int NOT NULL DEFAULT 0,
	`metadata` json,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `dashboard_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `dashboard_stats_statKey_unique` UNIQUE(`statKey`)
);
--> statement-breakpoint
CREATE TABLE `evidence_chain` (
	`id` int AUTO_INCREMENT NOT NULL,
	`incidentId` int,
	`title` varchar(500) NOT NULL,
	`description` text,
	`evidenceType` varchar(100),
	`sourceUrl` text,
	`hash` varchar(255),
	`collectedAt` timestamp NOT NULL DEFAULT (now()),
	`collectedBy` varchar(255),
	`verified` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evidence_chain_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`severity` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
	`status` enum('new','analyzing','documented','completed') NOT NULL DEFAULT 'new',
	`source` enum('telegram','darkweb','paste_sites','vendor_files','other') NOT NULL DEFAULT 'other',
	`sectorId` int,
	`affectedRecords` int DEFAULT 0,
	`dataTypes` json,
	`discoveredAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	`assignedTo` varchar(255),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `incidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`source` enum('telegram','darkweb','paste_sites','vendor','other') NOT NULL DEFAULT 'other',
	`severity` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
	`status` enum('new','investigating','confirmed','resolved','false_positive') NOT NULL DEFAULT 'new',
	`sectorId` int,
	`affectedEntity` varchar(500),
	`dataCount` int DEFAULT 0,
	`dataTypes` json,
	`sourceUrl` text,
	`discoveredAt` timestamp NOT NULL DEFAULT (now()),
	`verifiedAt` timestamp,
	`resolvedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leaks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `monitoring_tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`type` varchar(100),
	`schedule` varchar(100),
	`status` enum('active','paused','completed','failed') NOT NULL DEFAULT 'active',
	`lastRunAt` timestamp,
	`nextRunAt` timestamp,
	`resultCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `monitoring_tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paste_monitors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`siteName` varchar(255) NOT NULL,
	`pasteTitle` varchar(500),
	`pasteContent` text,
	`pasteUrl` text,
	`threatLevel` enum('critical','high','medium','low') NOT NULL DEFAULT 'low',
	`hasPersonalData` boolean DEFAULT false,
	`dataTypes` json,
	`discoveredAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('new','reviewed','escalated','dismissed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `paste_monitors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pii_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameAr` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`category` varchar(100),
	`count` int NOT NULL DEFAULT 0,
	`color` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pii_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`type` enum('daily','weekly','monthly','incident','custom') NOT NULL DEFAULT 'custom',
	`content` text,
	`summary` text,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`incidentCount` int DEFAULT 0,
	`leakCount` int DEFAULT 0,
	`createdBy` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sectors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameAr` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`icon` varchar(100),
	`color` varchar(50),
	`incidentCount` int NOT NULL DEFAULT 0,
	`percentage` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sectors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `telegram_monitors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`channelName` varchar(255) NOT NULL,
	`channelId` varchar(100),
	`messageContent` text,
	`messageDate` timestamp,
	`threatLevel` enum('critical','high','medium','low') NOT NULL DEFAULT 'low',
	`hasPersonalData` boolean DEFAULT false,
	`dataTypes` json,
	`status` enum('new','reviewed','escalated','dismissed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `telegram_monitors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `threat_rules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`ruleType` varchar(100),
	`pattern` text,
	`severity` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
	`isActive` boolean DEFAULT true,
	`matchCount` int DEFAULT 0,
	`lastMatchAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `threat_rules_id` PRIMARY KEY(`id`)
);
