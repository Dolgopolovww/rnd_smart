from typing import Literal, ClassVar

from pydantic import AnyUrl, field_validator, PostgresDsn, RedisDsn
from pydantic_settings import BaseSettings, SettingsConfigDict
from ipaddress import IPv4Address

class Settings(BaseSettings):
    MODE: Literal['DEV', 'LOCAL', 'PROD']
    LOG_LEVEL: str
    DB_SCHEMES: str
    DB_HOST: IPv4Address | AnyUrl
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASS: str

    ACCESS_TOKEN_SECRET_KEY: str
    HASH_METHOD: str

    @field_validator("DB_PORT")
    def validate_port(cls, v: int) -> int:
        if not 1 <= v <= 65535:
            raise ValueError("Port must be between 1 and 65535")
        return v

    POSTGRES_ALLOWED_SCHEMES: ClassVar = PostgresDsn.__metadata__[0].allowed_schemes
    @field_validator("DB_SCHEMES")
    def validate_pg_shemas(cls, v: str):
        if v not in cls.POSTGRES_ALLOWED_SCHEMES:
            raise ValueError("Invalid PostgresDsn schemes")
        return v

    @property
    def database_url(self):
        return f"{self.DB_SCHEMES}://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings(MODE="LOCAL", LOG_LEVEL="DEBUG")

