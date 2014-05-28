/* SelectNav for The Harker School | Joe Banks */
(function ( $, window, document, undefined ) {

    var pluginName = "selectnav",
        defaults = {
            defaultText: 'Go to...',
            onchange: function(nav) {
                window.location = $(nav).find("option:selected").val();
            }
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var plugin = this,
                $nav = $(plugin.element),
                $selectnav = $("<select />").appendTo($nav),
                $ul = $nav.children('ul');

            // create default option
            $("<option />", {
                "selected": "selected",
                "value"   : "",
                "text"    : plugin.settings.defaultText
            }).appendTo($selectnav);

            // populate dropdown with menu items
            plugin.walkNav( $ul, function( $link, level ) {
                level = level || 0;

                var dashes = '';

                for ( var i = 0; i < level; i++ ) {
                    dashes += '-';
                }

                $("<option />", {
                    "value"   : $link.attr("href"),
                    "text"    : dashes + ' ' + $link.text()
                }).appendTo($selectnav);
            });

            $selectnav.val( location.hash );

            $selectnav.change( function() {
                plugin.settings.onchange(this);
            });
        },
        walkNav: function( $ul, action, level ) {
            level = level || 0;

            var plugin = this;

            // process anchors
            $ul.children('li').children('a').each( function() {
                var $link = $(this),
                    $sub = $link.siblings('ul');

                // run action
                action( $link, level );

                if ( ! $sub.length ) {
                    return;
                }

                // process sub menus
                plugin.walkNav( $sub, action, level+1 );
            });
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );