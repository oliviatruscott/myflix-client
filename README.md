# Meet App

## Feature 1: Filter Events by City

### User story:
    As a user,I should be able to filter events by city so that I can see the list of events that take place in that city.

### Scenario 1
When user hasn’t searched for a city, show upcoming events from all cities.
- Given user hasn’t searched for any city
- When the user opens the app
- Then the user should see a list of all upcoming events

### Scenario 2
User should see a list of suggestions when they search for a city.
- Given the main page is open
- When user starts typing in the city textbox
- Then the user should see a list of cities (suggestions) that match what they’ve typed

### Scenario 3
User can select a city from the suggested list.
- Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing
- When the user selects a city (e.g., “Berlin, Germany”) from the list
- Then their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

## Feature 2: Show/hide an event's details

### User story
    As a user, I should be able to show and hide an event’s details so that I can see the details only of events that I’m interested in

### Scenario 1
An event element is collapsed by default
- Given an event’s info has been loaded
- When a user first sees an event
- Then the event’s details will not be visible

### Scenario 2
User can expand an event to see its details
- Given an event’s info has been loaded
- When a user clicks a collapsed event panel
- Then the details will become visible

### Scenario 3
User can collapse an event to hide its details
- Given an event’s details are visible
- When a user clicks a “hids” or “collapse” button
- Then the event’s details will become hidden

## Feature 3: Specify number of events

### User story
    As a user, I should be able to specify how many events are returned on the page so that I can decide how many events I will look at

### Scenario 1
When user hasn’t specified a number, 32 is the default number
- Given a user hasn’t specified a number of events to load
- When a user open the app or runs a search
- Then a maximum of 32 events will appear

### Scenario 2
User can change the number of events they want to see
- Given a user has specified a number of events to load
- When a user open the app or runs a search
- Then the number of events the user selected will be the maximum number of events shown

## Feature 4: Use the app when offline

### User story
    As a user, I should be able to use the app when offline so that I don’t always need an internet connection to use the app

### Scenario 1
Show cached data when there’s no internet connection
- Given a user has previously opened the app with an internet connection
- When the user opens the app with no internet connection
- Then they will see cached data from their last session

### Scenario 2
Show error when user changes the settings (city, time range)
- Given there is no internet connection
- When a user tries to change a setting that requires loading new data, like “city” or “time range”
- Then they will see an error message indicating that the change isn’t possible without an internet connection

## Feature 5: Data visualization

### User story
    As a user, I should be able to see a visual overview of event data so that I can see at a glance how many and what types of events are happening somewhere

### Scenario 1
Show a chart with the number of upcoming events in each city
- Given there are listed events for a city
- When a user searches for events for that city
- Then they will see a chart showing the number of upcoming events in that city, categorized by type