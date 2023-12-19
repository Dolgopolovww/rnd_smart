from typing import Any

from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine, JSON

from config import settings

sync_engine = create_engine(
    url=settings.database_url,
    echo=True
)

sync_session_factory = sessionmaker(sync_engine)


class Base(DeclarativeBase):
    type_annotation_map = {
        dict[str, Any]: JSON
    }

