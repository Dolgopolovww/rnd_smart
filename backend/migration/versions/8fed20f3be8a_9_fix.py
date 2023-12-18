"""#9 -> fix

Revision ID: 8fed20f3be8a
Revises: cf2a4ab363d3
Create Date: 2023-12-18 14:18:15.633965

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8fed20f3be8a'
down_revision: Union[str, None] = 'cf2a4ab363d3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('interactive', sa.Column('title_interactive', sa.String(), nullable=False))
    op.add_column('interactive_cards', sa.Column('title_interactive_card', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('interactive_cards', 'title_interactive_card')
    op.drop_column('interactive', 'title_interactive')
    # ### end Alembic commands ###
