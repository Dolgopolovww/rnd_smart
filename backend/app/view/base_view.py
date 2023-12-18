from flask_admin.contrib.sqla import ModelView


class ModelViewBase(ModelView):
    create_modal = True
    edit_modal = True
    column_display_pk = True