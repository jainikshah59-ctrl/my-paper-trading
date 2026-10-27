const H={'User-Agent':'Mozilla/5.0 (compatible; PaperTrade)','Accept':'application/json'};
async function yf(p){const r=await fetch('https://query1.finance.yahoo.com'+p,{headers:H});if(!r.ok)throw new Error('upstream '+r.status);return r.json()}
module.exports={yf};
