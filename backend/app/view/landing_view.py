import json
import os

from icecream import ic

from app.dao.base import HeaderDao, TermsDao, LandingDao, JsonLandingDao, get_socials_for_block_footer

from app.view.base_view import ModelViewBase

from schemas.schemas import LandingSchema 

file_path = os.path.abspath(os.path.dirname(__name__))

class ModelViewLanding(ModelViewBase):
    def on_model_change(self, form, model, is_created):
        # self.process_fields(model)

    # def process_fields(self, model):
        try:
            landing_schema = LandingSchema.from_orm(model)
            landing_json = landing_schema.model_dump_json()
            
            landing_data = json.loads(landing_json)

            #bonuses = get_bonuses_for_block_bonus(landing_schema.bonuses.id)
            #socials = get_socials_for_block_footer(landing_schema.footer.id)
            #blocks = get_blocks_for_interactive(landing_schema.mainBlock.interactive.id)
            #landing_data['mainBlock']['interactive']['blocks'] = blocks
            #landing_data['bonuses']['bonuses'] = bonuses
            #landing_data['footer']['socials'] = socials

            updated_json_string = json.dumps(landing_data, ensure_ascii=False)

            
            json_object = json.loads(updated_json_string)

            JsonLandingDao.add_json(json=json_object, slug=model.slug)

        except Exception as e:
            print(f"Error: {e}")
        pass

    column_list = ('id', 'title', 'slug', 'block_headers', 'banners', 'block_mains', 'block_bonuses', 'block_footers',
                   'success_popups', 'terms_popup',)
    column_filters = ['title', 'slug']
    #column_sortable_list = ['id', 'title']

def create_form(self, obj=None):
    return super(ModelViewLanding, self).create_form(obj)


def edit_form(self, obj=None):
    return super(ModelViewLanding, self).edit_form(obj)