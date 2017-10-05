var map, featureList, spatialtimetableSearch = [],mondaySearch = [],tuesdaySearch = [],wednesdaySearch = [],thursdaySearch = [],fridaySearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(spatialtimetable.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
  spatialtimetable.eachLayer(function (layer) {
    if (map.hasLayer(spatialtimetableLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  // monday.eachLayer(function (layer) {
  // if (map.hasLayer(mondayLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
  // tuesday.eachLayer(function (layer) {
  //   if (map.hasLayer(tuesdayLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
  //       wednesday.eachLayer(function (layer) {
  //   if (map.hasLayer(wednesdayLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
  //         thursday.eachLayer(function (layer) {
  //   if (map.hasLayer(thursdayLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
  //   friday.eachLayer(function (layer) {
  //   if (map.hasLayer(fridayLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JhY2VhbW9uZGkiLCJhIjoiY2ozcmlydTIwMDAyOTJ3bzVsaWdvYTJ6cCJ9.kAk8OZpXt1sOPNjLo-RyOg', {
    maxZoom: 18,
    attribution: ' Tiles &copy; <a href="http://www.mapbox.com">MapBox</a>'
});

var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};




/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var spatialtimetableLayer = L.geoJson(null);
var spatialtimetable = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      spatialtimetableSearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Spatialtimetable",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/spatialtimetable.geojson", function (data) {
  spatialtimetable.addData(data);
  map.addLayer(spatialtimetableLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var mondayLayer = L.geoJson(null);
var monday = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      mondaySearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Monday",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/monday.geojson", function (data) {
  monday.addData(data);
  map.addLayer(mondayLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var tuesdayLayer = L.geoJson(null);
var tuesday = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      tuesdaySearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Tuesday",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/tuesday.geojson", function (data) {
  tuesday.addData(data);
  map.addLayer(tuesdayLayer);
});
/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var wednesdayLayer = L.geoJson(null);
var wednesday = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      wednesdaySearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Wednesday",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/wednesday.geojson", function (data) {
  wednesday.addData(data);
  map.addLayer(wednesdayLayer);
});
/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var thursdayLayer = L.geoJson(null);
var thursday = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      thursdaySearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Thursday",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/thursday.geojson", function (data) {
  thursday.addData(data);
  map.addLayer(thursdayLayer);
});
/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var fridayLayer = L.geoJson(null);
var friday = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.UNIT,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>VENUE</th><td>" + feature.properties.VENUE + "</td></tr>" + "<tr><th>LECTURER</th><td>" + feature.properties.LECTURER + "</td></tr>" + "<tr><th>TIME</th><td>" + feature.properties.TIME + "</td></tr>" + "<tr><th>DAY</th><td>" + feature.properties.DAY + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.UNIT);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.UNIT + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      fridaySearch.push({
        name: layer.feature.properties.UNIT,
        address: layer.feature.properties.VENUE,
        source: "Friday",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/friday.geojson", function (data) {
  friday.addData(data);
  map.addLayer(fridayLayer);
});

map = L.map("map", {
  zoom: 20,
  center: [-1.0969, 37.0154],
  layers: [cartoLight, spatialtimetable, markerClusters, highlight,monday,tuesday, wednesday, thursday, friday],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === spatialtimetableLayer) {
    markerClusters.addLayer(spatialtimetable);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === spatialtimetableLayer) {
    markerClusters.removeLayer(spatialtimetable);
    syncSidebar();
  }
});
map.on("overlayadd", function(e) {
  if (e.layer === mondayLayer) {
    markerClusters.addLayer(monday);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === mondayLayer) {
    markerClusters.removeLayer(monday);
    syncSidebar();
  }
});
map.on("overlayadd", function(e) {
  if (e.layer === tuesdayLayer) {
    markerClusters.addLayer(tuesday);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === tuesdayLayer) {
    markerClusters.removeLayer(tuesday);
    syncSidebar();
  }
});
map.on("overlayadd", function(e) {
  if (e.layer === wednesdayLayer) {
    markerClusters.addLayer(wednesday);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === wednesdayLayer) {
    markerClusters.removeLayer(wednesday);
    syncSidebar();
  }
});
map.on("overlayadd", function(e) {
  if (e.layer === thursdayLayer) {
    markerClusters.addLayer(thursday);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === thursdayLayer) {
    markerClusters.removeLayer(thursday);
    syncSidebar();
  }
});
map.on("overlayadd", function(e) {
  if (e.layer === fridayLayer) {
    markerClusters.addLayer(friday);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === fridayLayer) {
    markerClusters.removeLayer(friday);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});



var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
      "OSM":mapbox,
  "Street Map": cartoLight,
  "Aerial Imagery": usgsImagery
};

var groupedOverlays = {
  "Points of Interest": {
    "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;ALL": spatialtimetableLayer,
      "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Monday":monday,
            "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Tuedsay":tuesday,
            "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Wednesday":wednesday,
      "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Thurdsay":thursday,
      "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Friday":friday
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  map.fitBounds(spatialtimetable.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});


  var spatialtimetableBH = new Bloodhound({
    name: "Spatialtimetable",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: spatialtimetableSearch,
    limit: 10
  });
    var mondayBH = new Bloodhound({
    name: "Monday",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: mondaySearch,
    limit: 10
  });
        var tuesdayBH = new Bloodhound({
    name: "Tuesday",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: tuesdaySearch,
    limit: 10
  });    var wednesdayBH = new Bloodhound({
    name: "Wednesday",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: wednesdaySearch,
    limit: 10
  });    var thursdayBH = new Bloodhound({
    name: "Thursday",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: thursdaySearch,
    limit: 10
  });    var fridayBH = new Bloodhound({
    name: "Friday",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: fridaySearch,
    limit: 10
  });


  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  spatialtimetableBH.initialize();
    mondayBH.initialize();
        tuesdayBH.initialize();
    wednesdayBH.initialize();
    thursdayBH.initialize();
    fridayBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Spatialtimetable",
    displayKey: "name",
    source: spatialtimetableBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;TIMETABLE</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },
      {
    name: "Monday",
    displayKey: "name",
    source: mondayBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;MONDAY</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "Tuesday",
    displayKey: "name",
    source: tuesdayBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;TUESDAY</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "Wednesday",
    displayKey: "name",
    source: wednesdayBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;WEDNESDAY</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "Thursday",
    displayKey: "name",
    source: thursdayBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;THURSDAY</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "Friday",
    displayKey: "name",
    source: fridayBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;FRIDAY</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    // if (datum.source === "Spatialtimetable") {
    //   if (!map.hasLayer(spatialtimetableLayer)) {
    //     map.addLayer(spatialtimetable);
    //   }
    //   map.setView([datum.lat, datum.lng], 17);
    //   if (map._layers[datum.id]) {
    //     map._layers[datum.id].fire("click");
    //   }
    // }
    if (datum.source === "Monday") {
      if (!map.hasLayer(mondayLayer)) {
        map.addLayer(monday);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Tuesday") {
      if (!map.hasLayer(tuesdayLayer)) {
        map.addLayer(tuesday);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Wednesday") {
      if (!map.hasLayer(wednesdayLayer)) {
        map.addLayer(wednesday);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Thursday") {
      if (!map.hasLayer(thursdayLayer)) {
        map.addLayer(thursday);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Friday") {
      if (!map.hasLayer(fridayLayer)) {
        map.addLayer(friday);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
