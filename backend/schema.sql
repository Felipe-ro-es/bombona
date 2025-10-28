-- schema.sql
CREATE DATABASE IF NOT EXISTS rastreamento_bombonas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rastreamento_bombonas;

-- Usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','operador') DEFAULT 'operador',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locais de entrega (farmácia, hospital, sede, etc.)
CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bombonas
CREATE TABLE bombonas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(36) NOT NULL UNIQUE, -- uuid para QR
  code VARCHAR(100) DEFAULT NULL,
  description VARCHAR(255),
  status ENUM('em_transito','na_sede','entregue','manutencao') DEFAULT 'em_transito',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Scans / bipagens (log quando o QR foi lido)
CREATE TABLE scans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  bombona_id INT NOT NULL,
  location_id INT NULL, -- pode ser nulo se o scanner não tiver localização
  scanned_by INT NULL, -- usuário que fez a bipagem (operador)
  scanner_info VARCHAR(255), -- info opcional do scanner (ex: app id, imei)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bombona_id) REFERENCES bombonas(id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
  FOREIGN KEY (scanned_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Inserts de exemplo (locais)
INSERT INTO locations (name, description) VALUES
('Sede Central', 'Ponto principal'),
('Farmacia A', 'Farmacia parceira A'),
('Hospital B', 'Hospital parceiro B');
