export function generateTrack(planet) {
  const start = new Date(Date.UTC(2017,0,1));
  const end = planet==='Venus'
    ? new Date(Date.UTC(2025,0,1))
    : new Date(Date.UTC(2020,0,1));

  const dates = [];
  let t = new Date(start);
  let step = true;
  while (t <= end) {
    dates.push(new Date(t));
    t = new Date(t.getTime() + (step?3:4)*86400000);
    step = !step;
  }

  const x=[], y=[], td=[];
  dates.forEach(d=>{
    const time = Astronomy.MakeTime(d);
    const body = planet==='Venus'?Astronomy.Body.Venus:Astronomy.Body.Mars;
    const vec = Astronomy.GeoVector(body,time,true);
    const ecl = Astronomy.Ecliptic(vec);
    const lon = ecl.elon*Math.PI/180;
    const lat = ecl.elat*Math.PI/180;
    x.push(Math.cos(lon)*Math.cos(lat));
    y.push(Math.sin(lon)*Math.cos(lat));
    td.push((d-start)/86400000);
  });

  return {x,y,td};
}
