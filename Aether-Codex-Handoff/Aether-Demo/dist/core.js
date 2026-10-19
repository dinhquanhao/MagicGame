export const SKILLS = Object.freeze({
  bolt: {id:'bolt', name:'Hỏa tiễn',english:'EMBER BOLT',system:'HỆ HỎA',key:'Q',symbol:'✦',theme:'fire',color:'#ffb17b',damage:80,cooldown:1.5,charge:.35,cost:12,range:25,radius:1.05,description:'Nén lửa tại đầu trượng, phóng một đạn phép theo hướng ngắm và bùng nổ khi chạm mục tiêu.'},
  beam: {id:'beam', name:'Quang tuyến',english:'PRISM LANCE',system:'HỆ ÁNH SÁNG',key:'E',symbol:'ϟ',theme:'beam',color:'#86ddf3',damage:140,cooldown:5,charge:.7,cost:22,range:24,radius:1.2,description:'Hội tụ năng lượng, bắn một tia sáng xuyên thẳng qua các mục tiêu trên đường ngắm. Sát thương tính một lần mỗi mục tiêu.'},
  nova: {id:'nova', name:'Tinh vân',english:'ASTRAL NOVA',system:'HỆ TINH TÚ',key:'R',symbol:'✧',theme:'nova',color:'#c1a1ff',damage:220,cooldown:8,charge:1.15,cost:32,range:19,radius:3.8,description:'Khóa vị trí ngắm, triệu hồi một tinh thể từ trên cao. Vụ nổ gây sát thương mọi mục tiêu trong vòng phép bán kính 3,8 m.'}
});
export const SPAWNS = [[-5,-3],[0,-4],[5,-3],[-4,2],[4,2]];
export const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
export function distanceToSegment(px,pz,ax,az,bx,bz){const dx=bx-ax,dz=bz-az,l=dx*dx+dz*dz;const t=l?clamp(((px-ax)*dx+(pz-az)*dz)/l,0,1):0;return Math.hypot(px-ax-t*dx,pz-az-t*dz);}
export class Game {
  constructor(){this.listeners={};this.serial=0;this.reset();}
  on(type,fn){(this.listeners[type]??=[]).push(fn);return()=>this.listeners[type]=this.listeners[type].filter(f=>f!==fn);}
  emit(type,data){for(const fn of this.listeners[type]||[])fn(data);}
  reset(){this.time=0;this.player={x:0,z:7,angle:Math.PI,mana:100,cast:null,moving:0};this.aim={x:0,z:-4};this.selected='bolt';this.cooldowns={bolt:0,beam:0,nova:0};this.projectiles=[];this.pending=[];this.targets=SPAWNS.map(([x,z],i)=>({id:i,x,z,hp:500,maxHp:500,respawn:0,flash:0}));this.stats={damage:0,kills:0,casts:0};this.paused=false;this.input={x:0,z:0};this.emit('reset',{});}
  select(id){if(SKILLS[id]){this.selected=id;this.emit('select',id);}}
  setAim(x,z){if(!Number.isFinite(x)||!Number.isFinite(z))return;const r=Math.hypot(x,z);this.aim={x:r>13?x*13/r:x,z:r>13?z*13/r:z};}
  cast(id=this.selected){const s=SKILLS[id];if(!s||this.paused)return false;this.select(id);if(this.player.cast){this.emit('notice','Đang niệm phép…');return false;}if(this.cooldowns[id]>.001){this.emit('notice','Kỹ năng đang hồi chiêu');return false;}if(this.player.mana<s.cost){this.emit('notice','Chưa đủ năng lượng — chờ hồi phục');return false;}
    const p=this.player;let dx=this.aim.x-p.x,dz=this.aim.z-p.z,len=Math.hypot(dx,dz);if(len<.01){dx=Math.sin(p.angle);dz=Math.cos(p.angle);len=1;}
    const range=Math.min(len,s.range);const aim={x:p.x+dx/len*range,z:p.z+dz/len*range};
    p.mana-=s.cost;p.angle=Math.atan2(dx,dz);p.cast={id,elapsed:0,duration:s.charge,aim,dx:dx/len,dz:dz/len};this.cooldowns[id]=s.cooldown;this.stats.casts++;this.emit('charge',{id,x:p.x,z:p.z,aim});return true;}
  release(c){const p=this.player;const s=SKILLS[c.id];const origin={x:p.x+c.dx*.6,z:p.z+c.dz*.6};
    if(c.id==='bolt')this.projectiles.push({id:++this.serial,x:origin.x,z:origin.z,dx:c.dx,dz:c.dz,life:s.range/17,kind:c.id});
    if(c.id==='beam'){const end={x:origin.x+c.dx*s.range,z:origin.z+c.dz*s.range};for(const t of this.targets)if(t.hp>0&&distanceToSegment(t.x,t.z,origin.x,origin.z,end.x,end.z)<s.radius)this.hit(t,s.damage,c.id);}
    if(c.id==='nova')this.pending.push({wait:.55,kind:'nova',x:c.aim.x,z:c.aim.z});
    this.emit('release',{...c,origin,end:{x:origin.x+c.dx*s.range,z:origin.z+c.dz*s.range}});
  }
  hit(t,damage,kind){if(t.hp<=0)return;const applied=Math.min(damage,t.hp);t.hp-=applied;t.flash=.23;this.stats.damage+=applied;this.emit('hit',{id:t.id,x:t.x,z:t.z,damage:applied,kind});if(t.hp===0){this.stats.kills++;t.respawn=3.5;this.emit('defeat',{id:t.id,x:t.x,z:t.z});}}
  update(dt){if(this.paused)return;dt=clamp(dt,0,.05);this.time+=dt;const p=this.player;p.mana=clamp(p.mana+9*dt,0,100);for(const id in this.cooldowns)this.cooldowns[id]=Math.max(0,this.cooldowns[id]-dt);
    const speed=p.cast?1.7:4.7;const len=Math.hypot(this.input.x,this.input.z);p.moving=len>.05?1:0;if(len>.05){const factor=speed*dt/Math.max(1,len);p.x+=this.input.x*factor;p.z+=this.input.z*factor;const r=Math.hypot(p.x,p.z);if(r>12){p.x*=12/r;p.z*=12/r;}}
    if(!p.cast)p.angle=Math.atan2(this.aim.x-p.x,this.aim.z-p.z);if(p.cast){p.cast.elapsed+=dt;if(p.cast.elapsed>=p.cast.duration){const c=p.cast;p.cast=null;this.release(c);}}
    for(const t of this.targets){t.flash=Math.max(0,t.flash-dt);if(t.hp<=0){t.respawn-=dt;if(t.respawn<=0){t.hp=t.maxHp;this.emit('respawn',t.id);}}}
    this.projectiles=this.projectiles.filter(b=>{const ox=b.x,oz=b.z;b.x+=b.dx*17*dt;b.z+=b.dz*17*dt;b.life-=dt;let nearest=null,nearestDistance=Infinity;for(const t of this.targets){if(t.hp<=0)continue;if(distanceToSegment(t.x,t.z,ox,oz,b.x,b.z)<SKILLS.bolt.radius){const d=Math.hypot(t.x-ox,t.z-oz);if(d<nearestDistance){nearest=t;nearestDistance=d;}}}if(nearest){this.hit(nearest,SKILLS.bolt.damage,'bolt');this.emit('impact',{kind:'bolt',x:nearest.x,z:nearest.z});return false;}return b.life>0;});
    this.pending=this.pending.filter(e=>{e.wait-=dt;if(e.wait>0)return true;for(const t of this.targets)if(t.hp>0&&Math.hypot(t.x-e.x,t.z-e.z)<=SKILLS.nova.radius)this.hit(t,SKILLS.nova.damage,'nova');this.emit('impact',e);return false;});
  }
}
