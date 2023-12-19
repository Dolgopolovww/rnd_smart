"""fix

Revision ID: dec4d16dc1f1
Revises: 61148b04145f
Create Date: 2023-12-19 22:24:53.764196

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dec4d16dc1f1'
down_revision: Union[str, None] = '61148b04145f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('buttons', sa.Column('variant', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('buttons', 'variant')
    # ### end Alembic commands ###
