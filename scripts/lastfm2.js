/*
Copyright (c) 2013 Adrian Statescu. All rights reserved.
version: 1.0.2
MIT License
*/

/**
 *  The cui object is the single global object used by cui library.
 */

if(typeof cui == "undefined" || !cui) {
   /**
    *  The cui global namespace object. If cui is already defined, the, the existing cui object will not
    *  be overwritten so that defined namespaces are preserved.
    *  @class cui
    *  @static 
    */
    var cui = {};
}

/* current version */
cui.version = '@VERSION@';

/* attribute to store data */
cui.DATA_CUI = 'data-cui';     
   

/**
 *  Provides the language utilities used by the cui micro-library.
 */  

cui.lang = cui.lang || {};

(function() {

    var L = cui.lang,

        O_P = Object.prototype, 
 
        html_chars = {'&':'&amp','<':'&lt','>':'&gt','"':'&quot',"'":'&#x27','/':'&#x2F','`':'&#x60'},

        ARRAY_TOSTRING = '[object Array]',
        FUNCTION_TOSTRING = '[object Function]',
        OBJECT_TOSTRING = '[object Object]',
        NOTHING        = [],
        

        OB = {

             /**
              * Determines whether or not the provided object is an array.
              *
              * @method isArray
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isArray: function( ob ) {

                      return O_P.toString.apply( ob ) == ARRAY_TOSTRING;
             },


             /**
              * Determines whether or not the provided object is a boolean.
              *
              * @method isArray
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isBoolean: function( ob ) {

                      return typeof ob === 'boolean';
             },


             /**
              * Determines whether or not the provided object is a function.
              *
              * @method isFunction
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isFunction: function( ob ) {

                      return (typeof ob === 'function') || O_P.toString.apply( ob ) === FUNCTION_TOSTRING
             },


             /**
              * Determines whether or not the provided object is null.
              *
              * @method isNull
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isNull: function( ob ) {

                      return ob === null;
             },

             /**
              * Determines whether or not the provided object is a legal number.
              *
              * @method isNumber
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              * @since 1.0.0
              */
             isNumber: function( ob ) {

                      return typeof ob === 'number' && isFinite( ob )
             },


             /**
              * Determines whether or not the provided object of type object of function/
              *
              * @method isObject.
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isObject: function( ob ) {

                     return ( ob && (typeof ob === 'object') || L.isFunction( ob ) ) || false
             },


             /**
              * Determines whether or not the provided  object is a string.
              *
              * @method isString
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              * @since 1.0.0
              */
             isString: function( ob ) {

                       return typeof ob === 'string'
             },

             /**
              * Determines whether or not the provided object is undefined.
              *
              * @method isUndefined
              * @param  (any) ob - the object being tested. 
              * @return (Boolean: true/false)  - the result that tell me whether is or not undefined
              * @static  
              */
             isUndefined: function( ob ) {

                          return typeof ob === 'undefined'      
             },


             /**
              * A convenience method for detecting a legitimate non-null value. 
              * Returns false for null, NaN, undefined, and true for other values.
              *
              * @method isValue
              * @param  (any) ob  - the object being tested. 
              * @return (Boolean) - true if it is not null/undefined/NaN OR False
              * @static  
              */
             isValue: function( ob ) {

                      return L.isObject( ob ) || L.isString( ob ) || L.isNumber( ob ) || L.isBoolean( ob )
             },


             /**
              * Returns a copy of the specified string with special HTML characters escaped.
              *
              * @method escapeHTML
              * @param (String) html - String to escape.
              * @return (String)     - Escaped string
              * @static  
              * @since 1.0.0
              */
             escapeHTML: function( html ) {
 
                  return html.replace(/[&<>"'\/`]/g, function( match ){

                         return html_chars[ match ] 
                  });  
             },



             /**
              * Returns a string without any leading or trailing whitespace.
              * If the input is not a string, the input will be returned untouched.
              *
              * @method trim
              * @param (String) s    - the string to trim.
              * @return (String)     - the trimmed string.
              * @static  
              * @since 1.0.0
              */
             trim: function( s ) {

                 try{  

                   return String.prototype.trim ? s.trim() : s.replace(/(^\s*|\s*$)/g,'')    

                 }catch(e) {

                   return s; 
                 }
             },

             /**
              * Returns a string camelized.
              * If the input is not a string, the input will be returned untouched.
              *
              * @method camelize
              * @param (String) s    - the string to camelize.
              * @return (String)     - the camelized string.
              * @static  
              * @since 1.0.0
              */
             camelize: function( s ) {

                try{
 
                   return s.replace(/-(.)/g, function(m, m1){

                         return m1.toUpperCase();
                   })

                }catch(e) {

                   return s;
                }
             },

             /**
              * Inheritance by copying properties.
              *
              * @method augmentObject
              * @param (Object) child  - the child object, c`est-a-dire is the object to receive the augmentation.
              * @param (Object) parent - the parent object, c`est-a-dre is the object that supplies the properties to augment.
              * @return (Object) - inheritance by copying properties.
              * @static  
              */
             augmentObject: function(child, parent) {

                    if(!child || !parent) {

                        throw new Error("Failed, verify argumetns");
                    } 

                    var p, override = arguments[2]

                    for(p in parent) {

                        if(override || !(p in parent)) {

                            child[ p ] = parent[ p ]
                        }
                    }       
            
                return child;
             },

             /**
              * Inheritance by copying properties.
              *
              * @method mixins
              * @return (Object) - inheritance by copying properties.
              * @static  
              */
             mixins: function() {
 
                     var arg, prop, child = {};

                     for(arg = 0; arg < arguments.length; arg++) {

                         for(prop in arguments[ arg ]) {

                             child[ prop ] = arguments[ arg ][ prop ]
                         }
                     } 

                return child;
             } 
        };

        OB.augmentObject(L, OB, true)

        cui.lang = L; 
 
        cui.extend = OB.augmentObject;

        cui.mixins = OB.mixins;
})();


/**
 * @class dom
 * @static
 * @namespace cui
 */

if(!cui.dom)

cui.dom = {

    selectAll: function( selector ) {
 
            return Array.prototype.slice.call( (node||document).querySelectorAll( selector ) )
    },

    select: function( selector, node ) {
 
            return (node||document).querySelector( selector )
    },

    each: function(arr, fn) {

          var len = arr.length,

              index;

              for(index = 0; index < len; index++) {

                  fn.call(this, arr[ index ], index, arr)
              }

         return arr
    },

    some: function(arr, fn, scope) {
          
          for(var i = 0, j = arr.length; i < j; i++) {

              if( fn.call(scope, arr[i], i, arr) ) {

                  return true 
              }
          }  

        return false  
    },

    getStyle: document.defaultView && document.defaultView.getComputedStyle ? function(elem, property) {

               var value = null;

               if(property == 'float') { property = 'cssFloat';}      

               var computed = document.defaultView.getComputedStyle(elem, '') 

               value = computed[cui.lang.camelize(property)] 

             return elem.style[property] || value
        
        } : (ie && html.currentStyle) ? function(elem, property){

              property = this.camelize(property);

              property = property == 'float' ? 'styleFloat' : property;

              if(property == 'opacity') {

                 var val = 100;

                 try {

                   val = elem.filters['DXImageTransform.Microsoft.Alpha'].opacity;

                 } catch( e1 ) {

                   try{

                      val = elem.filters('alpha').opacity

                   }catch( e2 ) {

                   }
                 }
              }

              var value = elem.currentStyle ? elem.currentStyle[property] : null;

            return elem.style[property] || value
              
        } : function(elem, property){ 

            return elem.style[this.camelize[property]]
    },

    css: function(elem, v ) {
         
         elem.style.cssText = v 
    },

    attr: function(elem, a, v) {

          elem.setAttribute(a, v)
    },

    removeAttr: function( prop ) {

          elem.removeAttribute( prop )
    },

    html: function( elem, text ) {

          var specialTags = /select|fieldset|table|tbody|tfoot|td|tr|colgroup/i,

              method = text ? 

                       document.documentElement === null ? 

                                   'innerText':'innerHTML'

                                    :

                                   'innerHTML';
                         
                          elem[ method ] = text
    },

    is: function( node ) {
          
        return node && node.nodeName && node.nodeType == 1
    },


    /**
     *  Adds the specified class(es) to each of the set of matched elements.
     *  It's important to note that this method does not replace a class. It simply adds the class, appending it to any which
     *  may already be assigned to the elements.
     * 
     *  @param elem Object - the element for which add class
     *  @param c String - add specified class to the element
     *  @return (cuba) object
     */
    addClass: function(elem, c) {

          if('classList' in document.createElement('p')) {
            
                   elem.classList.add( c )  

          } else {

                   elem.className = cui.lang.trim(elem.className + ' ' + c)
          }

       return this
    },

    hasClass: function( el, c ) {

          if('classList' in document.createElement('p')) {

              return el.classList.contains( c )  

          } else {

              return this.classReg( c ).test(el.className)
          }

    },

    removeClass: function(elem, c ) {

         if('classList' in document.createElement('p')) {


                   elem.classList.remove( c )                                      

         } else {

                   elem.className = cui.lang.trim(elem.className + ' ' + c)
         }
    },

    classReg: function( c ) {

        return new RegExp('(^|\\s+)' + c +'(\\s+$)')
    }, 

    toggleClass: function(elem, c ) {


       this.hasClass(elem, c) ? this.removeClass(elem, c) : this.addClass(elem, c)
    }
};

HTMLElement.prototype.html = function( content ) {

            cui.dom.html(this, content);
};

HTMLElement.prototype.css = function( content ) {

            cui.dom.css(this, content)
};

Function.prototype.binding = function() {

         var args = Array.prototype.slice.call(arguments),

             object = args.shift(),

             fn = this;

         return function() {

                return fn.apply(object,args.concat(Array.prototype.slice.call(arguments)))
         } 
};

     /**
          A method YQL client for this micro-framework;
          Yahoo! Query Language is an expressive SQL-like language that lets you query, filter, and join data across web services.
          With YQL, apps runs faster with fewer lines of codes and smaller network footprint.
          Yahoo! and other sites across the internet make much of their structured data available to developers, primarily through
          Web Services. To access and query these services, developers traditionally endure the pain and location the right URLs and 
          documentation to access and query each Web service.

          i.e: select * from twitter.usertimeline where id='YQL'

          console: http://developer.yahoo.com/yql/console/  

          @param query String - a YQL query;
          @param callback Function - a callback function that receives the result of the query;
          @param format String - the format of the result, by default 'json';
          @param diagnostics Boolean - true or false, by default to false;
          @return - return this, c`est-a-dire this object;
               
      */

if(!cui.yql) 

cui.yql = function(){

    var _query = null,
        _format = 'json',
        _diagnostics = false;
       
    function fetch( callback ) {

         var scriptEl = document.createElement("script"),

         endpoint = 'http://query.yahooapis.com/v1/public/yql?q=',

         env = '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',

         encodedURL = encodeURIComponent( _query );

         id = 'YQL' + (+new Date()),

         src = endpoint + encodedURL + '&format='+ _format + '&callback=cui.' + id + '&diagnostics=' + _diagnostics + env;

         cui[ id ] = function( data ) {

              //for debug
              if(window.console) console.log( data )
 
              //invoke the callback function to execute
              callback( data ) 

              //delete from memory
              //delete cui[ id ]

              //delete script node
              document.body.removeChild( scriptEl )
         }

         //set type attribute
         scriptEl.setAttribute('type', 'text/javascript')

         //set src attribute
         scriptEl.setAttribute('src', src);

         //append to body DOM
         document.body.appendChild( scriptEl ) 
     };

     return function(query, callback, format, diagnostics) {

          _query = query;

          _format = format || 'json';

          _diagnostics = diagnostics || false;

          fetch( callback )
     };
}();



      var lastfm = function() {

          var user = 'thinkphp',
              url = null,
              urlcss = 'http://zlastfm.appspot.com/css/lastfm.css';
         
          function init() {

              var href = cui.dom.select("#lastFM a").toString().split("/");

              var username = href[href.length-1] || user;

              url = 'use "http://thinkphp.ro/apps/lastfm/YQL-open-data-table/recentlastfm.xml" as lastfm;select * from lastfm where username="'+ username +'" and api_key="2993c6e15c91a2890c2f11fa95673067"';

              loadStyle()
  
             return this;
          }

          function loadStyle() {

                //get a reference to the head element
                var head = document.head || document.getElementsByTagName("head")[0],
                    //create a link element
                    linkEl = document.createElement('link');
                    //set attribute 'type'
                    linkEl.setAttribute('type','text/css')
                    //set attribute 'rel'
                    linkEl.setAttribute('rel','stylesheet')
                    //set attribute 'href'
                    linkEl.setAttribute('href', urlcss)
                    //if ok then append it
                    if( url ){
                        head.appendChild( linkEl )
                    }
          }

          function and() {

             return this;
          }

          function render() {

                cui.yql(url, function( data ){
      
                    cui.dom.select("#result").html(data.query.results.result) 
                })       
          }
         

          return{init: init, and: and, render: render}
      }();
      lastfm.init().and().render();        
