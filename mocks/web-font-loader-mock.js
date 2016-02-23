(function (window){
  "use strict";

  if (typeof window.WebFont === "undefined") {
    window.WebFont = {};
  }

  window.WebFont = {
    load: function(params) {
      if (params && params.fontinactive) {
        if (params.google && params.google.families && params.google.families.length > 0) {
          params.fontinactive(params.google.families[0]);
        }
      }

      if (params && params.active) {
        params.active();
      }
    }
  };
})(window);

angular.module("risevision.widget.common")
  .factory("googleFontLoader", ["$q", function ($q) {
    var factory = {
      getPopularFonts: function() {
        var deferred = $q.defer();
          resp = {};

        resp.data = {};
        resp.data.items = [{family:"Open Sans"}, {family:"Roboto"}, {family:"Slabo 27px" }, {family:"Lato"},
          {family: "Oswald"}, {family: "Roboto Condensed"}, {family: "Montserrat"}, {family: "Source Sans Pro"},
          {family: "Raleway"}, {family: "Lora"}, {family: "PT Sans"}, {family: "Droid Sans"}, {family: "Ubuntu"},
          {family: "Roboto Slab"}, {family: "Droid Serif"}, {family: "Merriweather"}, {family: "Arimo"},
          {family: "Fjalla One"}, {family: "PT Sans Narrow"}, {family: "Noto Sans"}, {family: "PT Serif"},
          {family: "Titillium Web"}, {family: "Alegreya Sans"}, {family: "Poiret One"}, {family: "Passion One"},
          {family: "Indie Flower"}, {family: "Bitter"}, {family: "Candal"}, {family: "Dosis"},
          {family: "Playfair Display"}, {family: "Yanone Kaffeesatz"}, {family: "Oxygen"}, {family: "Cabin"},
          {family: "Lobster"},{family: "Arvo"}, {family: "Hind"}, {family: "Noto Serif"}, {family: "Anton"},
          {family: "Nunito"}, {family: "Inconsolata"}, {family: "Ubuntu Condensed"}, {family: "Play"},
          {family: "Bree Serif"}, {family: "Abel"}, {family: "Muli"}, {family: "Josefin Sans"},
          {family: "Shadows Into Light"}, {family: "Crimson Text"}, {family: "Libre Baskerville"},
          {family: "Exo 2"}, {family: "Cuprum"}, {family: "Fira Sans"}, {family: "Pacifico"}, {family: "Asap"},
          {family: "Vollkorn"}, {family: "Signika"}, {family: "Archivo Narrow"}, {family: "Alegreya"},
          {family: "Francois One"}, {family: "Merriweather Sans"}, {family: "Varela Round"},
          {family: "Maven Pro"}, {family: "Quicksand"}, {family: "Bangers"}, {family: "Karla"},
          {family: "Dancing Script"}, {family: "Righteous"}, {family: "Sigmar One"}, {family: "Rokkitt"},
          {family: "PT Sans Caption"}, {family: "Exo"}, {family: "Amatic SC"}, {family: "Questrial"},
          {family: "Chewy"}, {family: "Architects Daughter"}, {family: "Patua One"}, {family: "Orbitron"},
          {family: "Abril Fatface"}, {family: "Monda"}, {family: "Pathway Gothic One"}, {family: "Denk One"},
          {family: "Josefin Slab"}, {family: "Source Code Pro"}, {family: "Istok Web"}, {family: "News Cycle"},
          {family: "Fredoka One"}, {family: "Lobster Two"}, {family: "EB Garamond"}, {family: "Crete Round"},
          {family: "Russo One"}, {family: "Gloria Hallelujah"}, {family: "Pontano Sans"},
          {family: "Quattrocento Sans"}, {family: "Covered By Your Grace"}, {family: "Source Serif Pro"},
          {family: "Ropa Sans"}, {family: "Comfortaa"}, {family: "Kaushan Script"}, {family: "Noticia Text"},
          {family: "Black Ops One"}, {family: "Satisfy"}, {family: "Domine"}, {family: "Gudea"}, {family: "Cinzel"}];

        deferred.resolve(resp);

        return deferred.promise;
      }
    };

    return factory;
  }]);