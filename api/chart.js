const {yf}=require('./_y');
const IV=['1m','5m','15m','1d','1wk'],RG=['1d','5d','1mo','1y','5y'];
module.exports=async(req,res)=>{try{
const{symbol='',range='1d',interval='1m'}=req.query;
if(!/^[A-Z0-9&.\-]{1,20}$/i.test(symbol)||!IV.includes(interval)||!RG.includes(range))return res.status(400).json({error:'bad params'});
const j=await yf(`/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&includePrePost=false`);
const r=j.chart.result[0],m=r.meta,t=r.timestamp||[],k=r.indicators.quote[0],c=[];
t.forEach((x,i)=>{if(k.close[i]!=null)c.push({t:x*1000,o:k.open[i],h:k.high[i],l:k.low[i],c:k.close[i],v:k.volume[i]||0})});
res.setHeader('Cache-Control','s-maxage=2,stale-while-revalidate=5');
res.json({price:m.regularMarketPrice,time:m.regularMarketTime*1000,name:m.longName||m.shortName||symbol,candles:c});
}catch(e){res.status(502).json({error:String(e.message||e)})}};
