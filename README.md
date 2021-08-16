# [Project 04] with Genereal Assembly: `Truff·l·uxury`.

## Overview
**Truff·l·uxury** is an online store dedicated to the sale of Istrian truffles. The products are sourced from Istria (Croatia, Slovenia), which is considered one of the most important and best places for naturally grown truffles in the world. Customers can browse between different products in different categories, leave comments, and purchase products.

- ### Timeframe

A 9 days solo project. 

- ### Deployed version

https://truffluxury.herokuapp.com/

## Table of contents
+ Brief
+ Technologies used
    - Backend
    - Frontend
    - Development tools
+ Installation
+ Process
    - Planning
        + Concept
        + Organisation
    - Backend
    - Frontend
        + Components
        + Styling
    - Project walkthrough
+ Bugs, challenges, wins
    - Bugs
    - Challenges
    - Wins 
+ Extra features and key learnings
    - Extra features
    - Key learnings

## Brief

- **Build a full-stack application** by making your own backend and your own front-end.
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
- **Consume your API with a separate front-end** built with React.
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

**PICTURE** 

+ Inside your Terminal move to your desired folder and use command:

**PICTURE** 

+ Open project and open a terminal inside your chosen code editor.
    - Split terminal in two windows:
        * Use 1st terminal for back-end by typing truffluxe and type:
            + `pipenv` to install Python packages,
            + `pipenv shell` to enter virtual environment,
            + `python manage.py makemigrations` to prepare migrations,
            + `python manage.py migrate` to migrate,
            + `python manage.py loaddata categories/seeds.json` to seed data for categories,
            + `python manage.py loaddata images/seeds.json` to seed data for images,
            + `python manage.py loaddata jwt_auth/seeds.json` to seed data for users,
            + `python manage.py loaddata opinions/seeds.json` to seed data for opinions/comments.
            + `python manage.py loaddata truffles/seeds.json` to seed data for products,
            + `python manage.py runserver` to run back-end server.
        * Use 2nd terminal for front-end by typing client and type:
            + `yarn` to install yarn packages on the front-end.
            + `yarn start` to start the front-end server.

**PICTURE**

   - Go to localhost:8000 in the browser of your choice to see the app.

## Process

+ ### Planning

#### Concept
Before I started the course at General Assembly, I would never have imagined I could set up my online store at any time. The thought of it filled me with fear, especially the filtering functionality. It was the functionality I wanted to master from my second project onward. But, because I love impossible challenges, I decided to build an online store to prove I can do it and achieve whatever I want. After consulting with my GA instructors, who supported my proposal, I decided to do my last project by myself. I knew I wanted the final product to be as perfect as possible, so I started my final project optimistically. For the theme of my online store, I decided it would be a luxury store that sells Istrian truffles. 

#### Organisation
When I received the final confirmation from GA teachers, I decided to plan immediately. I used the Trello board to organize my work plan, and in some cases, I also used the "classic" approach of using paper and pencils. Before I started programming, I sketched out how my website would look.

**ADD PICTURE**

+ ### Backend

As I worked on my project alone and knew that I wanted my online shop to be as close as possible to a real online shop, I first decided to build a back-end. From the outset, I knew what type of relationship I wanted between the main app `truffles.py` and others.

In the end, the folders of different apps on the back-end look like the below picture, and each folder has a similar structure to the truffle folder.

**ADD PICTURES**

Each folder has its purpose:
+ **truffles** – main app.
+ **categories** – forms a many-to-many relationship with truffles. Aimed to create store categories like "all," "fresh products," "alcohol,"...
+ **images** – forms a many-to-many relationship with truffles. In addition to the main image, every product also has a gallery with more pictures.
+ **opinions** – forms a many-to-many relationship with truffles. Intended for users' reviews.
+ **jwt_auth** – intended for user authentication when registering or logging into the website.

The main app is **truffles**, which `model.py` looks like:

**ADD PICTURE**

Categories and photos are then linked to truffles through a many-to-many relationship, while the owner is responsible for user registration and log-in, as well as authentication. The truffle `model.py` has “photos,” which are related to the folder called images. I want to point out that photos/images are not the same as images in the same model. Whereas photos can have multiple items, images can only store one item. The inconvenient naming comes from the problem I faced when I tried to do makemigration/migrate my data after trying to rename a field "images" with a new name. Something that I need to change in the future to prevent confusion.

**ADD PICTURE**

Each app has several options in `views.py` (example of truffles’ `views.py`): GET one product, GET all products, POST one product, EDIT one product, DELETE one product.

**ADD PICTURE**

Other apps have the same functionalities. I decided to take this step because I wanted the back-end to have as many functionalities as possible. I was aware that due to insufficient time, I would not implement all the functions from the back-end to the front-end, but I did it with the future in mind. If I have time, I will implement everything I have created on the back-end. I tested all functionalities in Insomnia, where they worked 100%.

**ADD PICTURE**

+ ### Frontend

As soon as I set up the back-end, I successfully connected it to the front-end and started building the front-end. In the Django administration, it looked like this.

**ADD PICTURE**

#### Components
+ ##### Navbar

**ADD PICTURE**

My navbar displays three things: the search icon, the logo, and the hamburger icon. Since every successful store also needs other links, I added them inside the hamburger. A new window appears if a user clicks on the hamburger icon. It contains links to other pages. The appearance of this new window also depends on whether the user has logged in or not.

**ADD PICTURE**

+ ##### Register & Login

When registering, the customer must choose a unique username, email, password, and confirm password before proceeding with the registration. If there is no customer in the database with the existing username or email, the customer is successfully registered.

**ADD PICTURE**

Upon successful registration, the customer is redirected to the login page. If the data entered is the same as the data stored in the database, the customer then gets access to his profile.

**ADD PICTURE**

In his profile, the user can check his data, any comments, and access a page that allows him to update personal information. The only thing he can't do is change the username. If the user wants to delete his account, he can do so.

+ ##### "Products" folder – Shop, FilteredByCategory, ProductsInfoPage

One of my biggest wishes before starting the last project was to successfully implement the filtering function. My main idea was for a user to click on a "Shop" and only see categories. Each category would then contain only products that fall under that category. To my great delight, I managed to do it without significant issues.

**ADD PICTURE**

I solved my problem elegantly with a many-to-many relationship between truffles and categories. I first called the GET request for all categories to be displayed.

**ADD PICTURE**

However, as each category can have several products, I then used the GET request for an individual category and then populated the page with the relevant products.

**ADD PICTURE**

In online stores, a product can appear inside many categories. I decided to use the same functionality for displaying all my products. I could have done it by simply calling the GET request for all products, but I wanted to try something different. This is the explanation why I created a category called "all" and stored all the products inside of it. In this way, my products can now belong not only to one category, but also to multiple.

When the user enters an individual category, all products related to that category are displayed. If the user clicks on the product, it redirects him to the home page of the product.

**ADD PICTURE**

Comments about the viewed product also appear on the individual product page. If the user is not registered, he cannot comment on the product, nor can he correct or delete a comment if he is not the owner of that comment.  To achieve all these functionalities, I built two different components.

`AddComent` component handles the POST request and checks whether the user has commenting rights.

**ADD PICTURE**

The second component is `EditDeleteComment`. The owner of the comments has the right to update or delete his comments. After deleting his comment, the user is redirected to the home page. This works 100%. Alternatively, the user should be redirected to the product page where his comment is stored if he decides to update the comment. In theory, it is a brilliant idea, not so brilliant in practice. Why?  There are few things happening. If I am running code from the server, it should work. But there is still a minor bug. What is happening? If the user is redirected back to the product page after updating the comment, the current code reads the id of the comment as the id of the product. For example, if the comment id is 38, the code supposes the product id is 38, and the user is redirected to that page. But there are many cases where product IDs differ from the comments IDs. Despite the successful update of the comment, the user is then redirected to the wrong page or to the wrong page that does not exist. I tried to solve this small problem with different approaches, but decided on the next solution. The solution is ideal if the user accesses the update / delete comments section from the product page in which the original comment is located.

**ADD PICTURE**

The above was my original code. But when it came time to deploy my project, my code stopped working. I could not update, nor delete comments. After checking the code and attempting to resolve the issue, I had to decide on an even less optimum solution. Now, when a user deletes his comment, he is redirected to the shop page. When he updates his comment, he is redirected to the profile page. I need to sort out this problem/glitch.

**ADD PICTURE**

+ ##### Basket

I originally intended to create `Basket` as another app in the back-end and connect it to the main truffle app. After I suggested this idea to the instructors, they told me it would be too easy for me, and I should aim to achieve the same functionality with the front-end instead. Here, however, I began to face problems that I could easily solve if I had more time.

To hackle my problem, I added the "quantity" and "cart" fields inside my truffles `model.py`. The first one got the value of 1, the second one was set to false. Because I wanted to check if my code would work, I originally used the GET request of all products and added buttons for **add**, **remove**, **increase**, **decrease** and the final **sum**. My initial code worked, the only issue I had was when the page was refreshed, all data was deleted. After reading the documentation, I figured it would be necessary to use localstorage to sort the problem of my "disappearing" data. I also decided to use a GET request for one product. In other words, if a customer views a particular product, he can click on the add button, and the product then appears inside the basket. Since I was unable to 100% imitate the previous logic to the new component, I changed my initial working code, which unfortunately slightly broke my code.  

What is the problem? 

**ADD GIFS TO ILLUSTRATE THE PROBLEM**

In the above gifs, we can see that one product is displayed twice. This happens when a customer wants to add the same product to the cart more than once. If the customer then wants to remove one of those double products from the basket, both products are removed. If the customer successfully removes the product, the cart price does not refresh properly. I am aware that in the first case, I should have added an if-else statement to check if the same product already exists in the basket, while in the second case, I think I need to change my code slightly, and then the cart price will be correctly displayed. I also need to make sure that any internal changes to the cart, like +, -, remove, are saved to the localstorage and a new status is displayed when the web page is refreshed. Due to all these minor problems, my cart currently does not work 100%.

+ ##### Other components

During the project week, I also attempted to build a component for uploading images. My original plan was to use it for when the customer registers to the page, he could upload a profile image. Due to time constraints, the component was not finished.

The second component not included in the final product was a custom-made carousel. It was working fine, but then the code broke down when I installed React Bootstrap. Thankfully, Bootstrap gave me a better solution with its Carousel option, so I opted for Bootstrap Carousel.

#### Styling (day 2 - day 9)

In the beginning, I decided to use pure CSS for my website. I wanted to test my knowledge of CSS in practice, but also because I found excellent documentation for many things I wanted to implement in my project, including how to open burger icon with only CSS. My other reason for using pure CSS was because, in Project 2 and Project 3, I had many issues with different CSS frameworks, like Bulma or React Semantic UI. While they are brilliant tools for people who are not fond of pure CSS, they can cause problems for people who love pure CSS and like to experiment. Bulma and React Semantic UI are simply too limited when it comes to customization.

My initial plan worked well at first. After reading the additional documentation, I did build my search bar modal and my carousel in FilteredCategories.js, among other things. I also tried to make the website as responsive as possible. However, as I ran out of time and my CSS suddenly stopped working the night before the deadline, I decided to use React Bootstrap in an emergency. On the one hand, God sends, in contrast, bigger headaches. Due to the similar naming of larger classes, Bootstrap and my customized CSS crashed badly. Some of my components became unusable, like Search Bar or my carousel, others completely changed their appearance. However, since the water was running down my throat, and I am headstrong by nature, there was no other way to bite late into the night and try to solve everything I could. To a large extent, I also managed to do that. Therefore, I do not regret my choice to use it at the last minute. And I definitely plan to use it in my future projects.

+ ### Project walkthrough

**ADD GIFS**

## Bugs, Challenges, Wins
+ ### Bugs
    - Not a bug, per se, but when someone registers, he is not automatically logged in to the page. When I created my component, a user was logged in upon registration, then suddenly my code did not allow it anymore. I think it might be due to a minor change in my original code. I need to take a closer look into it. Nevertheless, I solved this "flaw" so that when the user registers successfully, he is redirected back to the login page and can log in.
    - Before you add the first product to the basket, if you check the basket, it is empty and the page empty with no other content (navbar is missing).
    - If the user wants to add the same product to the cart more than once, it is not added to the already existing same product, but is doubled. Consequently, it causes problems when a user attempts to remove one of the products, and both are removed.  
    - The price does not refresh when you remove the product from the cart. 
    - In the deployed version, delete / update functionalities for comments stopped working. I had to change my code slightly, but it is still buggy.
+ ### Challenges
    - It was an amusing experience to use Bootstrap without reading its documentation properly. Thankfully, I managed to sort nearly all conflicting problems. It also taught me how to not use the latest technology one night before the presentation.
    - Building a basket on the front-end and storing products inside localstorage. 
    - Changing model on the back-end and then using commands `python manage.py makemigrations` and `python manage.py migrate`. It was causing errors. The only way to sort, it was to dump data and reseed it again. Thankfully, it sorted my problems.
+ ### Wins
    - For the time I had, I surprisingly built a lot. 
    - I am proud that I could build the type of website I wanted when I started the project. 
    - Although during the week, I encountered some problems, I managed to sort almost all of them. 
    - This week I also learned a lot about myself. Namely, if I want to achieve something, I can do it. 
    - This week also showed me why I love coding and why I want to work as a software engineer.

## Extra features and key learnings

+ ### Extra features
    - Adding the option where the site administrator can enter product information through the website itself. For now, it can only be done through the Django Administration.
    - Completing the basket component.
    - Finishing building the like system. When a customer likes a product, he can then view the liked product inside his profile page.
    - Finishing building the component for uploading a profile image.
    - Finding a better solution for the rating system.
    - Better error handling.
+ ### Key learnings
    - My biggest takeaway from this project is the power of my determination. As I worked solo on this project, I knew that if I wanted to create my application in the way I wanted to build it, I would need to work hard and be focused 100%. I can say, I surprised even myself, and I am delighted I could prove to myself I can code by myself. 
    - I enjoyed the whole week and was reminded daily why I love coding and why I am a big fan of Python. Not only due to its simple and clear code, but also due to its power. I look forward to building more applications in Python.

