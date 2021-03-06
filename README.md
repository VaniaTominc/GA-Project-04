# [General Assembly - Project 04] Truff·l·uxury

## Overview
**Truff·l·uxury** is an online store dedicated to the sale of Istrian truffles. The products are sourced from Istria (Croatia, Slovenia), which is considered one of the most important and best places for naturally grown truffles in the world. Customers can browse between different products in different categories, leave comments, and purchase products.

- ### Timeframe

A 9 day solo project. 

- ### Deployed version

https://truffluxury.herokuapp.com/

## Table of contents
+ Brief
+ Technologies used:
    - Backend,
    - Frontend,
    - Development tools.
+ Installation
+ Process:
    - Planning:
        + Concept,
        + Organisation.
    - Backend,
    - Frontend:
        + Components,
        + Styling.
    - Project walkthrough.
+ Bugs, challenges, wins:
    - Bugs,
    - Challenges,
    - Wins.
+ Future features and key learnings:
    - Future features,
    - Key learnings.

## Brief

- **Build a full-stack application** by making your own backend and your own frontend.
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
- **Consume your API with a separate frontend** built with React.
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut.
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

## Technologies used

+ **Frontend:**
    - React.js,
    - Axios,
    - CSS3,
    - React Bootstrap,
    - SASS.

+ **Backend:**
    - Python,
    - Django,
    - Django REST framework,
    - PyJWT.

+ **Development tools:**
    - Visual Studio Code,
    - Insomnia,
    - Yarn,
    - Git & GitHub,
    - Google Chrome development tools,
    - Trello board for planning,
    - Adobe Photoshop,
    - Heroku (deployment).

## Installation

+ Clone or download GA-Project-04.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130601969-fba2fe86-91c7-4af7-8c20-52f432249829.png">
</p>

+ Inside your Terminal move to your desired folder and use command:

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130602062-3642aab1-33d8-4d09-9a41-69876d7477e2.png">
</p>


+ Open project and open a terminal inside your chosen code editor.
    - Split terminal in two windows:
        * Use 1st terminal for backend by typing truffluxe and type:
            + ```pipenv``` to install Python packages,
            + ```pipenv shell``` to enter virtual environment,
            + ```python manage.py makemigrations``` to prepare migrations,
            + ```python manage.py migrate``` to migrate,
            + ```python manage.py loaddata categories/seeds.json``` to seed data for categories,
            + ```python manage.py loaddata images/seeds.json``` to seed data for images,
            + ```python manage.py loaddata jwt_auth/seeds.json``` to seed data for users,
            + ```python manage.py loaddata opinions/seeds.json``` to seed data for opinions/comments.
            + ```python manage.py loaddata truffles/seeds.json``` to seed data for products,
            + ```python manage.py runserver``` to run backend server.
        * Use 2nd terminal for frontend by typing client and type:
            + ```yarn``` to install yarn packages on the frontend.
            + ```yarn start``` to start the frontend server.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130602294-bd566705-cd5d-41c0-be31-76b1392f2870.png">
</p>

   - Go to localhost:8000 in the browser of your choice to see the app.

## Process

+ ### Planning

#### ➡️ Concept
Before I started the course at General Assembly, I would never have imagined I could set up my online store at any time. The thought of it filled me with fear, especially the filtering functionality. It was the functionality I wanted to master from my second project onward. But, because I love impossible challenges, I decided to build an online store to prove I can do it and achieve whatever I want. After consulting with my GA instructors, who supported my proposal, I decided to do my last project by myself. I knew I wanted the final product to be as perfect as possible, so I started my final project optimistically. For the theme of my online store, I decided it would be a luxury store that sells Istrian truffles. 

#### ➡️ Organisation
When I received the final confirmation from GA teachers, I decided to plan immediately. I used the Trello board to organize my work plan, and in some cases, I also used the "classic" approach of using paper and pencils. Before I started programming, I sketched out how my website would look.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130602580-7a1391eb-1c96-4031-b443-b80db7a58c9f.png">
</p>

+ ### Backend

As I worked on my project alone and knew that I wanted my online shop to be as close as possible to a real online shop, I first decided to build a back
end. From the outset, I knew what type of relationship I wanted between the main app ```truffles.py``` and others.

In the end, the folders of different apps on the backend look like the below picture, and each folder has a similar structure to the truffle folder.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130604586-1267c5b8-6e6c-40da-9848-17a46b45090f.png">
  <img src="https://user-images.githubusercontent.com/83227280/130604627-5e40a4fb-476e-43f1-8452-0e3fd183df0d.png">
</p>

Each folder has its purpose:
+ **truffles** – main app.
+ **categories** – forms a many-to-many relationship with truffles. Aimed to create store categories like "all," "fresh products," "alcohol,"...
+ **images** – forms a many-to-many relationship with truffles. In addition to the main image, every product also has a gallery with more pictures.
+ **opinions** – forms a many-to-many relationship with truffles. Intended for users' reviews.
+ **jwt_auth** – intended for user authentication when registering or logging into the website.

The main app is **truffles**, which ```model.py``` looks like:

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603146-ea2cc9a7-3575-417d-a7fd-80dca183a4d4.png">
</p>

Categories and photos are then linked to truffles through a many-to-many relationship, while the owner is responsible for user registration and log-in, as well as authentication. The truffle ```model.py``` has “photos,” which are related to the folder called images. I want to point out that photos/images are not the same as images in the same model. Whereas photos can have multiple items, images can only store one item. The inconvenient naming comes from the problem I faced when I tried to do makemigration/migrate my data after trying to rename a field "images" with a new name. Something that I need to change in the future to prevent confusion.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603210-0db726e0-586f-4d08-a724-76b8881fe3d5.png">
</p>

Each app has several options in ```views.py``` (example of truffles’ ```views.py```): GET one product, GET all products, POST one product, EDIT one product, DELETE one product.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603247-78ad798f-934b-4e4d-b664-89bc6b32942e.png">
</p>

Other apps have the same functionalities. I decided to take this step because I wanted the backend to have as many functionalities as possible. I was aware that due to insufficient time, I would not implement all the functions from the backend to the frontend, but I did it with the future in mind. If I have time, I will implement everything I have created on the backend. I tested all functionalities in Insomnia, where they worked 100%.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603284-6c572c6d-4cec-4025-b214-37706d64b064.png">
</p>

+ ### Frontend

As soon as I set up the backend, I successfully connected it to the frontend and started building the frontend. In the Django administration, it looked like this.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603351-1b4878be-3e5d-48c4-b670-f365fd3de1e2.png">
</p>

### Components
#### ➡️  Navbar

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603508-157ce4bb-1945-41be-a05e-7cfe49b77d08.png">
  <img src="https://user-images.githubusercontent.com/83227280/130603541-15015f83-e6c9-4ae0-9275-d6beda3ba218.png">
</p>

My navbar displays three things: the search icon, the logo, and the hamburger icon. Since every successful store also needs other links, I added them inside the hamburger. A new window appears if a user clicks on the hamburger icon. It contains links to other pages. The appearance of this new window also depends on whether the user has logged in or not.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130602741-1ba99489-27ff-4493-9c1f-4e7c56804cd4.png">
</p>

#### ➡️  Register & Login

When registering, the customer must choose a unique username, email, password, and confirm password before proceeding with the registration. If there is no customer in the database with the existing username or email, the customer is successfully registered.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603642-e1de6788-a00f-4642-98de-6d75405b1e5a.png">
</p>

Upon successful registration, the customer is redirected to the login page. If the data entered is the same as the data stored in the database, the customer then gets access to his profile.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603743-a8156101-ff0c-4ff8-9ebb-b27251a00019.png">
</p>

In his profile, the user can check his data, any comments, and access a page that allows him to update personal information. The only thing he can't do is change the username. If the user wants to delete his account, he can do so.

#### ➡️  "Products" folder – Shop, FilteredByCategory, ProductsInfoPage

One of my biggest wishes before starting the last project was to successfully implement the filtering function. My main idea was for a user to click on a "Shop" and only see categories. Each category would then contain only products that fall under that category. To my great delight, I managed to do it without significant issues.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603789-de5252eb-432c-4dd1-a9bc-ebcaa4297db4.png">
</p>

I solved my problem elegantly with a many-to-many relationship between truffles and categories. I first called the GET request for all categories to be displayed.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603849-91877468-6037-4f15-a26f-b7824b436e8e.png">
</p>

However, as each category can have several products, I then used the GET request for an individual category and then populated the page with the relevant products.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603909-e0ad6628-c5f1-4680-9d34-230eb7de48af.png">
</p>

In online stores, a product can appear inside many categories. I decided to use the same functionality for displaying all my products. I could have done it by simply calling the GET request for all products, but I wanted to try something different. This is the explanation why I created a category called "all" and stored all the products inside of it. In this way, my products can now belong not only to one category, but also to multiple.

When the user enters an individual category, all products related to that category are displayed. If the user clicks on the product, it redirects him to the home page of the product.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130603965-14cbb405-5989-4aa8-8801-6f2dbcd46eb1.png">
</p>

Comments about the viewed product also appear on the individual product page. If the user is not registered, he cannot comment on the product, nor can he correct or delete a comment if he is not the owner of that comment.  To achieve all these functionalities, I built two different components.

```AddComent``` component handles the POST request and checks whether the user has commenting rights.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130604029-e6cad8c0-98a2-444e-afc7-9b2fbe4850f8.png">
</p>

The second component is ```EditDeleteComment```. The owner of the comments has the right to update or delete his comments. After deleting his comment, the user is redirected to the home page. This works 100%. Alternatively, the user should be redirected to the product page where his comment is stored if he decides to update the comment. In theory, it is a brilliant idea, not so brilliant in practice. Why?  There are few things happening. If I am running code from the server, it should work. But there is still a minor bug. What is happening? If the user is redirected back to the product page after updating the comment, the current code reads the id of the comment as the id of the product. For example, if the comment id is 38, the code supposes the product id is 38, and the user is redirected to that page. But there are many cases where product IDs differ from the comments IDs. Despite the successful update of the comment, the user is then redirected to the wrong page or to the wrong page that does not exist. I tried to solve this small problem with different approaches, but decided on the next solution. The solution is ideal if the user accesses the update / delete comments section from the product page in which the original comment is located.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130604084-b9397bb8-fd64-4b5c-8cd0-fac26bf01e6d.png">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130604165-97099ca4-c734-408f-808f-706c753e5bf1.png">
</p>

The above was my original code. But when it came time to deploy my project, my code stopped working. I could not update, nor delete comments. After checking the code and attempting to resolve the issue, I had to decide on an even less optimal solution. Now, when a user deletes his comment, he is redirected to the shop page. When he updates his comment, he is redirected to the profile page. I need to sort out this problem/glitch.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130604217-769a2d67-54e3-42a0-8a8e-a0c313e032c5.png">
</p>

#### ➡️  Basket

I originally intended to create ```Basket``` as another app in the backend and connect it to the main truffle app. After I suggested this idea to the instructors, they told me it would be too easy for me, and I should aim to achieve the same functionality with the frontend instead. Here, however, I began to face problems that I could easily solve if I had more time.

To tackle my problem, I added the "quantity" and "cart" fields inside my truffles ```model.py```. The first one got the value of 1, the second one was set to false. Because I wanted to check if my code would work, I originally used the GET request of all products and added buttons for **add**, **remove**, **increase**, **decrease** and the final **sum**. My initial code worked, the only issue I had was when the page was refreshed, all data was deleted. After reading the documentation, I figured it would be necessary to use localstorage to sort the problem of my "disappearing" data. I also decided to use a GET request for one product. In other words, if a customer views a particular product, he can click on the add button, and the product then appears inside the basket. Since I was unable to 100% imitate the previous logic to the new component, I changed my initial working code, which unfortunately slightly broke my code.  

What is the problem? 

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130880344-29029dc7-0ad8-4fa7-94ff-323040d4eef9.gif">
</p>

In the above gif, we can see that one product is displayed twice. This happens when customers add the item to the cart more than once. If they then want to remove the extra from the basket, both products are removed. The cart price also doesn’t refresh properly when products are removed. I am aware that in the first case, I should have added an if-else statement to check if the same product already exists in the basket, while in the second case, I think I need to change my code slightly, and then the cart price will be correctly displayed. I also need to make sure that any internal changes to the cart, like +, -, remove, are saved to the localstorage and a new status is displayed when the web page is refreshed. Due to all these minor problems, my cart currently does not work 100%.

#### ➡️  Other components

During the project week, I also attempted to build a component for uploading images. My original plan was to use it for when the customer registers to the page, he could upload a profile image. Due to time constraints, the component was not finished.

The second component not included in the final product was a custom-made carousel. It was working fine, but then the code broke down when I installed React Bootstrap. Thankfully, Bootstrap gave me a better solution with its Carousel option, so I opted for Bootstrap Carousel.

### Styling (day 2 - day 9)

In the beginning, I decided to use pure CSS for my website. I wanted to test my knowledge of CSS in practice, but also because I found excellent documentation for many things I wanted to implement in my project, including how to open burger icon with only CSS. My other reason for using pure CSS was because, in Project 2 and Project 3, I had many issues with different CSS frameworks, like Bulma or React Semantic UI. While they are brilliant tools for people who are not fond of pure CSS, they can cause problems for people who love pure CSS and like to experiment. Bulma and React Semantic UI are simply too limited when it comes to customization.

My initial plan worked well at first. After reading the additional documentation, I did build my search bar modal and my carousel in FilteredCategories.js, among other things. I also tried to make the website as responsive as possible. However, as I ran out of time and my CSS suddenly stopped working the night before the deadline, I decided to use React Bootstrap instead. On the one hand, God sends, in contrast, bigger headaches. Due to the similar naming of larger classes, Bootstrap and my customized CSS crashed badly. Some of my components became unusable, like Search Bar or my carousel, others completely changed their appearance. However, since the water was running down my throat, and I am headstrong by nature, there was no other way to bite late into the night and try to solve everything I could. To a large extent, I also managed to do that. Therefore, I do not regret my choice to use it at the last minute and I definitely plan to use it in my future projects.

+ ### Project walkthrough

#### ➡️  Home page & Search bar

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130879411-b830c1f8-2a07-4422-a1f8-35a785434f19.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130879732-40ba1203-19f2-4635-8482-ffd484c2c7be.gif">
</p>

#### ➡️  Shop/Category page & Product description page

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130879569-bc41be01-c50a-493a-98db-6cd2d98b4cdf.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130879588-01f68230-7cb0-4b7e-b082-39d4cf203e04.gif">
</p>

#### ➡️  Login/Register page & Register page

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130878326-0c9b46fb-9c1e-436a-91bc-05ea0fcf49d9.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130878334-35740fcf-fbd3-4d80-b390-35aaecaf2037.gif">
</p>

#### ➡️  Login/Logout page & Profile update

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130876537-3df70f53-c930-4ab8-9ef4-d6d039af6470.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130876414-90b61643-d112-49fd-8009-ed7a22a859a2.gif">
</p>

#### ➡️ Profile delete & Post comment

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130878436-7737624c-98bd-4278-b499-e53ef96e548a.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130879811-e54d3e34-775c-4a26-8a2f-ccd48a8c7bda.gif">
</p>

#### ➡️ Update comment & Delete comment

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130878539-3bdcf34b-5a0c-4641-a313-7bef7e9f5703.gif">
  <img src="https://user-images.githubusercontent.com/83227280/130878574-c015bb26-34e7-4418-bc2b-653aa7c3b037.gif">
</p>

#### ➡️ Basket page

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/130878636-550f12fa-58eb-4308-92b3-4bb0500a7e38.gif">
</p>






## Bugs, Challenges, Wins
+ ### Bugs
    - Not a bug, per se, but when someone registers, he is not automatically logged in to the page. When I created my component, a user was logged in upon registration, then suddenly my code did not allow it anymore. I think it might be due to a minor change in my original code. I need to take a closer look into it. Nevertheless, I solved this "flaw" so that when the user registers successfully, he is redirected back to the login page and can log in.
    - Before you add the first product to the basket, if you check the basket, it is empty and the page empty with no other content (navbar is missing). 
    - If the user wants to add the same product to the cart more than once, it is not added to the existing product, but is repeated underneath. Consequently, it causes problems when a user attempts to remove one of the products and both are removed.
    - The price does not refresh when you remove the product from the cart. 
    - In the deployed version, delete / update functionalities for comments stopped working. I had to change my code slightly, but it is still buggy.
+ ### Challenges
    - It was an amusing experience to use Bootstrap without reading its documentation properly. Thankfully, I managed to sort nearly all conflicting problems. It also taught me how to not use the latest technology one night before the presentation.
    - Building a basket on the frontend and storing products inside localstorage. 
    - Changing model on the backend and then using commands ```python manage.py makemigrations``` and ```python manage.py migrate```. It was causing errors. The only way to sort, it was to dump data and reseed it again. Thankfully, it sorted my problems.
+ ### Wins
    - For the time I had, I surprisingly built a lot. 
    - I am proud that I could build the type of website I wanted when I started the project. 
    - Although during the week, I encountered some problems, I managed to sort almost all of them. 
    - This week I also learned a lot about myself. Namely, if I want to achieve something, I can do it. 
    - This week also showed me why I love coding and why I want to work as a software engineer.

## Future features and key learnings

+ ### Future features
    - Adding the option where the site administrator can enter product information through the website itself. For now, it can only be done through the Django Administration.
    - Completing the basket component.
    - Finishing building the like system. When a customer likes a product, he can then view the liked product inside his profile page.
    - Finishing building the component for uploading a profile image.
    - Finding a better solution for the rating system.
    - Better error handling.
+ ### Key learnings
    - My biggest takeaway from this project is the power of my determination. As I worked solo on this project, I knew that if I wanted to create my application in the way I wanted to build it, I would need to work hard and be focused 100%. I can say, I surprised even myself, and I am delighted I could prove to myself I can code by myself. 
    - I enjoyed the whole week and was reminded daily why I love coding and why I am a big fan of Python. Not only due to its simple and clear code, but also due to its power. I look forward to building more applications in Python.

