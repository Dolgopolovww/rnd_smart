import json
import os

from flask import url_for
from flask_admin import Admin, form
from markupsafe import Markup
from app.dao.base import HeaderDao, TermsDao, LandingDao, JsonLandingDao

from app.view.base_view import ModelViewBase

from schemas.schemas import LandingSchema 

file_path = os.path.abspath(os.path.dirname(__name__))

class ModelViewLanding(ModelViewBase):
    def on_model_change(self, form, model, is_created):
        self.process_fields(model)

    def process_fields(self, model):
        try:
            landing_schema = LandingSchema.from_orm(model)
            landing_json = landing_schema.model_dump_json()
            json_object = json.loads(landing_json)
            JsonLandingDao.add(landing_slug=model.slug, info_json=json_object)

        except Exception as e:
            print(f"Error: {e}")
        pass


def create_form(self, obj=None):
    return super(ModelViewLanding, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewLanding, self).edit_form(obj)