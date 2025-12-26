export function plot(canvas,x,y,xh,yh){
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const allx=x.concat(xh), ally=y.concat(yh);
  const minx=Math.min(...allx), maxx=Math.max(...allx);
  const miny=Math.min(...ally), maxy=Math.max(...ally);
  const s=Math.min((canvas.width-40)/(maxx-minx),(canvas.height-40)/(maxy-miny));
  const tx=v=>20+(v-minx)*s, ty=v=>canvas.height-(20+(v-miny)*s);

  ctx.strokeStyle='#ddd'; ctx.lineWidth=2;
  ctx.beginPath(); x.forEach((v,i)=>i?ctx.lineTo(tx(v),ty(y[i])):ctx.moveTo(tx(v),ty(y[i]))); ctx.stroke();
  ctx.strokeStyle='#9a9a9a'; ctx.setLineDash([6,6]);
  ctx.beginPath(); xh.forEach((v,i)=>i?ctx.lineTo(tx(v),ty(yh[i])):ctx.moveTo(tx(v),ty(yh[i]))); ctx.stroke();
  ctx.setLineDash([]);
}