-- 확장 설치 (UUID 생성용)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 스키마 생성
CREATE SCHEMA IF NOT EXISTS mid;

-- search_path 설정 (선택적)
-- 이 설정을 적용하면 이후 DDL에서 스키마 명시 없이 테이블 생성 가능
ALTER ROLE mid_user SET search_path TO mid;
ALTER ROLE mid_user SET timezone TO 'Asia/Seoul';

