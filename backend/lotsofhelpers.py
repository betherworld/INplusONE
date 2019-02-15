from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
 
from database_setup import Category, Base, Helper
 
engine = create_engine('sqlite:///helpers.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()



#Menu for UrbanBurger
helper1 = Helper(name = "Garana", telephone_number="+201061256929", email="mostafagarana@gmail.com")

category1 = Category(name="Animals")


helper2 = Helper(name = "Amr", telephone_number="+201061225929", email="amr@gmail.com")

helper1.categories.append(category1)
helper2.categories.append(category1)

session.add(helper1)
session.commit()

session.add(helper2)
session.commit()

session.add(category1)
session.commit()

print( "added menu items!")
