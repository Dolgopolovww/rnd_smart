import os

from flask import url_for
from flask_admin import Admin, form
from flask_admin.form import rules
from markupsafe import Markup
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from wtforms.widgets import TextArea

from app.view.base_view import ModelViewBase
from models.models import Banner

file_path = os.path.abspath(os.path.dirname(__name__))


class CKTextAreaWidget(TextArea):
    def __call__(self, field, **kwargs):
        if kwargs.get('class'):
            kwargs['class'] += " ckeditor"
        else:
            kwargs.setdefault('class', 'ckeditor')
        return super(CKTextAreaWidget, self).__call__(field, **kwargs)

class CKTextAreaField(TextAreaField):
    widget = CKTextAreaWidget()

class ModelViewBanner(ModelViewBase):
    extra_js = ['//cdn.ckeditor.com/4.6.0/standard/ckeditor.js']
    form_overrides = {
        'text': CKTextAreaField
    }



def create_form(self, obj=None):
    return super(ModelViewBanner, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewBanner, self).edit_form(obj)