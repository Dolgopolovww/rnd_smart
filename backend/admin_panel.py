from flask import Flask
from flask_admin import AdminIndexView, expose, Admin
from flask import request, jsonify

from app.view.block_footer_view import ModelViewBlockFooter
from app.view.block_header_view import ModelViewBlockHeader
from app.view.interactive_card_view import ModelViewInteractiveCard
from app.view.social_view import ModelViewSocial
from app.view.landing_view import ModelViewLanding

from app.view.success_popup_view import ModelViewSuccessPopup
from config import settings
from app.dao.base import ButtonDao, LandingDao, JsonLandingDao

from models.models import Role, Bonus, Banner, Button, ValueBonus, TypeBonus, \
    BlockBonus, User, UserSelection, Bookmaker, Landing, BonusBlockBonus, BannerButton, \
    Social, BlockFooter, FooterSocial, Interactive, InteractiveCard, InteractiveInteractiveCard, BlockHeader, BlockMain, \
    AddBlock, SuccessPopup, TermsPopup, JsonLanding

from flask_sqlalchemy import SQLAlchemy


from app.view.banner_view import ModelViewBanner

from app.view.base_view import ModelViewBase
from app.view.block_bonus_view import ModelViewBlockBonus
from app.view.bonus_view import ModelViewBonus
from app.view.bookmaker_view import ModelViewBookmaker

app_flask = Flask(__name__)
app_flask.secret_key = "super secret key"
app_flask.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
app_flask.config['SQLALCHEMY_DATABASE_URI'] = settings.database_url


db = SQLAlchemy(app_flask)






"""
file_path = os.path.abspath(os.path.dirname(__name__))


def name_gen_image(model, file_data):
    hash_name = f'{model}/{model.id}'
    return hash_name


class ModelViewBanner(ModelViewBase):

    form_extra_fields = {
        "bg_img": form.ImageUploadField('',
                                        base_path=os.path.join(file_path, 'rnd_smart/storage/banners'),
                                        url_relative_path='storage/banners/',
                                        namegen=name_gen_image,
                                        allowed_extensions=['jpg'],
                                        max_size=(1200, 780, True),
                                        thumbnail_size=(100, 100, True),
                                        )
    }
"""
"""
class ModelObject(ModelViewBase):
    form_excluded_columns = ["created_at"]
    column_searchable_list = ['created_at', 'name']
    column_filters = ['name']




class ModelButton(ModelViewBase):
    #form_columns = ['text', 'color', 'link', 'color_text', 'img', 'type_button_id']
    column_list = ['id', 'text', 'color', 'link', 'color_text', 'img', 'type_button_id']

class ModelBonus(ModelViewBase):
    #form_columns = ['title', 'img', 'title_description', 'description', 'button_id', 'value_id']
    column_list = ['id', 'title', 'img', 'title_description', 'description', 'button_id', 'value_id']

class ModelBanned(ModelViewBase):
    #form_columns = ['text', 'color', 'img', 'type_banner_id']
    column_list = ['id', 'text', 'color', 'img', 'type_banner_id']

class ModelLending(ModelViewBase):
    form_excluded_columns = ["created_at"]
    #form_columns = ['title', 'logo', 'slug', 'formula', 'description', 'bg_color_bonus',
    #                'items_id', 'condition_id', 'banner_id', 'medial_socials_id', 'button_id',]
    column_list = ['id', 'title', 'logo', 'slug', 'formula', 'description', 'bg_color_bonus',
                    'items_id', 'condition_id', 'banner_id', 'medial_socials_id', 'button_id',]

"""


class DashBoardView(AdminIndexView):
    @expose('/land')
    def add_data_db(self,):
        slug = request.args.get('slug')
        land = db.session.query(JsonLanding).filter_by(landing_slug=slug).first() 
        data = land.info_json

        print(data)

        if data:
            return data
        else:
            return jsonify({'error': 'Not found'}), 404
# TODO: добавить возможность загружать картинки в любом разрешение


admin = Admin(app_flask, name='Template Engine', template_mode='bootstrap3', index_view=DashBoardView(), endpoint='admin')

admin.add_view(ModelViewBase(Button, db.session, name="Кнопка", category="Элементы"))
admin.add_view(ModelViewBase(BannerButton, db.session, name="Кнопки для банера", category="Элементы"))
admin.add_view(ModelViewBase(Bookmaker, db.session, name="Букмекеры", category="Элементы"))
admin.add_view(ModelViewBase(ValueBonus, db.session, name="Данные бонуса", category="Элементы"))
admin.add_view(ModelViewBase(TypeBonus, db.session, name="Тип бонуса", category="Элементы"))
admin.add_view(ModelViewBase(Bonus, db.session, name="Бонусы", category="Элементы"))
admin.add_view(ModelViewBase(Social, db.session, name="Соц. сети", category="Элементы"))

admin.add_view(ModelViewBase(InteractiveCard, db.session, name="Карточки основного блока", category="Интерактивный блок"))
admin.add_view(ModelViewBase(Interactive, db.session, name="Основной блок", category="Интерактивный блок"))
admin.add_view(ModelViewBase(InteractiveInteractiveCard, db.session, name="Наполнение основного блока", category="Интерактивный блок"))

admin.add_view(ModelViewBase(TermsPopup, db.session, name="Terms Popup", category="Блоки"))
admin.add_view(ModelViewBase(BlockHeader, db.session, name="Block Headers", category="Блоки"))
admin.add_view(ModelViewBase(Banner, db.session, name="Banners", category="Блоки"))
admin.add_view(ModelViewBase(BlockMain, db.session, name="Block Mains", category="Блоки"))
admin.add_view(ModelViewBase(SuccessPopup, db.session, name="Блок success popup", category="Блоки"))
admin.add_view(ModelViewBase(BlockBonus, db.session, name="Block Bonuses", category="Блоки"))
admin.add_view(ModelViewBase(BonusBlockBonus, db.session, name="Наполнение блока бонусов", category="Блоки"))
admin.add_view(ModelViewBase(FooterSocial, db.session, name="Добавление соц. сетей для блока футер", category="Блоки"))
admin.add_view(ModelViewBase(BlockFooter, db.session, name="Блок футер", category="Блоки"))


admin.add_view(ModelViewLanding(Landing, db.session, name="Лендинги"))

admin.add_view(ModelViewBase(Role, db.session, name="Роли пользователей", category="Пользователи"))
admin.add_view(ModelViewBase(User, db.session, name="Пользователи", category="Пользователи"))
admin.add_view(ModelViewBase(UserSelection, db.session, name="Выбор пользователя", category="Пользователи"))



if __name__ == '__main__':
  app_flask.run(host='127.0.0.1', port=5005, debug=True)
