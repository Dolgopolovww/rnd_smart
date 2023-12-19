"""main btns

Revision ID: f2da4fef5ef2
Revises: 3fe7f078b0c2
Create Date: 2023-12-19 21:58:40.519017

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f2da4fef5ef2'
down_revision: Union[str, None] = '3fe7f078b0c2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('block_mains', sa.Column('terms_btn_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'block_mains', 'buttons', ['terms_btn_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'block_mains', type_='foreignkey')
    op.drop_column('block_mains', 'terms_btn_id')
    # ### end Alembic commands ###
