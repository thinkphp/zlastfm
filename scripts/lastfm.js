use.path("http://zlastfm.appspot.com/scripts")
//use.path("scripts")

use(["cui","dom","yql"], function(){

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
});