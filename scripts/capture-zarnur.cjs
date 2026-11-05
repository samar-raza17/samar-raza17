const { chromium }=require('playwright');
const fs=require('fs');
(async()=>{
const chrome=fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined;
const browser=await chromium.launch({headless:true,...(chrome?{executablePath:chrome}:{}) ,args:['--no-sandbox','--disable-gpu']});
fs.mkdirSync('assets',{recursive:true});
const targets=[
{url:'https://zarnur.vercel.app/',name:'zarnur-marketing.png'},
{url:'https://zarnur-ecomm-shop.vercel.app/',name:'zarnur-shop.png'},
{url:'https://tahir-madani.vercel.app/',name:'tahir-madani-live.png'},
{url:'https://shaoor-lms.vercel.app/',name:'shaoor-lms-live.png'}
];
for(const {url,name} of targets){
 try{
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForTimeout(5500);
 if(!response||response.status()>=400)throw Error('HTTP '+response?.status());
 await page.screenshot({path:'assets/'+name,animations:'disabled'});
 console.log('CAPTURED',name,response.status(),await page.title());await page.close();
 }catch(e){console.log('FAILED',name,e.message)}
}
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('https://play.google.com/store/apps/details?id=com.zarnur.shop&hl=en',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForTimeout(4000);
 let urls=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.naturalHeight>=450&&i.naturalWidth>=250&&i.naturalHeight>i.naturalWidth*1.3).map(i=>i.currentSrc||i.src));
 console.log('PLAY STORE image candidates',urls.length);
 for(let k=0;k<Math.min(urls.length,3);k++){
  try{const r=await page.request.get(urls[k]);if(r.ok()){const data=await r.body();if(data.length>15000){fs.writeFileSync('assets/zarnur-play-'+(k+1)+'.png',data);console.log('CAPTURED PLAY',k+1,data.length)}}}catch(e){console.log('PLAY asset error',e.message)}
 }
 await page.close();
}catch(e){console.log('PLAY screenshot unavailable',e.message)}
await browser.close();
})();