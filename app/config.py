import os
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings loaded from environment variables or .env file.
    """
    PROJECT_NAME: str = "Evidence Collector Service"
    VERSION: str = "1.0.0"
    API_PREFIX: str = ""
    
    # API Keys
    TAVILY_API_KEY: Optional[str] = None

    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Timeout settings for HTTP requests (seconds)
    REQUEST_TIMEOUT: float = 10.0

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
