export default function ReportMap() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLong(longitude);
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);
          }
        );
      });
    };

    const initializeMap = async () => {
      let cityData;
      const { latitude, longitude } = await getUserLocation();

      const olaMaps = new OlaMaps({
        apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
      });

      const myMap = olaMaps.init({
        style:
          "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: "map",
        center: [long, lat],
        zoom: 11,
      });

      setMap(myMap);

      olaMaps
      .addMarker({
        offset: [0, 6],
        anchor: "bottom",
        color: "red",
        draggable: true,
      })
      .setLngLat([long, lat])
      .addTo(myMap);

      myMap.on("load", () => {
        addMarkersToMap(myMap, olaMaps, cityData);
        setLoaded(true);
      });
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);
  return <></>;
}
