import os

from flask import url_for
from flask_admin import Admin, form
from markupsafe import Markup

from app.view.base_view import ModelViewBase


file_path = os.path.abspath(os.path.dirname(__name__))


def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.name}'
    return hash_name


class ModelViewSocial(ModelViewBase):
    def _list_thumbnail(view, context, model, name):
        if not model.icon:
            return 'отсутствует'
        url = url_for('static', filename=os.path.join(f'storage/social_icon/', model.icon))

        if model.icon.split('.')[-1] in ['jpg', 'jpeg', 'png', 'svg', 'gif']:
            return Markup(f'<img src={url} width="100">')

    column_formatters = {
        'icon': _list_thumbnail
    }

    base_path = os.path.join(file_path, f'static/storage/social_icon')
    url_relative_path = 'storage/social_icon/'

    """


    """
    form_extra_fields = {
        "icon": form.ImageUploadField('',
                                     base_path=base_path,
                                     url_relative_path=url_relative_path,
                                     namegen=name_gen_image,
                                     allowed_extensions=['jpg', 'jpeg'],
                                     thumbnail_size=(300, 195, True),
                                     )
    }


def create_form(self, obj=None):
    return super(ModelViewSocial, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewSocial, self).edit_form(obj)