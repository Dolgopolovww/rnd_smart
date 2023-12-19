from typing import Optional, List, Any

from pydantic import BaseModel, ConfigDict, Json, Field


class BookmakersSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    logo: Optional[str]
    name: Optional[str]
    url: Optional[str]

class HeaderSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    logo: Optional[str]
    bgColor: Optional[str] = Field(alias='bg_color')

    partner: BookmakersSchema = Field(alias='bookmakers')



class TermsPopupSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    bgColor: str = Field(alias='bg_color')
    text: str
    textColor: str = Field(alias='text_color')



class BannerSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int 
    title_banner: str
    bgColor: str = Field(alias='bg_color')
    bgImg: Optional[str] = Field(alias='bg_img')
    text: str
    textColor: str = Field(alias='text_color')


class ButtonSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    bgColor: str = Field(alias='bg_color')
    text: str
    textColor: str = Field(alias='text_color')
    url: str
    analyticsEndpoint: str = Field(alias='analytics_endpoint')

# TODO вынести кнопку наружу
class InteractiveSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_interactive: str
    reset_button_id: int

    buttons: ButtonSchema

class ValueBonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    value: int
    currency: str

class TypeBonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str

class SuccessPopupSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    text: str
    textColor: str = Field(alias='text_color')
    subText: str = Field(alias='sub_text')
    subTextColor: str = Field(alias='sub_text_color')
    img: Optional[str]


class SocialSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    url: str
    icon: Optional[str]

class BonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    titleBonus: str = Field(alias='title_bonus')
    img: Optional[str]
    text: str

    bookmaker: BookmakersSchema = Field(alias='bookmakers')
    buttons: ButtonSchema
    value: ValueBonusSchema = Field(alias='value_bonuses')
    typeBonus: TypeBonusSchema = Field(alias='type_bonuses')

class BlockContentsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_interactive: str
    reset_button_id: str

    buttons: ButtonSchema

class AddBlockSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    bgColor: str = Field(alias='bg_color')
    block_bonus_id: int
    block_content_id: int

    bonuses: BonusSchema
    block_contests: BlockContentsSchema

class InteractiveCardSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title_interactive_card: str
    key: str
    img: Optional[str]
    text: str
    text_color: str

class BlockBonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_block_bonus: str
    logo: Optional[str]
    text: str
    textColor: str = Field(alias='text_color')

class BonusBlockBonus(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    bonus_id: int
    block_bonus_id: int
    block_bonuses: BlockBonusSchema
    bonuses: List[BonusSchema]


# TODO socials
class BlockFooterSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    logo: Optional[str]
    bgColor: str = Field(alias='bg_color')

    partner: BookmakersSchema = Field(alias='bookmakers')

class BlockMainSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    bgColor: str = Field(alias='bg_color')
    text: str
    textColor: str = Field(alias='text_color')

    interactive: InteractiveSchema
    buttons: Optional[ButtonSchema] = Field(alias='button')

def to_camel_case(snake_str):
    return "".join(x.capitalize() for x in snakestr.lower().split(""))

def to_lower_camel_case(snake_str):
    camel_string = to_camel_case(snake_str)
    return snake_str[0].lower() + camel_string[1:]

class LandingSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    slug: str

    #block_main_id: Optional[int]
    #block_banner_id: int
    #block_terms_id: int
    #block_footer_id: int
    #block_headers_id: int
    #block_add_id: Optional[int]
    #block_success_popup_id: int
    #block_bonus_id: int


    termsPopup: TermsPopupSchema = Field(alias='terms_popup')
    header: HeaderSchema = Field(alias='block_headers')
    heroBlock: BannerSchema  = Field(alias='banners')
    mainBlock: Optional[BlockMainSchema] = Field(alias='block_mains')
    add_blocks: Optional[AddBlockSchema]  
    successPopup: SuccessPopupSchema = Field(alias='success_popups')
    bonuses: BlockBonusSchema  = Field(alias='block_bonuses')

    footer: BlockFooterSchema = Field(alias='block_footers')


