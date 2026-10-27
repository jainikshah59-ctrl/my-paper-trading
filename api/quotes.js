const {yf}=require('./_y');
module.exports=async(req,res)=>{const L=String(req.query.symbols||'').split(',').filter(s=>/^[A-Z0-9&.\-]{1,20}$/i.test(s)).slice(0,25);
const out={};await Promise.allSettled(L.map(async s=>{const j=await yf(`/v8/finance/chart/${encodeURIComponent(s)}?range=1d&interval=1d`);const m=j.chart.result[0].meta;
out[s]={price:m.regularMarketPrice,prev:m.chartPreviousClose??m.previousClose,time:m.regularMarketTime*1000,name:m.longName||m.shortName||s}}));
res.setHeader('Cache-Control','s-maxage=3,stale-while-revalidate=8');res.json(out)};
