const {yf}=require('./_y');
module.exports=async(req,res)=>{try{const q=String(req.query.q||'').slice(0,40);if(q.length<2)return res.json([]);
const j=await yf(`/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=25&newsCount=0`);
res.setHeader('Cache-Control','s-maxage=60');
res.json((j.quotes||[]).filter(x=>x.quoteType==='EQUITY'&&(x.exchange==='NSI'||x.exchange==='BSE')).map(x=>({symbol:x.symbol,name:x.longname||x.shortname||x.symbol})))
}catch(e){res.status(502).json({error:String(e.message||e)})}};
