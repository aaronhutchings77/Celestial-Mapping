import {generateTrack} from './ephemeris.js';
import {harmonicFit} from './fit.js';
import {plot} from './plot.js';

const periodsVenus=[224.701,583.92,365.2422,583.92/2,365.2422/2,583.92/3,365.2422/3];
const periodsMars=[686.98,779.94,365.2422,779.94/2,365.2422/2,779.94/3,365.2422/3];

document.getElementById('run').onclick=()=>{
  const planet=document.getElementById('planet').value;
  const k=parseInt(document.getElementById('harmonics').value);
  const track=generateTrack(planet);
  const periods=planet==='Venus'?periodsVenus:periodsMars;
  const fit=harmonicFit(track.td,track.x,track.y,k,periods);
  plot(document.getElementById('plot'),track.x,track.y,fit.xh,fit.yh);

  document.getElementById('metrics').textContent='Samples: '+track.x.length;
document.getElementById('params').textContent = JSON.stringify({
  planet,
  k,
  periods: fit.usedPeriods,
  omegas: fit.omegas,
  coeff_x: fit.cx,
  coeff_y: fit.cy
}, null, 2);

};
