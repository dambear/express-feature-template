-- CreateTable
CREATE TABLE `organizations` (
    `organization_id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_name` VARCHAR(255) NOT NULL,
    `organization_email` VARCHAR(255) NOT NULL,
    `organization_address` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `organization_email`(`organization_email`),
    PRIMARY KEY (`organization_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL,
    `middlename` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `suffix` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(15) NULL,
    `address` TEXT NULL,
    `date_hired` DATE NULL,
    `contract_type` VARCHAR(50) NULL,
    `employee_id` VARCHAR(50) NULL,
    `organization_id` INTEGER NULL,
    `status` ENUM('Active', 'Inactive', 'Suspended') NULL DEFAULT 'Active',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `organization_id`(`organization_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`organization_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
