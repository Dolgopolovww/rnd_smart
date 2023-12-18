from fastapi import FastAPI
#from flask import Flask
#from flask_admin import Admin
#from flask_admin.contrib.appengine import ModelView

#from flask_sqlalchemy import SQLAlchemy

from app.router import router

"""
from models.models import Roles, Bonus, Banners, Buttons, TypeBanners, TypeButtons, ValueBonus, InfoLendings, \
    MedialSocials, Users, UserItems, Items, Conditions
"""
#from app.router import router_buttons, router_banners, router_lendings, router_others, router_items

#from models.models import Users, Roles

app = FastAPI()
app.include_router(router)

"""
app.include_router(router_buttons)
app.include_router(router_banners)
app.include_router(router_lendings)
app.include_router(router_items)
app.include_router(router_others)
"""
