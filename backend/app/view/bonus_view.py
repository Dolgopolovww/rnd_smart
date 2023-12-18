import os

from flask import url_for
from flask_admin import Admin, form
from flask_admin.contrib.sqla.fields import QuerySelectField
from flask_admin.form import Select2TagsField, Select2Widget, Select2Field
from flask_wtf import FlaskForm
from markupsafe import Markup
from sqlalchemy import select
from wtforms import SelectMultipleField

from app.view.base_view import ModelViewBase

file_path = os.path.abspath(os.path.dirname(__name__))

"""
class YourModelForm(FlaskForm):
    items = ButtonDao.find_all()
    choices = [(str(item.id), item.text) for item in items]
    print(f"{choices=}")

    choices = SelectMultipleField('Choices', widget=Select2Widget(),
                                  choices=choices)

class CustomUserField(SelectMultipleField):
    def user_data_select(self, value):
        if not value:
            value = []
        super(CustomMultipleSelectField, self).process_data(value)
"""

def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.title_bonus}'
    return hash_name


class ModelViewBonus(ModelViewBase):
    def _list_thumbnail(view, context, model, name):
        if not model.img:
            return 'не найдено'
        url = url_for('static', filename=os.path.join(f'storage/bonus/', model.img))

        if model.img.split('.')[-1] in ['jpg', 'jpeg', 'png', 'svg', 'gif']:
            return Markup(f'<img src={url} width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    base_path = os.path.join(file_path, f'static/storage/bonus')
    url_relative_path = 'storage/bonus/'

    """
    

    """
    form_extra_fields = {
        #"button": CustomUserField(choices),
        "img": form.ImageUploadField('',
                                        base_path=base_path,
                                        url_relative_path=url_relative_path,
                                        namegen=name_gen_image,
                                        allowed_extensions=['jpg'],
                                        thumbnail_size=(300, 195, True),
                                        )
    }


def create_form(self, obj=None):
    return super(ModelViewBonus, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewBonus, self).edit_form(obj)