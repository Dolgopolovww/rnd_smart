"""add champ

Revision ID: 592c13bb1fd9
Revises: 37bd39d0813e
Create Date: 2023-12-22 19:45:19.137492

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '592c13bb1fd9'
down_revision: Union[str, None] = '37bd39d0813e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('champ_group',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('bg_color', sa.String(), nullable=True),
    sa.Column('title_color', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('champ_team',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('name_color', sa.String(), nullable=True),
    sa.Column('logo', sa.String(), nullable=True),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('association',
    sa.Column('champ_group_id', sa.Integer(), nullable=True),
    sa.Column('champ_team_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['champ_group_id'], ['champ_group.id'], ),
    sa.ForeignKeyConstraint(['champ_team_id'], ['champ_team.id'], )
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('association')
    op.drop_table('champ_team')
    op.drop_table('champ_group')
    # ### end Alembic commands ###
