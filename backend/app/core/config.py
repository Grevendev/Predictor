from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ML Fullstack Platform"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    CORS_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()