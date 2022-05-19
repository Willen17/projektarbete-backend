## comme ci comme ça ® 2022

# ![comme ci comme ça ® 2022](src/assets/images/Logo.png)

## About this project

This project is a school assignement where the task was to create a fully functional webshop where the costumer can order products. The customer can add/remove items from the cart and then fill out his/her name, address, email etc. The customer should after that have the option to choose how the products should be delivered (three different options avaialable) and choose a payment option. All input ields has a validator to provide a user friendly experience. Once the payment has been completed the user will be presented with an order confirmation!

Our webshop also has an admin page, you can access it by pressing the profile icon next to the shopping cart.
In the admin page you can add/remove products and change the price, description, image and so on.
Any product which is added from the admin page will be visibale for the customer since it's saved to the local storage!

This project was build with React, TypeScript and Material UI.

## Initiate project 👨‍💻

To run the project, simply write the following command in the terminal:

```

npm install

npm start

```

## Made by:

**Sara Lindqvist [**github**](https://github.com/saralindqvist)**

[demo](https://commecicommeca.netlify.app/)

### Krav för G

- [x] Alla sidor skall vara responsiva.
- [x] Arbetet ska implementeras med en React frontend och en Express backend.
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet
- [] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm)
- [] Man ska kunna logga in som administratör i systemet
- [x] Samtliga fält ska ha valideringsregler
- [X] Inga Lösenord får sparas i klartext i databasen
- [] Mockade produkter ska finnas i en egen fil och vara typade med ett TS interface
- [] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen
- [] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan
- [] Administratörer ska kunna se en lista på alla gjorda beställningar
- [] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera
- [] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten
- [] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas
- [x] Besökare ska kunna välja ett av flera fraktalternativ
- [X] Tillgängliga fraktalternativ ska vara hämtade från databasen
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält

### Krav för väl godkänt:

- [] Alla punkter för godkänt är uppfyllda
- [] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen
- [] En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången
- [] Administratörer ska kunna markera beställningar som skickade
- [] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte
- [] Administratörer ska kunna redigera vilka kategorier en produkt tillhör
- [] Administratörer ska kunna lägga till och ta bort produkter
- [] Backendapplikationen måste ha en fungerande global felhantering
-
