import os

from flask import url_for
from flask_admin import Admin, form
from flask_admin.contrib.sqla.fields import QuerySelectField
from flask_admin.form import Select2TagsField, Select2Widget, Select2Field
from flask_wtf import FlaskForm
from markupsafe import Markup
from sqlalchemy import select
from wtforms import SelectMultipleField

from app.dao.base import ButtonDao
from app.view.base_view import ModelViewBase
from models.models import Bonus, Button


file_path = os.path.abspath(os.path.dirname(__name__))



def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.title_block_bonus}'
    return hash_name


class ModelViewBlockBonus(ModelViewBase):
    def _list_thumbnail(view, context, model, name):
        if not model.logo:
            return 'отсутствует'
        url = url_for('static', filename=os.path.join(f'storage/block_bonus/', model.logo))

        if model.logo.split('.')[-1] in ['jpg', 'jpeg', 'png', 'svg', 'gif']:
            return Markup(f'<img src={url} width="100">')

    column_formatters = {
        'logo': _list_thumbnail
    }

    base_path = os.path.join(file_path, f'static/storage/block_bonus')
    url_relative_path = 'storage/block_bonus/'

    """


    """
    form_extra_fields = {
        "logo": form.ImageUploadField('',
                                     base_path=base_path,
                                     url_relative_path=url_relative_path,
                                     namegen=name_gen_image,
                                     allowed_extensions=['jpg'],
                                     thumbnail_size=(300, 195, True),
                                     )
    }


def create_form(self, obj=None):
    return super(ModelViewBlockBonus, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewBlockBonus, self).edit_form(obj)