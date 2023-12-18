import os

from flask import url_for
from flask_admin import Admin, form
from markupsafe import Markup

from app.view.base_view import ModelViewBase

file_path = os.path.abspath(os.path.dirname(__name__))


def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.title_banner}'
    return hash_name


class ModelViewBanner(ModelViewBase):
    def _list_thumbnail(view, context, model, name):
        if not model.bg_img:
            return 'не найдено'

        url = url_for('static', filename=os.path.join(f'storage/banners/', model.bg_img))

        if model.bg_img.split('.')[-1] in ['jpg', 'jpeg', 'png', 'svg', 'gif']:
            return Markup(f'<img src={url} width="100">')

    column_formatters = {
        'bg_img': _list_thumbnail
    }

    base_path = os.path.join(file_path, 'static/storage/banners')
    url_relative_path = 'storage/banners/'
    form_extra_fields = {
        "bg_img": form.ImageUploadField('',
                                        base_path=base_path,
                                        url_relative_path=url_relative_path,
                                        namegen=name_gen_image,
                                        allowed_extensions=['jpg'],
                                        thumbnail_size=(300, 195, True),
                                        )
    }


def create_form(self, obj=None):
    return super(ModelViewBanner, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewBanner, self).edit_form(obj)