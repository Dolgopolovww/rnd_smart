from sqlalchemy import select, insert
from sqlalchemy.orm import Session, sessionmaker
from app.db import sync_session_factory
from models.models import Role, User, Button, Bookmaker, BlockHeader, Landing, TermsPopup, JsonLanding, Bonus, BonusBlockBonus, Social, FooterSocial, BlockFooter, InteractiveCard, Interactive, InteractiveInteractiveCard
from schemas.schemas import BonusSchema, SocialSchema, InteractiveCardSchema
import json

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
    def add_or_update(session: Session, model_cls, **data):
    # Попытка получить объект по первичному ключу
        obj = session.query(model_cls).filter_by(id=data['id']).first()

        if obj:
            # Если объект существует, обновляем его значения
            for key, value in data.items():
                setattr(obj, key, value)
        else:
            # Если объект не существует, создаем новый
            obj = model_cls(**data)
            session.add(obj)

        session.commit()


def get_bonuses_for_block_bonus(block_bonus_id):
    with sync_session_factory() as session:
        bonuses = (
            session.query(Bonus)
            .join(BonusBlockBonus, Bonus.id == BonusBlockBonus.bonus_id)
            .filter(BonusBlockBonus.block_bonus_id == block_bonus_id)
            .all()
        )
        # Ваш цикл
        final_json_list = []
        for bonus in bonuses:
            data = BonusSchema.from_orm(bonus)
            json_data = data.dict()
            final_json_list.append(json_data)

        # Собираем финальный JSON
        # print(final_json_list)
        final_json = json.dumps(final_json_list, ensure_ascii=False)
        data_res = json.loads(final_json)

        return data_res

def get_socials_for_block_footer(block_footer_id):
    with sync_session_factory() as session:
        socials = (
            session.query(Social)
            .join(FooterSocial, Social.id == FooterSocial.social_id)
            .join(BlockFooter, FooterSocial.footer_id == BlockFooter.id)
            .filter(BlockFooter.id == block_footer_id)
            .all()
        )
        final_json_list = []
        for social in socials:
            data = SocialSchema.from_orm(social)
            json_data = data.dict()
            final_json_list.append(json_data)
        
        # print(final_json_list)
        final_json = json.dumps(final_json_list, ensure_ascii=False)
        data_res = json.loads(final_json)

        return data_res

def get_blocks_for_interactive(interactive_id):
    with sync_session_factory() as session:
        blocks = (
            session.query(InteractiveCard)
            .join(InteractiveInteractiveCard, InteractiveCard.id == InteractiveInteractiveCard.interactive_card_id)
            .join(Interactive, InteractiveInteractiveCard.interactive_id == Interactive.id)
            .filter(Interactive.id == interactive_id)
            .all()
        )
        final_json_list = []
        for block in blocks:
            data = InteractiveCardSchema.from_orm(block)
            json_data = data.dict()
            final_json_list.append(json_data)
        
        print(final_json_list)
        final_json = json.dumps(final_json_list, ensure_ascii=False)
        data_res = json.loads(final_json)

        return data_res


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

class BonusDao(BaseDao):
    model: Bonus 