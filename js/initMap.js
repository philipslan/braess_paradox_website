var nonMains = [];
var markers = [];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.74, lng: -73.910555},
        zoom: 11
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var opened = [];
    markers = zeroPoints.map(function(entry){
        var contentString = '<div id="content">'+
            '<h4 id="firstHeading" class="firstHeading">' + entry.roadName + '</h4>'+
            '<div id="bodyContent"><p>'+
            '<b>Score</b>:&nbsp;' + parseInt(entry.score) + 
            "<br/><b>Average Neighbor Score</b>:&nbsp;" + parseInt(entry.avg_score)+
            '</p></div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.lat, entry.long),
            label: '0',
            map: map,
            title: entry.roadName
        });
        marker.addListener('click', function() {
            closeNonMains();
            markers.forEach(function(mkr){
                if (marker !== mkr)
                    mkr.setVisible(false);
            });
            nonMains = entry.other_locations.map(function(ent){
                var cString = '<div id="content">'+
                    '<h4 id="firstHeading" class="firstHeading">' + ent.roadName + '</h4>'+
                    '<div id="bodyContent"><p>'+
                    '<b>Score</b>:&nbsp;' + parseInt(ent.score) + 
                    "<br/><b>Average Neighbor Score</b>:&nbsp;" + parseInt(ent.avg_score)+
                    '</p></div>';
                var iwindow = new google.maps.InfoWindow({
                    content: cString
                });
                var makr = new google.maps.Marker({
                    position: new google.maps.LatLng(ent.lat, ent.long),
                    label: '1',
                    map: map,
                    title: ent.roadName,
                    icon: ent.score < ent.avg_score ? "images/pos.png" : "images/neg.png"
                });
                makr.addListener('click', function() {
                    opened.forEach(function(obj){
                        obj.close();
                    });
                    opened = [];
                    iwindow.open(map, makr);
                    opened.push(iwindow);
                });
                return makr;
            });
            infowindow.open(map, marker);
        });
        return marker;
    });
}
var closeNonMains = function(){
    nonMains.forEach(function(mkr){
        mkr.setVisible(false);
    })
}
var resetMap = function () {
    closeNonMains();
    markers.forEach(function(ent){
        ent.setVisible(true);
    })
}