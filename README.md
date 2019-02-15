* This is a blockchain application that is usig ethereum to create a smart contract for exchanging tokens that represent for our 
application hours of help or credits to be used for healthcare or free taxes.

* To run this application you first download ganache, truffle framework, metamask and flask (python)

* This challenge was implemented to help users to be connected on a trusted network, where they can exchange hours of help they 
provide. A user that don't like the idea of exchanging hours for hours, then he can make benefit of tokens earned as credits to
get free healthcare or free of his taxes.

* We are using in the backend python flask as a base for our webApp and using sqlalchemy for the database of the app.

* This means that not all the process in decentralized but maybe in the future work, so we are using blockchain only as a network
for exchanging hours (tokens) between users.

* Our webApp archeticture is based on mainly three parts frontend, backend and blockchain. we designed an easy use webpage to be
flexible with all users with different ages.

* First the user will be logged in to the application, selecting the type of the service he wants. Then there comes the part of
the backend where it will do matching process to get the available provider. Afterwards, the backend will connect to the smart contract
where the provider address will be sent and his balance will be increased with the hours he will be willing to
give to the user.