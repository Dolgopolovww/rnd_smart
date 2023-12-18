from typing import Optional, List

from pydantic import BaseModel

class Bookmaker(BaseModel):
    id: int
    logo: Optional[str]
    name: Optional[str]
    url: Optional[str]

class Header(Bookmaker):
    id: int
    title: str
    logo: Optional[str]
    bg_color: Optional[str]
    bookmaker_id: int

