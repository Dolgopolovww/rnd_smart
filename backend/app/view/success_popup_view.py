import os

from flask import url_for
from flask_admin import Admin, form
from markupsafe import Markup

from app.view.base_view import ModelViewBase


file_path = os.path.abspath(os.path.dirname(__name__))


def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.title}'
    return hash_name


class ModelViewSuccessPopup(ModelViewBase):
    def _list_thumbnail(view, context, model, name):
        if not model.img:
            return 'отсутствует'
        url = url_for('static', filename=os.path.join(f'storage/block_success_popup/', model.img))

        if model.img.split('.')[-1] in ['jpg', 'jpeg', 'png', 'svg', 'gif']:
            return Markup(f'<img src={url} width="100">')

    column_formatters = {
        'img': _list_thumbnail
    }

    base_path = os.path.join(file_path, f'static/storage/block_success_popup')
    url_relative_path = 'storage/block_success_popup/'

    """


    """
    form_extra_fields = {
        "img": form.ImageUploadField('',
                                     base_path=base_path,
                                     url_relative_path=url_relative_path,
                                     namegen=name_gen_image,
                                     allowed_extensions=['jpg', 'jpeg'],
                                     thumbnail_size=(300, 195, True),
                                     )
    }


def create_form(self, obj=None):
    return super(ModelViewSuccessPopup, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewSuccessPopup, self).edit_form(obj)