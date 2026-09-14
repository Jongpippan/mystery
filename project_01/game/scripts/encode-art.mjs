// Delivery encoding only. Source PNGs and generated-image provenance remain
// untouched; no content, geometry or alpha compositing is edited here.
import sharp from 'sharp';
import {readdirSync,statSync,writeFileSync} from 'node:fs';
const root='public/art',report=[];
for(const file of readdirSync(root).filter(n=>/^[pl]\d\d(?:-[a-z0-9]+)?\.png$/.test(n))){
 const source=`${root}/${file}`,destination=source.replace(/\.png$/,'.webp');
 await sharp(source).webp({quality:88,alphaQuality:100}).toFile(destination);
 report.push({source,destination,sourceBytes:statSync(source).size,deliveryBytes:statSync(destination).size});
}
writeFileSync('../game-plan/validation/art-encoding-2026-09-14.json',JSON.stringify(report,null,2));
console.log({assets:report.length,sourceBytes:report.reduce((s,r)=>s+r.sourceBytes,0),deliveryBytes:report.reduce((s,r)=>s+r.deliveryBytes,0)});
