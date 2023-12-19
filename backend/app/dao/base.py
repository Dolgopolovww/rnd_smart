from sqlalchemy import select, insert
from sqlalchemy.orm.sync import update

from app.db import sync_session_factory
from models.models import Role, User, Button, Bookmaker, BlockHeader, Landing, TermsPopup, JsonLanding

"""
from models.models import TypeButtons, InfoLendings, Banners, MedialSocials, Users, UserItems, Items
"""


class BaseDao:
    model = None

    @classmethod
    def find_all(cls, **filter_by):
        with sync_session_factory() as session:
            res = session.execute(select(cls.model).filter_by(**filter_by))
            return res.scalars().all()

    @classmethod
    def find_one_or_none(cls, **filter_by):
        with sync_session_factory() as session:
            res = session.execute(select(cls.model).filter_by(**filter_by))
            return res.scalar_one_or_none()


    @classmethod
    def add(cls, **data):
        with sync_session_factory() as session:
            res = session.execute(insert(cls.model).values(**data))
            session.commit()

    @classmethod
    def add_json(cls, json, slug):
        with sync_session_factory() as session:
            res = session.query(JsonLanding).filter_by(landing_slug=slug).first()
            if res:
                res.info_json = json
            else:
                session.execute(insert(JsonLanding).values(landing_slug=slug, info_json=json))
            session.commit()



class RoleDao(BaseDao):
    model = Role


class UserDao(BaseDao):
    model = User


class ButtonDao(BaseDao):
    model = Button


class BookmakerDao(BaseDao):
    model = Bookmaker

class TermsDao(BaseDao):
    model = TermsPopup

class HeaderDao(BaseDao):
    model = BlockHeader

class LandingDao(BaseDao):
    model = Landing

class JsonLandingDao(BaseDao):
    model = JsonLanding