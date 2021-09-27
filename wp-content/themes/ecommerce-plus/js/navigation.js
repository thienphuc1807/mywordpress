/* global ecommerce_plus_l10n */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
	var masthead, menuToggle, siteNavContain, siteNavigation;
	
	$(document).ready(function() {
							   
		//Preloader
		preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.preloader-wrap');
			preloader.fadeOut(preloaderFadeOutTime);
		}
		hidePreloader();							   
	  
	  $(window).scroll(function () {
		if( $('#theme-header')) {   
			if ($(window).scrollTop() > 280) {
			
			  $('#theme-header').addClass('header-ticky-menu');
			}
			if ($(window).scrollTop() < 281) {
			  $('#theme-header').removeClass('header-ticky-menu');
			}
		}
	  });
	});

	function initMainNavigation( container ) {

		if (typeof ecommerce_plus_l10n !== 'undefined') {		
		
			// Add dropdown toggle that displays child menu items.
			var dropdownToggle = $( '<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false })
				.append( ecommerce_plus_l10n.icon )
				.append( $( '<span />', { 'class': 'screen-reader-text', text: ecommerce_plus_l10n.expand }) );
	
			container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );
	
			// Set the active submenu dropdown toggle button initial state.
			container.find( '.current-menu-ancestor > button' )
				.addClass( 'toggled-on' )
				.attr( 'aria-expanded', 'true' )
				.find( '.screen-reader-text' )
				.text( ecommerce_plus_l10n.collapse );
			// Set the active submenu initial state.
			container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );
	
			container.find( '.dropdown-toggle' ).click( function( e ) {
				var _this = $( this ),
					screenReaderSpan = _this.find( '.screen-reader-text' );
	
				e.preventDefault();
				_this.toggleClass( 'toggled-on' );
				_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
	
				_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
	
				screenReaderSpan.text( screenReaderSpan.text() === ecommerce_plus_l10n.expand ? ecommerce_plus_l10n.collapse : ecommerce_plus_l10n.expand );
			});
		}
	}

	initMainNavigation( $( '.main-navigation' ) );

	masthead       = $( '#masthead' );
	menuToggle     = masthead.find( '.menu-toggle' );
	siteNavContain = masthead.find( '.main-navigation' );
	siteNavigation = masthead.find( '.main-navigation > div > ul' );

	// Enable menuToggle.
	(function() {

		// Return early if menuToggle is missing.
		if ( ! menuToggle.length ) {
			return;
		}

		// Add an initial value for the attribute.
		menuToggle.attr( 'aria-expanded', 'false' );

		menuToggle.on( 'click.wp_theme_prefix', function() {
			siteNavContain.toggleClass( 'toggled-on' );

			$( this ).attr( 'aria-expanded', siteNavContain.hasClass( 'toggled-on' ) );
		});
	})();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	(function() {
		if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
			return;
		}

		// Toggle `focus` class to allow submenu access on tablets.
		function toggleFocusClassTouchScreen() {
			if ( 'none' === $( '.menu-toggle' ).css( 'display' ) ) {

				$( document.body ).on( 'touchstart.wp_theme_prefix', function( e ) {
					if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
						$( '.main-navigation li' ).removeClass( 'focus' );
					}
				});

				siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' )
					.on( 'touchstart.wp_theme_prefix', function( e ) {
						var el = $( this ).parent( 'li' );

						if ( ! el.hasClass( 'focus' ) ) {
							e.preventDefault();
							el.toggleClass( 'focus' );
							el.siblings( '.focus' ).removeClass( 'focus' );
						}
					});

			} else {
				siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' ).unbind( 'touchstart.wp_theme_prefix' );
			}
		}

		if ( 'ontouchstart' in window ) {
			$( window ).on( 'resize.wp_theme_prefix', toggleFocusClassTouchScreen );
			toggleFocusClassTouchScreen();
		}

		siteNavigation.find( 'a' ).on( 'focus.wp_theme_prefix blur.wp_theme_prefix', function() {
			$( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
		});
	})();
})( jQuery );
