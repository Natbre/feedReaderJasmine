/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    var prevFeedData,
        newFeedData;

    describe('RSS Feeds', function() {
        // Testing that allFeeds are defined and they are not empty
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Testing that URL in the 'allFeeds' are defined and are not empty
        it('urls are defined', function() {
            for (var feed = 0; feed < allFeeds.length; feed++) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).not.toBe(0);
            };
        });
        // Testing that name in the 'allFeeds' are defined and are not empty
        it('names are defined', function() {
            for (var feed = 0; feed < allFeeds.length; feed++) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length).not.toBe(0);
            }
        });

    });
    // Testing that menu from default is hidden
    describe('Menu', function() {
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        });


        // Testing changining of menu visability after click
        it('toggle on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });
    // Testing if allFeed has at leat one '.entry' within '.feed.' container
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('more than 0 entries', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    // Testing if feed container is having atleast 1 entry element inside it
    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                prevFeedData = $('.feed').find(allFeeds.url);
                done();
            });
            loadFeed(1, function() {
                newFeedData = $('.feed').find(allFeeds.url);
                done();
            });
            
        });
        it('different feed', function() {
            expect(prevFeedData).not.toBe(newFeedData);
        });

    });
}());