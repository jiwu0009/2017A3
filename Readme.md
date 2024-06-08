# **A3-Web App Prototype**

## Overview

The "Chocolate Tracker" project was developed to address the challenges of maintaining healthy eating habits, particularly for chocolate lovers and health-conscious consumers. This platform allows users to record and manage their chocolate intake by tracking the type and time of consumption, calorie intake, and ingredients. It aims to provide users with a better understanding of their daily calorie intake to help them make informed dietary choices.

## Target User

The Chocolate Tracker is designed for individuals who:

·Want to be more aware of their chocolate consumption habits.

·Love chocolate but are concerned about its health effects.

·Are willing to take active steps to monitor and regulate their chocolate intake.

## Version control

This project uses github for tracking changes

Please see the github repository here: <https://github.com/jiwu0009/2017A3.git>

## Feature

The webpage is built using HTML5 and the Bootstrap framework to ensure a responsive design and a good user experience. The site is divided into two main sections: the left background information area and the right functional area.

**Left Background Information Area**

The left area displays a background image of chocolates and includes the following content:

- **Website Title**: "Chocolate Tracker🍫", using a custom font with a text shadow to enhance the visual effect.
- **Website Description**: "Welcome to the Chocolate Tracker. You can record and manage your favorite chocolates, including details like type, calories, ingredients, and more.", briefly introducing the site's purpose.
- **Usage Instructions**: "Usage: Enter the chocolate information on the right and click 'Add Chocolate' to save your collection.", guiding users on how to use the website.

**Right Functional Area**

The right area is the main functional area and contains the following modules:

- **Search Function**:
  - Users can enter the chocolate name in the search box and click the "Search" button to search for chocolate records. Clicking the "Return" button refreshes the main page.
- **Chocolate Information Entry Form**:
  - Users can input detailed chocolate information through this form, including name, type, calories, ingredients, comments, and rating. Users can also upload a chocolate image. Clicking the "Add Chocolate" button adds the chocolate information to the records.
- **Chocolate List Display**:
  - The site displays all recorded chocolates grouped by date. Each chocolate entry includes the name, type, calories, ingredients, comments, and rating. Users can also choose to show or hide delete buttons and bulk delete selected chocolate records.
- **Total Calories Statistics**:
  - Displays the total calories of all recorded chocolates.
- **Statistical Data**:
  - Displays the chocolate with the highest calories and the user's favorite type of chocolate.
- **Rating Sorted Display**:
  - Displays chocolate records sorted by rating from highest to lowest, showing the top five highest-rated chocolates.

**Data Storage and Updates**

The website uses LocalStorage to store chocolate data and provides various methods to update and operate on the data, including adding chocolates, searching chocolates, displaying chocolates grouped by date, showing statistical data and charts, and more.

**Image Upload and Preview**

Users can upload chocolate images and preview them in real-time. The uploaded images will be displayed in the corresponding chocolate records, enhancing the user experience.

**Deletion Function**

Users can selectively delete chocolate records or clear all records with one click for easy management.

## Usage Instructions

Open the File:

Locate the index.html file in your project directory.

Open in Browser:

Use your preferred web browser to open the index.html file.

Supported Browsers:

The application has been tested and is confirmed to work on:

Google Chrome/ Safari/ Baidu/ Bing

## Limitations and Project Iterations Explanation

*Limitations:*

LocalStorage: The application uses LocalStorage to store chocolate data, which means the data is stored locally in the user's browser. Different users can only see their own data and comments.

GitHub Changes: The changes committed to GitHub were not well-named and lacked comments, making it difficult to track the project's evolution.

*Project Iterations:*

First and Second Iterations:

Framework Organization: Initial setup of the project structure.

Basic HTML and CSS: Creation of the foundational HTML and CSS for the application's layout and styling.

Third to Eighth Iterations:

JavaScript Functions: Implementation of various JavaScript functions to handle adding, deleting, and displaying chocolate entries.

CSS Updates: Modifications to the CSS to reflect design changes based on user feedback and design iterations.

Ninth Iteration to Final:

Feature Completion: Finalizing the features, ensuring all functionalities work as intended.

Debugging: Identifying and fixing bugs to ensure a smooth user experience.

Design Completion: Polishing the design to meet the final requirements, ensuring the application is visually appealing and user-friendly.



## Future Development Guidelines
Need to maintain clear and consistent naming conventions.
Commit and comment code changes regularly to improve traceability.

### Code Structure
index.html: Contains the main HTML structure.
styles.css: Defines the style of the application.
app.js: Contains JavaScript functions for application functionality.

### Key Components:
addChocolate: Function to add a new chocolate entry.
updateChocolates: Updates the display of chocolate.
calculateTotalCalories: Calculates the total calories of all entries.

### Expansion and Improvement Suggestions
Function Enhancement: Add user authentication to personalize data storage, and users can share chocolate reviews, etc.
UI Improvement: Implement a more dynamic and responsive design. A more user-friendly web design is needed
Analysis: Include more detailed analysis and reporting capabilities. For example, use charts to represent user consumption data, and analyze the composition of chocolate so that the website can automatically classify it.

## Reference

Picture of chocolate from Pixabay.com

## Al usage Acknowledgments

This project with help of ChatGPT with these questions:

Why does my searchChocolates in js doesn’t work?

Why can't the relative path I use show the image I saved in the file?