export function harmonicFit(td,x,y,k,periods) {
  const omegas = periods.slice(0,k).map(p=>2*Math.PI/p);
  const N=td.length;
  const A=math.zeros(N,2*omegas.length);
  omegas.forEach((w,j)=>{
    for(let i=0;i<N;i++){
      A.set([i,2*j],Math.cos(w*td[i]));
      A.set([i,2*j+1],Math.sin(w*td[i]));
    }
  });
  const bx=math.matrix(x).reshape([N,1]);
  const by=math.matrix(y).reshape([N,1]);
  const cx=math.lusolve(math.multiply(math.transpose(A),A),math.multiply(math.transpose(A),bx));
  const cy=math.lusolve(math.multiply(math.transpose(A),A),math.multiply(math.transpose(A),by));

  const xh=[], yh=[];
  for(let i=0;i<N;i++){
    let sx=0, sy=0;
    omegas.forEach((w,j)=>{
      sx+=cx.get([2*j])*Math.cos(w*td[i])+cx.get([2*j+1])*Math.sin(w*td[i]);
      sy+=cy.get([2*j])*Math.cos(w*td[i])+cy.get([2*j+1])*Math.sin(w*td[i]);
    });
    xh.push(sx); yh.push(sy);
  }
  return {cx,cy,xh,yh,omegas};
}
