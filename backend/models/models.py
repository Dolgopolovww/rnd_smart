import datetime
from typing import Annotated, List, Optional

from sqlalchemy import MetaData, ForeignKey, text, Date, JSON, Column, Boolean, Table, Integer
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

metadata = MetaData()

intpk = Annotated[int, mapped_column(primary_key=True)]
create_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]


class Role(Base):
    __tablename__ = 'roles'

    id: Mapped[intpk]
    name: Mapped[str]

    def __str__(self):
        return self.name


class User(Base):
    __tablename__ = 'users'

    id: Mapped[intpk]
    role_id: Mapped[Optional[int]] = mapped_column(ForeignKey('roles.id'))
    username: Mapped[Optional[str]]
    selection_date: Mapped[Optional[str]] = mapped_column(Date, nullable=True)

    roles: Mapped["Role"] = relationship()

    def __str__(self):
        return self.username, self.role_id


class UserSelection(Base):
    # выбор пользователя
    __tablename__ = 'user_selections'

    id: Mapped[intpk]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    bookmaker_id: Mapped[int] = mapped_column(ForeignKey('bookmakers.id'))

    users: Mapped["User"] = relationship()
    bookmakers: Mapped["Bookmaker"] = relationship()


class TypeSport(Base):
    __tablename__ = 'type_sports'

    id: Mapped[intpk]
    name: Mapped[str]

    def __str__(self):
        return self.name


class Contest(Base):
    __tablename__ = 'contests'

    id: Mapped[intpk]
    img: Mapped[Optional[str]]
    date: Mapped[Optional[str ]| None] = mapped_column(Date, nullable=True)
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    sport_type_id: Mapped[Optional[int]] = mapped_column(ForeignKey('type_sports.id'))
    value_bonus_id: Mapped[Optional[int]] = mapped_column(ForeignKey('value_bonuses.id'))
    bk_id: Mapped[Optional[int]] = mapped_column(ForeignKey('bookmakers.id'))
    button_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))

    type_sports: Mapped["TypeSport"] = relationship()
    value_bonuses: Mapped["ValueBonus"] = relationship()
    bookmakers: Mapped["Bookmaker"] = relationship()
    buttons: Mapped["Button"] = relationship()


class BlockContest(Base):
    __tablename__ = 'block_contests'

    id: Mapped[intpk]
    logo: Mapped[Optional[str]]
    title: Mapped[Optional[str]]
    title_color: Mapped[Optional[str]]
    button_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))

    buttons: Mapped["Button"] = relationship()



class ContestBlockContest(Base):
    __tablename__ = 'contest_block_contests'

    id: Mapped[intpk]
    contest_id: Mapped[int] = mapped_column(ForeignKey('contests.id'))
    block_contest_id: Mapped[int] = mapped_column(ForeignKey('block_contests.id'))

    contests: Mapped["Contest"] = relationship()
    block_contests: Mapped["BlockContest"] = relationship()


class ValueBonus(Base):
    __tablename__ = 'value_bonuses'

    id: Mapped[intpk]
    value: Mapped[int]
    currency: Mapped[str]


    def __str__(self):
        return f"{self.value} {self.currency}"


class TypeBonus(Base):
    __tablename__ = 'type_bonuses'

    id: Mapped[intpk]
    name: Mapped[str]

    def __str__(self):
        return self.name


class Bonus(Base):
    __tablename__ = 'bonuses'

    id: Mapped[intpk]
    title_bonus: Mapped[Optional[str]]
    img: Mapped[Optional[str]]
    text: Mapped[Optional[str]]

    bookmaker_id: Mapped[Optional[int]] = mapped_column(ForeignKey('bookmakers.id'))
    button_id: Mapped[Optional[List[int]]] = mapped_column(ForeignKey('buttons.id'))
    value_bonus_id: Mapped[Optional[int]] = mapped_column(ForeignKey('value_bonuses.id'))
    type_id: Mapped[Optional[int]] = mapped_column(ForeignKey('type_bonuses.id'))

    bookmakers: Mapped["Bookmaker"] = relationship()
    buttons: Mapped["Button"] = relationship()
    value_bonuses: Mapped["ValueBonus"] = relationship()
    type_bonuses: Mapped["TypeBonus"] = relationship()

    def __str__(self):
        return self.title_bonus




class BonusBlockBonus(Base):
    __tablename__ = 'bonus_block_bonuses'

    id: Mapped[intpk]
    bonus_id: Mapped[int] = mapped_column(ForeignKey('bonuses.id'))
    block_bonus_id: Mapped[int] = mapped_column(ForeignKey('block_bonuses.id'))

    bonuses: Mapped['Bonus'] = relationship()
    block_bonuses: Mapped['BlockBonus'] = relationship()


class BlockBonus(Base):
    __tablename__ = 'block_bonuses'

    id: Mapped[intpk]
    title_block_bonus: Mapped[Optional[str]]
    logo: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    bg_color: Mapped[Optional[str]]

    def __str__(self):
        return self.title_block_bonus


class Bookmaker(Base):
    __tablename__ = 'bookmakers'

    id: Mapped[intpk]
    logo: Mapped[Optional[str]]
    name: Mapped[Optional[str]]
    url: Mapped[Optional[str]]

    def __str__(self):
        return self.name




class Button(Base):
    __tablename__ = 'buttons'

    id: Mapped[intpk]
    bg_color: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    url: Mapped[Optional[str]]
    analytics_endpoint: Mapped[Optional[str]]
    variant: Mapped[Optional[str]]

    def __str__(self):
        return self.text



class BannerButton(Base):
    __tablename__ = 'banner_buttons'

    id: Mapped[intpk]
    banner_id: Mapped[int] = mapped_column(ForeignKey('banners.id'))
    button_id: Mapped[int] = mapped_column(ForeignKey('buttons.id'))


    buttons: Mapped["Button"] = relationship()
    banners: Mapped["Banner"] = relationship()


class Interactive(Base):
    __tablename__ = 'interactive'

    id: Mapped[intpk]
    title_interactive: Mapped[str]
    reset_button_id: Mapped[Optional[str]] = mapped_column(ForeignKey('buttons.id'))

    buttons: Mapped["Button"] = relationship()

    def __str__(self):
        return self.title_interactive



class InteractiveInteractiveCard(Base):
    __tablename__ = 'interactive_interactive_cards'

    id: Mapped[intpk]
    interactive_card_id: Mapped[int] = mapped_column(ForeignKey('interactive_cards.id'))
    interactive_id: Mapped[int] = mapped_column(ForeignKey('interactive.id'))

    interactive: Mapped["Interactive"] = relationship()
    interactive_cards: Mapped["InteractiveCard"] = relationship()


class InteractiveCard(Base):
    __tablename__ = 'interactive_cards'

    id: Mapped[intpk]
    title_interactive_card: Mapped[str]
    key: Mapped[Optional[str]]
    img: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]

    def __str__(self):
        return self.title_interactive_card


association_table = Table('association', Base.metadata,
    Column('champ_group_id', Integer, ForeignKey('champ_group.id')),
    Column('champ_team_id', Integer, ForeignKey('champ_team.id'))
)

class ChampGroup(Base):
    __tablename__ = 'champ_group'

    id: Mapped[intpk]
    title: Mapped[Optional[str]]
    bg_color: Mapped[Optional[str]]
    title_color: Mapped[Optional[str]]
    # team_ids: Mapped[Optional[int]]

    # teams: Mapped["Button"] = relationship("Team", foreign_keys=[team_ids])
    teams = relationship("ChampTeam", secondary=association_table)

    def __str__(self):
        return self.title
class ChampTeam(Base):
    __tablename__ = 'champ_team'

    id: Mapped[intpk]
    name: Mapped[Optional[str]]
    name_color: Mapped[Optional[str]]
    logo: Mapped[Optional[str]]
    points: Mapped[Optional[int]]

    def __str__(self):
        return self.name




class Banner(Base):
    __tablename__ = 'banners'

    id: Mapped[intpk]
    title_banner: Mapped[Optional[str]]
    bg_color: Mapped[Optional[str]]
    bg_img: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    is_fullscreen: Mapped[Optional[bool]] = mapped_column(default=True)
    hero_button_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))
    terms_button_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))

    hero_button: Mapped["Button"] = relationship("Button", foreign_keys=[hero_button_id])
    terms_button: Mapped["Button"] = relationship("Button", foreign_keys=[terms_button_id])

    def __str__(self):
        return self.title_banner


class BlockHeader(Base):
    __tablename__ = 'block_headers'

    id: Mapped[intpk]
    title: Mapped[str]
    logo: Mapped[Optional[str]]
    bg_color: Mapped[Optional[str]]
    bookmaker_id: Mapped[int] = mapped_column(ForeignKey('bookmakers.id'))

    bookmakers: Mapped["Bookmaker"] = relationship()

    def __str__(self):
        return self.title


class BlockMain(Base):
    __tablename__ = 'block_mains'

    id: Mapped[intpk]
    title: Mapped[str]
    bg_color: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    interactive_id: Mapped[Optional[int]] = mapped_column(ForeignKey('interactive.id'))
    buttons_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))
    terms_btn_id: Mapped[Optional[int]] = mapped_column(ForeignKey('buttons.id'))



    interactive: Mapped["Interactive"] = relationship()
    button: Mapped["Button"] = relationship("Button", foreign_keys=[buttons_id])
    terms_button: Mapped["Button"] = relationship("Button", foreign_keys=[terms_btn_id])

    def __str__(self):
        return self.title



class AddBlock(Base):
    __tablename__ = 'add_blocks'

    id: Mapped[intpk]
    title: Mapped[str]
    bg_color: Mapped[Optional[str]]
    block_bonus_id: Mapped[Optional[int]] = mapped_column(ForeignKey('bonuses.id'))
    block_content_id: Mapped[Optional[int]] = mapped_column(ForeignKey('block_contests.id'))

    bonuses: Mapped["Bonus"] = relationship()
    block_contests: Mapped["BlockContest"] = relationship()

    def __str__(self):
        return self.title


class SuccessPopup(Base):
    __tablename__ = 'success_popups'

    id: Mapped[intpk]
    title: Mapped[str]
    bg_color: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]
    sub_text: Mapped[Optional[str]]
    sub_text_color: Mapped[Optional[str]]
    img: Mapped[Optional[str]]

    def __str__(self):
        return self.title


class TermsPopup(Base):
    __tablename__ = 'terms_popups'

    id: Mapped[intpk]
    title: Mapped[str]
    bg_color: Mapped[Optional[str]]
    text: Mapped[Optional[str]]
    text_color: Mapped[Optional[str]]

    def __str__(self):
        return self.title



class Social(Base):
    __tablename__ = 'socials'

    id: Mapped[intpk]
    name: Mapped[Optional[str]]
    url: Mapped[Optional[str]]
    icon: Mapped[Optional[str]]

    def __str__(self):
        return self.name



class FooterSocial(Base):
    __tablename__ = 'footer_socials'

    id: Mapped[intpk]
    footer_id: Mapped[int] = mapped_column(ForeignKey('block_footers.id'))
    social_id: Mapped[int] = mapped_column(ForeignKey('socials.id'))

    block_footers: Mapped['BlockFooter'] = relationship()
    socials: Mapped['Social'] = relationship()



class BlockFooter(Base):
    __tablename__ = 'block_footers'

    id: Mapped[intpk]
    title_block_footer: Mapped[Optional[str]]
    logo: Mapped[Optional[str]]
    bg_color: Mapped[Optional[str]]
    bookmaker_id: Mapped[Optional[int]] = mapped_column(ForeignKey('bookmakers.id'))

    bookmakers: Mapped['Bookmaker'] = relationship()

    def __str__(self):
        return self.title_block_footer


class Landing(Base):
    __tablename__ = 'landings'

    id: Mapped[intpk]
    title: Mapped[str]
    slug: Mapped[Optional[str]]
    block_terms_id: Mapped[Optional[str]] = mapped_column(ForeignKey('terms_popups.id'))
    block_headers_id: Mapped[Optional[int]] = mapped_column(ForeignKey('block_headers.id'))
    block_banner_id: Mapped[Optional[int]] = mapped_column(ForeignKey('banners.id'))
    block_main_id: Mapped[Optional[int]] = mapped_column(ForeignKey('block_mains.id'))
    # block_add_id: Mapped[Optional[int]] = mapped_column(ForeignKey('add_blocks.id'))
    block_success_popup_id: Mapped[Optional[int]] = mapped_column(ForeignKey('success_popups.id'))
    block_bonus_id: Mapped[Optional[int]] = mapped_column(ForeignKey('block_bonuses.id'))
    block_footer_id: Mapped[Optional[int]] = mapped_column(ForeignKey('block_footers.id'))

    terms_popup: Mapped["TermsPopup"] = relationship()
    block_headers: Mapped["BlockHeader"] = relationship()
    banners: Mapped["Banner"] = relationship()
    block_mains: Mapped["BlockMain"] = relationship()
    # add_blocks: Mapped["AddBlock"] = relationship()
    success_popups: Mapped["SuccessPopup"] = relationship()
    block_bonuses: Mapped["BlockBonus"] = relationship()
    block_footers: Mapped["BlockFooter"] = relationship()

    def __str__(self):
        return self.title


class JsonLanding(Base):
    __tablename__ = 'json_landings'

    id: Mapped[intpk]
    landing_slug: Mapped[str]
    info_json: Mapped[Optional[dict|list]] = mapped_column(type_=JSONB)




