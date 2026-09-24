from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "ML Fullstack Platform"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # Reverse proxy / Swagger prefix
    ROOT_PATH: str = ""

    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:5173,https://jarllindquist.com"

    @property
    def cors_origins_list(self) -> List[str]:
        return [
            origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()
        ]

    RATE_LIMIT_DEFAULT: str = "100/minute"
    RATE_LIMIT_EXTRA: str = "20/minute"
    RATE_LIMIT_WEATHER: str = "30/minute"
    RATE_LIMIT_ENERGY_AREAS: str = "60/minute"
    DATABASE_URL: str = ""
    SECRET_KEY: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    MODEL_DIR: str = "models_bin/"
    ML_DEVICE: str = "cpu"
    DEFAULT_MODEL_NAME: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
