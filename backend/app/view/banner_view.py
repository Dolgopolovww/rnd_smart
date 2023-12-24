import os

from flask_ckeditor import CKEditorField

from app.view.base_view import ModelViewBase

file_path = os.path.abspath(os.path.dirname(__name__))

class ModelViewBanner(ModelViewBase):
    form_overrides = dict(
            text=CKEditorField
        )
    create_template = "admin/edit.html"
    edit_template = "admin/edit.html"

