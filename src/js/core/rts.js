const TREM = require("../constant");

TREM.variable.events.on("MapLoad", (map) => {
  map.addSource("rts", {
    type : "geojson",
    data : {
      type     : "FeatureCollection",
      features : [],
    },
  });

  map.addLayer({
    id     : "rts-layer",
    type   : "circle",
    source : "rts",
    paint  : {
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "i"],
        -3, TREM.constant.COLOR.RTS.intensity_3,
        -2, TREM.constant.COLOR.RTS.intensity_2,
        -1, TREM.constant.COLOR.RTS.intensity_1,
        0, TREM.constant.COLOR.RTS.intensity0,
        1, TREM.constant.COLOR.RTS.intensity1,
        2, TREM.constant.COLOR.RTS.intensity2,
        3, TREM.constant.COLOR.RTS.intensity3,
        4, TREM.constant.COLOR.RTS.intensity4,
        5, TREM.constant.COLOR.RTS.intensity5,
        6, TREM.constant.COLOR.RTS.intensity6,
        7, TREM.constant.COLOR.RTS.intensity7,
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        4, 2,
        12, 8,
      ],
    },
  });
});

TREM.variable.events.on("DataRts", (ans) => {
  const data_list = [];

  if (!TREM.variable.station) return;

  for (const id of Object.keys(ans.data.station)) {
    const station_info = TREM.variable.station[id];
    if (!station_info) continue;
    const station_location = station_info.info.at(-1);
    data_list.push({
      type     : "Feature",
      geometry : {
        type        : "Point",
        coordinates : [station_location.lon, station_location.lat],
      },
      properties: {
        i: ans.data.station[id].i,
      },
    });
  }

  if (TREM.variable.map) TREM.variable.map.getSource("rts").setData({ type: "FeatureCollection", features: data_list });
});