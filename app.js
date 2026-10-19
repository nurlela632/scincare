import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';
const configured=SUPABASE_URL.startsWith('https://') && SUPABASE_ANON_KEY!=='YOUR_SUPABASE_ANON_KEY';
const db=configured?createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;
const demo=[
{id:1,name:'Botanical Gentle Cleanser',category:'Cleansers',price:24,image_url:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=650&q=85',badge:'BEST SELLER'},
{id:2,name:'Radiance Glow Serum',category:'Serums',price:38,image_url:'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=650&q=85',badge:'NEW'},
{id:3,name:'Daily Dew Moisturizer',category:'Moisturizers',price:32,image_url:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=650&q=85',badge:'POPULAR'},
{id:4,name:'Everyday SPF 50',category:'Sunscreen',price:29,image_url:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=650&q=85',badge:'ESSENTIAL'}];
let products=demo,category='';
const $=s=>document.querySelector(s);
function render(){let q=$('#search').value.toLowerCase();let list=products.filter(p=>(!category||p.category===category)&&p.name.toLowerCase().includes(q));$('#products').innerHTML=list.length?list.map(p=>`<article class="product"><span class="tag">${escapeHtml(p.badge||'SCIN CARE')}</span><img src="${escapeHtml(p.image_url||'')}" alt="${escapeHtml(p.name)}" loading="lazy"><div class="product-info"><p>${escapeHtml(p.category)}</p><h3>${escapeHtml(p.name)}</h3><div class="price">$${Number(p.price).toFixed(2)}</div>${safeAffiliateUrl(p.affiliate_url)?`<a class="affiliate-link" href="${escapeHtml(safeAffiliateUrl(p.affiliate_url))}" target="_blank" rel="noopener noreferrer sponsored nofollow">BUY NOW ↗</a>`:`<span class="affiliate-link disabled">LINK COMING SOON</span>`}</div></article>`).join(''):'<p class="empty">No products found.</p>'}
function safeAffiliateUrl(value){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null}catch{return null}}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('#search').oninput=render;document.querySelectorAll('.category').forEach(el=>el.onclick=()=>{category=category===el.dataset.cat?'':el.dataset.cat;document.querySelector('#featured').scrollIntoView({behavior:'smooth'});render()});
let slide=0;const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dot')];function show(n){slide=n;slides.forEach((s,i)=>s.classList.toggle('active',i===n));dots.forEach((d,i)=>d.classList.toggle('active',i===n))}dots.forEach((d,i)=>d.onclick=()=>show(i));setInterval(()=>show((slide+1)%slides.length),5500);
async function load(){if(db){const {data,error}=await db.from('products').select('id,name,category,price,image_url,badge,affiliate_url').eq('active',true).order('created_at',{ascending:false});if(error){console.error(error);$('#products').innerHTML='<p class="empty">Unable to load products.</p>';return}products=data||[]}render()}load();
