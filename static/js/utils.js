/**
 * Utilities used throughout StoryBase JavaScript apps
 */

Namespace('storybase.utils', {
  capfirst: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * Geocode using the local geocoder.
   */
  geocode: function(address, options) {
    // TODO: Don't hardcode this URL
    $.ajax('/api/0.1/geocode/', {
      dataType: 'json',
      data: {
        q: address,
      },
      success: function(data, textStatus, jqXHR) {
        if (data.meta.total_count > 0) {
          // Found a point for the address
          options.success({
            'lat': data.objects[0].lat,
            'lng': data.objects[0].lng
          }, data.objects[0].place);
        }
        else {
          options.failure(address);
        }
      }
    });
  },

  /**
   * Return the root of a URL path.
   *
   * This is used to separate the portion of the array that represents
   * the base of a URL path from the portions that represent parameters.
   *
   * This is needed because a variable number of path elements might proceed
   * the part of the URL that represents the base, for example,
   * internatialization path prefixes.
   * 
   * This function is useful for providing a value for the 'root' argument
   * to a call to Backbone.history.start().
   *
   * @param {String[]} bases An array of strings that will be used to
   *                         separate the root from the rest of the path.
   * @param {String} [path=window.location.pathname] Path to split, defaults
   *   to the current window's path.
   *
   * @example
   * getRoot(['build'], '/en/build/f81eca996d754a549ae48cf8ef9622dc/');
   * // Returns '/en/build/'
   */
  getRoot: function(bases, path) {
    var pathParts;
    var len = bases.length;
    var i;
    var pos;
    if (_.isUndefined(path)) {
      path = window.location.pathname;
    }
    pathParts = path.split('/');
    for (i = len - 1, pos = -1; pos === -1 && i >= 0; i--) {
      pos = _.lastIndexOf(pathParts, bases[i]);
    }

    if (pos === -1) {
      // None of the base search strings were found.  This
      // shouldn't happen
      throw new Error("Base not found in location parts");
    }

    return _.first(pathParts, pos + 1).join('/') + '/'; 
  }
});

/**
 * Translate a string in a template using Django's gettext Javascript API.
 * @param {object} options Hash of options. Should contain one key,
 *     'message' which is the string to be translated.
 * @return {string} Translated string
 */
Handlebars.registerHelper('gettext', function(options) {
  return gettext(options.hash.message);
});

/**
 * Translate a block of template text after first rendering the
 * contents of the template.
 * @return {string} Translated block of text
 */
Handlebars.registerHelper('blockgettext', function(options) {
  return gettext(options.fn(this));
});

/**
 * Return a singular or plural suffix
 * Works in a manner similar to Django's pluralize filter
 * @param {number} count The number used to determine if the singular or
 *    plural suffix should be returned.
 * @param {object} options Hash of options. Optionally contains one key,
 *     'suffix' which is either the plural suffix (e.g. 's') or a
 *     comma-separated list of the singular and plural suffixes
 *     (e.g. 'y,ies')
 * @return {string} Suffix
 */
Handlebars.registerHelper('pluralize', function(count, options) {
  var suffix;
  var defaults = {
    suffix: "s"
  };
  _.defaults(options.hash, defaults);
  var suffixes = options.hash.suffix.split(",");
  if (suffixes.length == 1) {
    // Only one suffix provided.  This likely means plurals are just
    // formed by appending an 's' to the end of the string and keeping
    // the singular as-is.
    // Fill the singular slot of our options with an empty string
    suffixes.unshift("");
  }
  if (count == 1) {
    suffix = suffixes[0];
  }
  else {
    suffix = suffixes[1];
  }

  return suffix;
});

Handlebars.registerHelper('firstparagraph', function(s, maxWords) {
   var result = null;
   var $el = $("<div></div>");
   // Toss the text in a dummy div
   $el.html(s);
   if ($el.find('p').length > 0) {
     // Found a paragraph tag.  Return its contents
     result = $el.find('p').html(); 
   }
   if (result === null) {
     // We didn't find a paragraph tag, try splitting on newlines
     result = s.split(/\r\n|\r|\n/)[0];
   }
   var words = result.split(/\s/);
   if (typeof maxWords === "number" && words.length > maxWords) {
     result = "";
     for (var i = 0; i <= maxWords; i++) {
         result += words[i] + " "; 
     }
     result += "&hellip;"
   }
   return new Handlebars.SafeString("<p>" + result + "</p>"); 
});
