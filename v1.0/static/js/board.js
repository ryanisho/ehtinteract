function setupElement295258713540417013() {
	var requireFunc = window.platformElementRequire || window.require;

	// Relies on a global require, specific to platform elements
	requireFunc([
		'w-global',
		'underscore',
		'jquery',
		'backbone',
		'util/platform/elements/PlatformElement',
		'util/platform/elements/PlatformElementSettings'
	], function(
		_W,
		_,
		$,
		Backbone,
		PlatformElement,
		PlatformElementSettings
	) {
		var dependencies = null || [];
		var platform_element_id = "580202859168721269-1.3.6";

		if (typeof _W.loadedPlatformDependencies === 'undefined') {
			_W.loadedPlatformDependencies = [];
		}

		if (typeof _W.platformElements === 'undefined') {
			_W.platformElements = [];
		}

		if (typeof _W.platformElements[platform_element_id] === 'undefined') {
			_W.platformElements[platform_element_id] = {};
			_W.platformElements[platform_element_id].deferredObject = new $.Deferred();
			_W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
		}

		if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
			_.reduce(dependencies, function(promise, nextScript){
				_W.loadedPlatformDependencies.push(nextScript);
				return promise.then(function(){
					return $.getScript(nextScript);
				});
			}, $().promise()).then(function(){
				_W.platformElements[platform_element_id].deferredObject.resolve();
			});
		}

		if (dependencies.length === 0){
			_W.platformElements[platform_element_id].deferredObject.resolve();
		}

		_W.platformElements[platform_element_id].deferredPromise.done(function(){
			var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

			if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
				var _ElementDefinition = PlatformElement.extend({});
			}

			var _Element = _ElementDefinition.extend({
				initialize: function() {
					// we still want to call the initialize function defined by the developer
					// however, we don't want to call it until placeholders have been replaced
					this.placeholderInterval = setInterval(function() {
						// so use setInterval to check for placeholders.
						if (this.$('.platform-element-child-placeholder').length == 0) {
							clearInterval(this.placeholderInterval);
							this.constructor.__super__.initialize.apply(this);
						}
					}.bind(this), 100);
				}
			});

			_Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
			_Element.prototype.settings.page_element_id = "295258713540417013";

			_Element.prototype.element_id = "2e682244-be70-4fa8-a304-b2b5d8647533";
			_Element.prototype.user_id = "64415223";
			_Element.prototype.site_id = "214824618184513274";
			_Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
			new _Element({
				el: '#element-2e682244-be70-4fa8-a304-b2b5d8647533'
			});
		});
	});

}

if (typeof document.documentElement.appReady == 'undefined') {
	document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
	setupElement295258713540417013();
} else if (document.createEvent && document.addEventListener) {
	document.addEventListener('appReady', setupElement295258713540417013, false);
} else {
	document.documentElement.attachEvent('onpropertychange', function(event){
		if (event.propertyName == 'appReady') {
			setupElement295258713540417013();
		}
	});
}

// ---------------------------------------------

function setupElement754248992974918781() {
    var requireFunc = window.platformElementRequire || window.require;

    // Relies on a global require, specific to platform elements
    requireFunc([
        'w-global',
        'underscore',
        'jquery',
        'backbone',
        'util/platform/elements/PlatformElement',
        'util/platform/elements/PlatformElementSettings'
    ], function(
        _W,
        _,
        $,
        Backbone,
        PlatformElement,
        PlatformElementSettings
    ) {
        var dependencies = null || [];
        var platform_element_id = "580202859168721269-1.3.6";

        if (typeof _W.loadedPlatformDependencies === 'undefined') {
            _W.loadedPlatformDependencies = [];
        }

        if (typeof _W.platformElements === 'undefined') {
            _W.platformElements = [];
        }

        if (typeof _W.platformElements[platform_element_id] === 'undefined') {
            _W.platformElements[platform_element_id] = {};
            _W.platformElements[platform_element_id].deferredObject = new $.Deferred();
            _W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
        }

        if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
            _.reduce(dependencies, function(promise, nextScript){
                _W.loadedPlatformDependencies.push(nextScript);
                return promise.then(function(){
                    return $.getScript(nextScript);
                });
            }, $().promise()).then(function(){
                _W.platformElements[platform_element_id].deferredObject.resolve();
            });
        }

        if (dependencies.length === 0){
            _W.platformElements[platform_element_id].deferredObject.resolve();
        }

        _W.platformElements[platform_element_id].deferredPromise.done(function(){
            var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

            if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
                var _ElementDefinition = PlatformElement.extend({});
            }

            var _Element = _ElementDefinition.extend({
                initialize: function() {
                    // we still want to call the initialize function defined by the developer
                    // however, we don't want to call it until placeholders have been replaced
                    this.placeholderInterval = setInterval(function() {
                        // so use setInterval to check for placeholders.
                        if (this.$('.platform-element-child-placeholder').length == 0) {
                            clearInterval(this.placeholderInterval);
                            this.constructor.__super__.initialize.apply(this);
                        }
                    }.bind(this), 100);
                }
            });

            _Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
            _Element.prototype.settings.page_element_id = "754248992974918781";

            _Element.prototype.element_id = "002e18b9-2ced-4fb4-a142-ac22004b7395";
            _Element.prototype.user_id = "64415223";
            _Element.prototype.site_id = "214824618184513274";
            _Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
            new _Element({
                el: '#element-002e18b9-2ced-4fb4-a142-ac22004b7395'
            });
        });
    });

}

if (typeof document.documentElement.appReady == 'undefined') {
    document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
    setupElement754248992974918781();
} else if (document.createEvent && document.addEventListener) {
    document.addEventListener('appReady', setupElement754248992974918781, false);
} else {
    document.documentElement.attachEvent('onpropertychange', function(event){
        if (event.propertyName == 'appReady') {
            setupElement754248992974918781();
        }
    });
}


function setupElement729090220600487302() {
    var requireFunc = window.platformElementRequire || window.require;

    // Relies on a global require, specific to platform elements
    requireFunc([
        'w-global',
        'underscore',
        'jquery',
        'backbone',
        'util/platform/elements/PlatformElement',
        'util/platform/elements/PlatformElementSettings'
    ], function(
        _W,
        _,
        $,
        Backbone,
        PlatformElement,
        PlatformElementSettings
    ) {
        var dependencies = null || [];
        var platform_element_id = "580202859168721269-1.3.6";

        if (typeof _W.loadedPlatformDependencies === 'undefined') {
            _W.loadedPlatformDependencies = [];
        }

        if (typeof _W.platformElements === 'undefined') {
            _W.platformElements = [];
        }

        if (typeof _W.platformElements[platform_element_id] === 'undefined') {
            _W.platformElements[platform_element_id] = {};
            _W.platformElements[platform_element_id].deferredObject = new $.Deferred();
            _W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
        }

        if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
            _.reduce(dependencies, function(promise, nextScript){
                _W.loadedPlatformDependencies.push(nextScript);
                return promise.then(function(){
                    return $.getScript(nextScript);
                });
            }, $().promise()).then(function(){
                _W.platformElements[platform_element_id].deferredObject.resolve();
            });
        }

        if (dependencies.length === 0){
            _W.platformElements[platform_element_id].deferredObject.resolve();
        }

        _W.platformElements[platform_element_id].deferredPromise.done(function(){
            var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

            if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
                var _ElementDefinition = PlatformElement.extend({});
            }

            var _Element = _ElementDefinition.extend({
                initialize: function() {
                    // we still want to call the initialize function defined by the developer
                    // however, we don't want to call it until placeholders have been replaced
                    this.placeholderInterval = setInterval(function() {
                        // so use setInterval to check for placeholders.
                        if (this.$('.platform-element-child-placeholder').length == 0) {
                            clearInterval(this.placeholderInterval);
                            this.constructor.__super__.initialize.apply(this);
                        }
                    }.bind(this), 100);
                }
            });

            _Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
            _Element.prototype.settings.page_element_id = "729090220600487302";

            _Element.prototype.element_id = "7fdb3184-5320-4ff0-b9f9-3d66427f3421";
            _Element.prototype.user_id = "64415223";
            _Element.prototype.site_id = "214824618184513274";
            _Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
            new _Element({
                el: '#element-7fdb3184-5320-4ff0-b9f9-3d66427f3421'
            });
        });
    });

}

if (typeof document.documentElement.appReady == 'undefined') {
    document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
    setupElement729090220600487302();
} else if (document.createEvent && document.addEventListener) {
    document.addEventListener('appReady', setupElement729090220600487302, false);
} else {
    document.documentElement.attachEvent('onpropertychange', function(event){
        if (event.propertyName == 'appReady') {
            setupElement729090220600487302();
        }
    });
}

function setupElement209854639853817965() {
    var requireFunc = window.platformElementRequire || window.require;

    // Relies on a global require, specific to platform elements
    requireFunc([
        'w-global',
        'underscore',
        'jquery',
        'backbone',
        'util/platform/elements/PlatformElement',
        'util/platform/elements/PlatformElementSettings'
    ], function(
        _W,
        _,
        $,
        Backbone,
        PlatformElement,
        PlatformElementSettings
    ) {
        var dependencies = null || [];
        var platform_element_id = "580202859168721269-1.3.6";

        if (typeof _W.loadedPlatformDependencies === 'undefined') {
            _W.loadedPlatformDependencies = [];
        }

        if (typeof _W.platformElements === 'undefined') {
            _W.platformElements = [];
        }

        if (typeof _W.platformElements[platform_element_id] === 'undefined') {
            _W.platformElements[platform_element_id] = {};
            _W.platformElements[platform_element_id].deferredObject = new $.Deferred();
            _W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
        }

        if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
            _.reduce(dependencies, function(promise, nextScript){
                _W.loadedPlatformDependencies.push(nextScript);
                return promise.then(function(){
                    return $.getScript(nextScript);
                });
            }, $().promise()).then(function(){
                _W.platformElements[platform_element_id].deferredObject.resolve();
            });
        }

        if (dependencies.length === 0){
            _W.platformElements[platform_element_id].deferredObject.resolve();
        }

        _W.platformElements[platform_element_id].deferredPromise.done(function(){
            var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

            if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
                var _ElementDefinition = PlatformElement.extend({});
            }

            var _Element = _ElementDefinition.extend({
                initialize: function() {
                    // we still want to call the initialize function defined by the developer
                    // however, we don't want to call it until placeholders have been replaced
                    this.placeholderInterval = setInterval(function() {
                        // so use setInterval to check for placeholders.
                        if (this.$('.platform-element-child-placeholder').length == 0) {
                            clearInterval(this.placeholderInterval);
                            this.constructor.__super__.initialize.apply(this);
                        }
                    }.bind(this), 100);
                }
            });

            _Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
            _Element.prototype.settings.page_element_id = "209854639853817965";

            _Element.prototype.element_id = "1fb88b38-a961-4deb-a1b3-ffa2fe5a10be";
            _Element.prototype.user_id = "64415223";
            _Element.prototype.site_id = "214824618184513274";
            _Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
            new _Element({
                el: '#element-1fb88b38-a961-4deb-a1b3-ffa2fe5a10be'
            });
        });
    });

}

if (typeof document.documentElement.appReady == 'undefined') {
    document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
    setupElement209854639853817965();
} else if (document.createEvent && document.addEventListener) {
    document.addEventListener('appReady', setupElement209854639853817965, false);
} else {
    document.documentElement.attachEvent('onpropertychange', function(event){
        if (event.propertyName == 'appReady') {
            setupElement209854639853817965();
        }
    });
}

function setupElement909744618242598742() {
    var requireFunc = window.platformElementRequire || window.require;

    // Relies on a global require, specific to platform elements
    requireFunc([
        'w-global',
        'underscore',
        'jquery',
        'backbone',
        'util/platform/elements/PlatformElement',
        'util/platform/elements/PlatformElementSettings'
    ], function(
        _W,
        _,
        $,
        Backbone,
        PlatformElement,
        PlatformElementSettings
    ) {
        var dependencies = null || [];
        var platform_element_id = "580202859168721269-1.3.6";

        if (typeof _W.loadedPlatformDependencies === 'undefined') {
            _W.loadedPlatformDependencies = [];
        }

        if (typeof _W.platformElements === 'undefined') {
            _W.platformElements = [];
        }

        if (typeof _W.platformElements[platform_element_id] === 'undefined') {
            _W.platformElements[platform_element_id] = {};
            _W.platformElements[platform_element_id].deferredObject = new $.Deferred();
            _W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
        }

        if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
            _.reduce(dependencies, function(promise, nextScript){
                _W.loadedPlatformDependencies.push(nextScript);
                return promise.then(function(){
                    return $.getScript(nextScript);
                });
            }, $().promise()).then(function(){
                _W.platformElements[platform_element_id].deferredObject.resolve();
            });
        }

        if (dependencies.length === 0){
            _W.platformElements[platform_element_id].deferredObject.resolve();
        }

        _W.platformElements[platform_element_id].deferredPromise.done(function(){
            var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

            if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
                var _ElementDefinition = PlatformElement.extend({});
            }

            var _Element = _ElementDefinition.extend({
                initialize: function() {
                    // we still want to call the initialize function defined by the developer
                    // however, we don't want to call it until placeholders have been replaced
                    this.placeholderInterval = setInterval(function() {
                        // so use setInterval to check for placeholders.
                        if (this.$('.platform-element-child-placeholder').length == 0) {
                            clearInterval(this.placeholderInterval);
                            this.constructor.__super__.initialize.apply(this);
                        }
                    }.bind(this), 100);
                }
            });

            _Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
            _Element.prototype.settings.page_element_id = "909744618242598742";

            _Element.prototype.element_id = "ca5ba3f7-33b8-4093-a595-bb6a5d16fba0";
            _Element.prototype.user_id = "64415223";
            _Element.prototype.site_id = "214824618184513274";
            _Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
            new _Element({
                el: '#element-ca5ba3f7-33b8-4093-a595-bb6a5d16fba0'
            });
        });
    });

}

if (typeof document.documentElement.appReady == 'undefined') {
    document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
    setupElement909744618242598742();
} else if (document.createEvent && document.addEventListener) {
    document.addEventListener('appReady', setupElement909744618242598742, false);
} else {
    document.documentElement.attachEvent('onpropertychange', function(event){
        if (event.propertyName == 'appReady') {
            setupElement909744618242598742();
        }
    });
}

function setupElement521382817369664203() {
    var requireFunc = window.platformElementRequire || window.require;

    // Relies on a global require, specific to platform elements
    requireFunc([
        'w-global',
        'underscore',
        'jquery',
        'backbone',
        'util/platform/elements/PlatformElement',
        'util/platform/elements/PlatformElementSettings'
    ], function(
        _W,
        _,
        $,
        Backbone,
        PlatformElement,
        PlatformElementSettings
    ) {
        var dependencies = null || [];
        var platform_element_id = "580202859168721269-1.3.6";

        if (typeof _W.loadedPlatformDependencies === 'undefined') {
            _W.loadedPlatformDependencies = [];
        }

        if (typeof _W.platformElements === 'undefined') {
            _W.platformElements = [];
        }

        if (typeof _W.platformElements[platform_element_id] === 'undefined') {
            _W.platformElements[platform_element_id] = {};
            _W.platformElements[platform_element_id].deferredObject = new $.Deferred();
            _W.platformElements[platform_element_id].deferredPromise = _W.platformElements[platform_element_id].deferredObject.promise();
        }

        if(_.intersection(_W.loadedPlatformDependencies, dependencies).length !== dependencies.length){
            _.reduce(dependencies, function(promise, nextScript){
                _W.loadedPlatformDependencies.push(nextScript);
                return promise.then(function(){
                    return $.getScript(nextScript);
                });
            }, $().promise()).then(function(){
                _W.platformElements[platform_element_id].deferredObject.resolve();
            });
        }

        if (dependencies.length === 0){
            _W.platformElements[platform_element_id].deferredObject.resolve();
        }

        _W.platformElements[platform_element_id].deferredPromise.done(function(){
            var _ElementDefinition = /**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var TeamCard = PlatformElement.extend({
        initialize: function() {
            this.fixStyles();
            this.updateImage();
            this.$('.wsite-image img').bind("load", this.updateImage.bind(this));
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         *
         * Classes that are used are:
         *      - .editable-text
         *      - .paragraph
         *      - .ui-wrapper
         *      - .wsite-image
         *      - .wsite-*
         *      - (etc...)
         */
        fixStyles: function() {
            var w = this.$el.find('.team-card__image--round').width();
            var h = w;

            this.$el.find('.editable-text').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('.element').each(function(index) {
                $(this).attr('style', '');
            });

            this.$el.find('img').css({
                display: '',
                width: '',
                height: ''
            });
        },

        // updates the image and transforms it depending on what needs to happen to it.
        // if it's the default placeholder, we translate it so it's center in the image area
        // if it's an uploaded image that's too small, we resize it so it'll fit.
        updateImage: function() {
            var $img = this.$('div.wsite-image img');
            var $imgContainer = this.$('.team-card__image--' + this.settings.get('image_display'));
            var isInitialImage = !!this.$('div.wsite-initial-image img').length;

            // if there's no image to be found, stop executing.
            if ($img.length === 0) {
                return;
            }

            // reset the size of the image
            $img.css({
                'transform': 'none',
                'height': 'auto',
                'width': 'auto'
            });

            // grab sizes of the container and the image
            var imageSize = {
                height: $img.height(),
                width: $img.width()
            }
            var containerSize = {
                height: $imgContainer.height(),
                width: $imgContainer.width()
            }

            // if any of these are zero, stop executing.
            // if it's zero because the initial image hasn't loaded yet,
            // then bind a recall to when it finishes.
            if (!imageSize.height || !imageSize.width || !containerSize.height || !containerSize.width) {
                return;
            }

            // determine whether he have an initial image or not
            if (isInitialImage) {
                // if we do, we need to move it to fit.
                var dx = (containerSize.width - imageSize.width) / 2;
                var dy = (containerSize.height - imageSize.height) / 2;
                $img.css({
                    'transform': 'translate(' + dx + 'px,' + dy + 'px)'
                });                
            } else {
                // otherwise, if the image is smaller than the container, scale it up to fit.
                var scale = 1;
                // depending on if which way we scale more, our origin will change 
                var origin = 'left top'
                if (imageSize.height < containerSize.height) {
                    scale = containerSize.height / imageSize.height;
                    origin = 'center top';
                }
                if (imageSize.width < containerSize.width) {
                    var oldScale = scale;
                    scale = Math.max(scale, containerSize.width / imageSize.width);
                    if (scale > oldScale) {
                        origin = 'left top';
                    }
                }
                $img.css({
                    'transform-origin': origin,
                    'transform': 'scale(' + scale + ', ' + scale + ')'
                });
                $img.css({
                    'height': $img.height() + 'px',
                    'width': $img.width() + 'px'
                });
            }
        }
    });

    return TeamCard;
})();;

            if (typeof _ElementDefinition == 'undefined' || typeof _ElementDefinition == 'null') {
                var _ElementDefinition = PlatformElement.extend({});
            }

            var _Element = _ElementDefinition.extend({
                initialize: function() {
                    // we still want to call the initialize function defined by the developer
                    // however, we don't want to call it until placeholders have been replaced
                    this.placeholderInterval = setInterval(function() {
                        // so use setInterval to check for placeholders.
                        if (this.$('.platform-element-child-placeholder').length == 0) {
                            clearInterval(this.placeholderInterval);
                            this.constructor.__super__.initialize.apply(this);
                        }
                    }.bind(this), 100);
                }
            });

            _Element.prototype.settings = new PlatformElementSettings({"style":"large","image_display":"round","title":true,"about":true,"button":false});
            _Element.prototype.settings.page_element_id = "521382817369664203";

            _Element.prototype.element_id = "7864d63b-5f3c-4b39-b58f-07e9e8307cfc";
            _Element.prototype.user_id = "64415223";
            _Element.prototype.site_id = "214824618184513274";
            _Element.prototype.assets_path = "//marketplace.editmysite.com/uploads/b/marketplace-elements-580202859168721269-1.3.6/assets/";
            new _Element({
                el: '#element-7864d63b-5f3c-4b39-b58f-07e9e8307cfc'
            });
        });
    });

}

if (typeof document.documentElement.appReady == 'undefined') {
    document.documentElement.appReady = 0;
}

if (document.documentElement.appReady || (window.inEditor && window.inEditor())) {
    setupElement521382817369664203();
} else if (document.createEvent && document.addEventListener) {
    document.addEventListener('appReady', setupElement521382817369664203, false);
} else {
    document.documentElement.attachEvent('onpropertychange', function(event){
        if (event.propertyName == 'appReady') {
            setupElement521382817369664203();
        }
    });
}



