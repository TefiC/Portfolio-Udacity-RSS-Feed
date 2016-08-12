#RSS FeedReader

In this project for Udacity's Front End Web Developer Nanodegree I've incorporated BDD (Behavior Driven Development) and TDD (Test Driven Development) to an existing project.

Developed several test suites to check the website's functionality using [Jasmine](http://jasmine.github.io/). This approach helps prevent bugs and crashes that could be introduced when working on a team or when the code is refactored when adding new features.

##Test Suites

 - RSS Feeds
 - The Menu
 - Initial Entries
 - New Feed Selection

####RSS Feeds
---
1) **'are defined'**  - This test is was provided in the source code and checks if the array that contains the feeds is defined and not empty.

2) **'their URL is a string and it's not empty'** - Tests if each feed has a URL, that the URL is a ``string`` (**CUSTOM**) and that this URL is not empty (length  0).

3) **'their URL doesn't contain any spaces '** - **CUSTOM** checks if the URL string doesn't contain any spaces, which could introduce bugs.

4) **"have a name and their names aren't empty"** - checks if each feed has a name, and that those names aren't empty strings by checking its length.

5) **"have a name that is not a string filled with spaces"** - **CUSTOM** e.g name: '                      ' This could introduce bugs in the user interface. This test trims the name using ``trim()`` and it expects the length of the trimmed name to be greater than 0. If its 0, it means that the name only contained spaces.

####The Menu
---
1) **'is hidden by default'** - This test checks if the body has a class ``.menu-hidden`` and if its left offset is less than 0, meaning it is hidden to the left.

2) **'toggles when the menu-icon is clicked'** - This test checks if the menu toggles visibility by checking the class ``.menu-hidden`` toggles when the ``.menu-icon-link`` is clicked.


####Initial Entries
---
_Note: since this suite relies on elements that load on asynchronous requests, a ``beforeEach`` block runs before each test and loads the first feed in array asynchronously._

1) **'have at least one entry within feeds container'** - This test checks if there is at least one ``.entry`` within the ``.feed`` container

2) **"UI colors are correct"** - **CUSTOM** This test checks if the UI colors displayed to the user are the ones set in the CSS stylesheet to ensure the UI looks as it should.

####New Feed Selection
---
Note: I declare variables at the start of this suite, then, load asynchronously the first feed of the ``allFeeds`` array. I define a callback function and set it as a parameter, so that when the first feed has finished loading, initTitle and InitText are assigned values that correspond to the state of the website when the first feed in the array is loaded. Then, I proceed to load the feed with index ``id`` and send done() as a callback to start executing tests when the asynchronous request is finished.

1) **'when a new feed is loaded, the content actually changes'** - This test checks if when a user clicks on a new feed on the ``.slide-menu``, new content is loaded on ``.feed``. To achieve this, it compares the text from the first entry when the first feed in the array is loaded to the text from the first entry when the feed on index ``id`` is loaded. It expects them not to be the same, therefore confirming the content has changed.

2) **'updates the header title'** - **CUSTOM** This test checks if the text shown on ``.header-title`` changes after the feed on index ``id`` has been loaded.

3) **"the tag on the title matches the currently selected feed's name"** - **CUSTOM**  This test checks if the title shown on the ``.header-title`` matches the currently selected feed's name.

4) **"the sidebar closes when the user clicks on a new feed"** - **CUSTOM** this test checks if the sidebar ``.menu-slide`` closes when a user selects a new feed from the list. First, it toggles the menu by clicking on ``.menu-icon-link`` and checks its open by making sure it doesn't have a class ``.menu-hidden``. Then, it clicks on the second feed on the feeds list, and then checks if the ``.menu-slide`` now has a class ``.menu-hidden``.

#####COPYRIGHT
---
- Udacity Forums were very helpful
- Customized ``.entry`` CSS background-color
- Added a link to Jasmine-jquery for future tests that may be implemented