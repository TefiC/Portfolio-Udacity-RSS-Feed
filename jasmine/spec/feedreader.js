/* feedreader.js
 *
 * This is the spec file that Jasmine reads and contains
 * all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {

		var allFeedsLength = allFeeds.length;
		var i;

		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeedsLength).not.toBe(0);
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined,
		 * is a string (CUSTOM) and that its not empty.
		 */
		 it("their URL is a string and it's not empty", function() {

			//To check each URL
			for(i=0; i<allFeedsLength; i++){
				///To exist
				expect(allFeeds[i].url).toBeDefined();
				//To be a string
				expect(typeof allFeeds[i].url).toBe('string');
				//Not to be empty
				expect(allFeeds[i].url.length).toBeGreaterThan(0);
			}
		 });

		/* CUSTOM TEST:
		 * This test checks if the URL for each feed doesn't contain any spaces
		 */
		it("their URL doesn't contain any spaces", function(){
			var a;
			var url;

			//To check each URL
			for(i=0; i<allFeedsLength; i++) {

				//Select the current feed's URL
				url = allFeeds[i].url;

				expect(url).toBeDefined();

				//To check each character in the URL
				for(a=0; a<url.length; a++) {
					expect(url[a]).not.toBe(' ');
				}
			}
		});

		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it("have a name and their names aren't empty", function() {

			for(i=0; i<allFeedsLength; i++) {
				var name = allFeeds[i].name;

				expect(name).toBeDefined();
				expect(name.length).not.toBe(0);
			}
		});

		/*
		 * CUSTOM TEST: This test loops through each feed and checks if the name is not
		 * an empty string comprised of spaces. If that was the case,
		 * the previous test would pass because the length of the string would be
		 * greater than 0, but this test would fail.
		 */
		it("have a name that is not a string filled with spaces", function(){
		  	//e.g: name: '      ' could be a bug.
			var a;
			var counter = 0;

			for(i=0; i<allFeedsLength; i++) {
				var name = allFeeds[i].name;

				expect(name).toBeDefined();
				var trimmedNameLength = name.trim().length;

				//If its 0, it means the characters are all ' ' and were trimmed
				expect(trimmedNameLength).toBeGreaterThan(0);
			}
		});
	});


	/* A new test suite named "The menu" */
	describe('The Menu', function(){

		var $body = $(document.body);

		/* A test that ensures the menu element is
		 * hidden by default, by checking if it has a class
		 * .menu-hidden.
		 */
		it('is hidden by default', function(){
			expect($body).toHaveClass('menu-hidden');
			expect($('.slide-menu').offset().left).toBeLessThan(0);
		});


		/* A test that ensures the menu changes
		 * visibility when the menu icon is clicked. By checking
		 * if the class .menu-hidden toggles after a click event
		 */
		it('toggles when the menu-icon is clicked', function(){

			//Initially closed
			expect($body.hasClass('menu-hidden')).toBe(true);

			//Open
			$('.menu-icon-link').click();
			expect($body.hasClass('menu-hidden')).toBe(false);

			//Close
			$('.menu-icon-link').click();
			expect($body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* A test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		beforeEach(function(done){
			//Load feed asynchronously
			loadFeed(0, done);
		});

		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
		it('have at least one entry within feeds container', function(){
			expect($('.feed .entry').length).toBeGreaterThan(0);
		});

		/* CUSTOM TEST:
		 * This test checks if the colors for the User Interface are set correctly
		 */
		it("UI colors are correct", function(){
			var entryText = $('.entry h2');
			var entry = $('.entry');

			//Font color
			expect(entryText.css('color')).toBe('rgb(17, 17, 17)');

			//Background color
			expect(entry.css('background-color')).toBe('rgb(220, 208, 208)');
		});
	});


	/* A new test suite named "New Feed Selection"*/
	describe('New Feed Selection', function(){

		//Declaring variables
		var initText, initTitle, currentTitle, finalText;
		var id = 2; //The index of the feed that will be loaded before each test

		beforeEach(function(done){

			//Load the first feed in the array
			loadFeed(0, function(){

				//Get these elements initial HTML and title
				initText = $('.entry-link .entry')[0].innerHTML;
				initTitle = $('h1.header-title').text();

				//Load the feed with an id previously declared and take "done()" as a callback method
				//for when the feed has finished loading asynchronously
				loadFeed(id, done);
			});
		});

		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		it('when a new feed is loaded, the content actually changes', function(){

			//Get the new title after the new feed has loaded
			finalText = $('.entry-link .entry')[0].innerHTML;

			//Expect the initial title not to match the title after another feed has been loaded
			expect(initText).not.toMatch(finalText);
		});

		/*
		 * CUSTOM TEST: This test checks if loading a new feed updates the header's title
		 * by checking that the initial title, before selecting a new feed is different
		 * from the header title shown after selecting a new feed.
		 */
		it('updates the header title', function(){

			//Get the title after a new feed has been loaded (with id 2)
			currentTitle= $('h1.header-title').text();

			//Expect the initial and final titles not to match
			expect(initTitle).not.toMatch(currentTitle);
		});

		/*
		 * CUSTOM TEST: This test checks if the tag on the header's title matches
		 * the currently selected feed's name.
		 */
		it("the tag on the title matches the currently selected feed's name", function(){

			//Because "before each" loads the feed with the id set initially
			var feedName = allFeeds[id].name;

			//Get the current title shown on the DOM
			currentTitle= $('h1.header-title').text();

			//Expect them to be the same
			expect(feedName).toMatch(currentTitle);
		});

		/*
		 * CUSTOM TEST: This test checks if the sidebar closes when the user selects a new feed
		 * from the sidebar.
		 */
		it("the sidebar closes when the user clicks on a new feed", function(){

			//Select the second feed on the sidebar (different from the initial and final feeds selected in this suite)
			var $secondFeed = $('.feed-list li:eq(1) a');
			var $toggleMenu = $('.menu-icon-link');

			//Open sidebar
			$toggleMenu.trigger('click');
			expect($(document.body).hasClass('menu-hidden')).toBe(false);

			//Click on the feed
			$secondFeed.trigger('click');
			expect($(document.body).hasClass('menu-hidden')).toBe(true);
		});
	});

}());

