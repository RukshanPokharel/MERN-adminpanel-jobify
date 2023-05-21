import React from "react";
import { geoData } from "../../mockData/geoData";
import { geoData2 } from "../../mockData/geoData2";
import { ResponsiveChoropleth } from "@nivo/geo";
import Wrapper from "../../assets/wrappers/Geography";

const Geography = () => {
  const data = geoData;
  const mapData = geoData2;
  return (
    <div style={{ border: "1px solid green", height: "75vh", width: "100%" }}>
      {/* <Wrapper> */}
      {data ? (<ResponsiveChoropleth
        data={data}
        features={mapData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        colors="nivo"
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[0.45, 0.6]}
        projectionRotation={[0, 0, 0]}
        //   enableGraticule={true}
        // graticuleLineColor="#dddddd"
        borderWidth={1.3}
        borderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: true,
            translateX: 0,
            translateY: -125,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      ) : <>Loading...</>
      }
      {/* </Wrapper> */}
    </div>
  );
};

export default Geography;
