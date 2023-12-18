from fastapi import APIRouter

from app.dao.base import UserDao, BookmakerDao, RoleDao, HeaderDao
from schemas.schemas import Bookmaker, Header

#from app.dao.base import ButtonDao, LendingDao, BannerDao, MedialSocialsDao, UserItemsDao, ItemsDao, UsersDao
router = APIRouter(
    prefix="/smart",
)

@router.post('/user_add')
async def user_selection(role_id: int, username: str):
    return UserDao.add(role_id=role_id, username=username)

@router.get('/users')
async def get_users():
    return UserDao.find_all()

@router.get('/bookmaker')
async def get_bookmaker_by_id(bookmaker_id: int) -> Bookmaker:
    return BookmakerDao.find_one_or_none(id=bookmaker_id)

@router.get('/block_header', response_model=Header)
async def get_block_header_by_id(block_header_id: int):
    return HeaderDao.find_one_or_none(id=block_header_id)



"""
router_buttons = APIRouter(
    prefix="/smart",
    tags=["buttons"]
)


@router_buttons.get('/button/{id}')
async def get_type_button(button_id: int):
    return ButtonDao.find_one_or_none(id=button_id)


@router_buttons.get('/buttons')
async def get_buttons():
    return ButtonDao.find_all()


router_banners = APIRouter(
    prefix="/smart",
    tags=["banners"]
)


@router_banners.get('/banner/{id}')
async def get_banner(banner_id: int):
    return BannerDao.find_one_or_none(id=banner_id)


@router_banners.get('/banners')
async def get_banners():
    return BannerDao.find_all()


router_lendings = APIRouter(
    prefix="/smart",
    tags=["lendings"]
)


@router_lendings.get('/lendings/{id}')
async def get_lendings(lendings_id: int):
    return LendingDao.find_one_or_none(id=lendings_id)


@router_lendings.get('/lendings')
async def get_lendings():
    return LendingDao.find_all()


router_items = APIRouter(
    prefix="/smart",
    tags=["items"]
)


@router_items.get('/items/{id}')
async def get_items(items_id: int):
    return ItemsDao.find_one_or_none(id=items_id)


@router_items.get('/items')
async def get_items():
    return ItemsDao.find_all()


router_others = APIRouter(
    prefix="/smart",
    tags=["others"]
)
@router_others.get('/medial_socials/{id}')
async def get_medial_social(lendings_id: int):
    return MedialSocialsDao.find_one_or_none(id=lendings_id)


@router_others.get('/medial_socials')
async def get_medial_socials():
    return MedialSocialsDao.find_all()

@router_others.post('/user_selection')
async def user_selection(user_id: int, bk_id: int):
    return UserItemsDao.add(items_id=bk_id, user_id=user_id)

@router_others.get('/users')
async def get_users():
    return UsersDao.find_all()

@router_others.get('/users_selections')
async def users_selections():
    return UserItemsDao.find_all()

"""