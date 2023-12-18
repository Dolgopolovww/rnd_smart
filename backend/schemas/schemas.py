from typing import Optional, List

from pydantic import BaseModel, ConfigDict

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
    bg_color: Optional[str]
    bookmaker_id: int

    bookmakers: BookmakersSchema



class TermsPopupSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    bg_color: str
    text: str
    text_color: str


class BannerSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int 
    title_banner: str
    bg_color: str
    bg_img: Optional[str]
    text: str
    text_color: str


class ButtonSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    bg_color: str
    text: str
    text_color: str
    url: str
    analytics_endpoint: str

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
    currency: int

class TypeBonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str

class SuccessPopupSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    text: str
    text_color: str
    sub_text: str
    sub_text_color: str
    img: Optional[str]


class BonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_bonus: str
    img: Optional[str]
    text: str

    bookmaker_id: int
    button_id: int
    value_bonus_id: int
    type_id: int

    bookmakers: BookmakersSchema
    buttons: ButtonSchema
    value_bonuses: ValueBonusSchema
    type_bonuses: TypeBonusSchema

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
    bg_color: str
    block_bonus_id: int
    block_content_id: int

    bonuses: BonusSchema
    block_contests: BlockContentsSchema

class BlockBonusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_block_bonus: str
    logo: Optional[str]
    text: str
    text_color: str

class BlockFooterSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title_block_footer: str
    logo: Optional[str]
    bg_color: str
    bookmaker_id: int

    bookmakers: BookmakersSchema

class BlockMainSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    bg_color: str
    text: str
    text_color: str
    interactive_id: int
    buttons_id: int

    interactive: InteractiveSchema
    buttons: Optional[ButtonSchema] = None


class LandingSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    slug: str
    block_main_id: Optional[int]
    block_banner_id: int
    id: int
    block_terms_id: int
    block_footer_id: int
    block_headers_id: int
    block_add_id: Optional[int]
    block_success_popup_id: int
    block_bonus_id: int
    terms_popup: TermsPopupSchema

    block_headers: HeaderSchema  
    banners: BannerSchema  
    block_mains: Optional[BlockMainSchema]
    add_blocks: Optional[AddBlockSchema]  
    success_popups: SuccessPopupSchema  
    block_bonuses: BlockBonusSchema  
    block_footers: BlockFooterSchema  