import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Helper(Base):
    __tablename__ = 'helper'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    telephone_number = Column(String(80), nullable=False)
    email = Column(String(80), nullable=False)
    categories = relationship('Category', secondary='helper_category')
    time = Column (DateTime, nullable=False )

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'telephone_name': self.telephone_name,
            'email': self.email,
        }


class Category(Base):
    __tablename__ = 'category'

    name = Column(String(80), nullable=False)
    id = Column(Integer, primary_key=True)
    helpers = relationship('Helper', secondary='helper_category')

    @property
    def serialize(self):
        return {
            'name': self.name,
            'id': self.id,
        }


class Helper_Category(Base):
    __tablename__ = 'helper_category'

    helper_id = Column(Integer, ForeignKey('helper.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('category.id'), primary_key=True)

class Users(Base):
    __tablename__ = 'Users'

    user_id = Column(Integer, primary_key= True)
    name = Column( String(80), nullable=False)
    address = Column( String(250), nullable=False )



engine = create_engine('sqlite:///helpers.db')
Base.metadata.create_all(engine)
