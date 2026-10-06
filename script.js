// Mobile menu
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// Terminal typing intro
const term=document.getElementById('term');
const lines=[
 ['$ whoami','khalil_ullah'],
 ['$ cat role.txt','Aspiring Red Team Operator | Ethical Hacker'],
 ['$ ls focus/','pentesting  devsecops  azure-security  automation'],
 ['$ cat status.txt','Learning, building and breaking things (legally).']
];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
async function run(){
  let html='';
  for(const [cmd,out] of lines){
    if(reduce){html+=`<span class="p">${esc(cmd)}</span>\n<span class="o">${esc(out)}</span>\n\n`;term.innerHTML=html;continue}
    let typed='';
    for(const ch of cmd){typed+=ch;term.innerHTML=html+`<span class="p">${esc(typed)}</span><span class="caret"></span>`;await new Promise(r=>setTimeout(r,45))}
    html+=`<span class="p">${esc(cmd)}</span>\n`;
    await new Promise(r=>setTimeout(r,250));
    html+=`<span class="o">${esc(out)}</span>\n\n`;term.innerHTML=html+'<span class="caret"></span>';
    await new Promise(r=>setTimeout(r,500));
  }
  term.innerHTML=html+'<span class="p">$ </span><span class="caret"></span>';
}
run();

// Skill bars animate when visible
const bars=document.getElementById('bars');
bars.querySelectorAll('div').forEach(d=>d.querySelector('i').style.setProperty('--w',d.dataset.v+'%'));
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){bars.classList.add('on');o.disconnect()}},{threshold:.3}).observe(bars);

// Contact form: validates, then opens the visitor's email app
const form=document.getElementById('form'),st=document.getElementById('status');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(form));
  if(!d.name.trim()||!/^\S+@\S+\.\S+$/.test(d.email)||!d.message.trim()){st.className='err';st.textContent='Please fill in your name, a valid email and a message.';return}
  const body=encodeURIComponent(`${d.message}\n\nFrom: ${d.name} (${d.email})`);
  location.href=`mailto:khalil.ficmihas@gmail.com?subject=${encodeURIComponent('Portfolio message from '+d.name)}&body=${body}`;
  st.className='ok';st.textContent='Opening your email app to send the message.';form.reset();
});
document.getElementById('yr').textContent=new Date().getFullYear();

// Certifications gallery with filters and lightbox
const CERTS=[["article-writing.jpg", "Article Writing", "Other"], ["basic-od-data-science.jpg", "Basics of Data Science", "Data & AI"], ["basic-of-python-uniathena.jpg", "Basics of Python (UniAthena)", "Programming"], ["certified-in-infromation-security.jpg", "Certified in Information Security", "Cybersecurity"], ["ethical.jpg", "Certified Ethical Hacking (CEH)", "Cybersecurity"], ["information-security.jpg", "Information Security", "Cybersecurity"], ["intro-to-cyber.jpg", "Introduction to Cybersecurity", "Cybersecurity"], ["data-science.jpg", "Data Science", "Data & AI"], ["deep-learning.jpg", "Deep Learning", "Data & AI"], ["understanding-machine-learning.jpg", "Understanding Machine Learning", "Data & AI"], ["introduction-to-python.jpg", "Introduction to Python", "Programming"], ["introduction-to-java.jpg", "Introduction to Java", "Programming"], ["intermediate-java.jpg", "Intermediate Java", "Programming"], ["input-output-streams-in-java.jpg", "Input/Output Streams in Java", "Programming"], ["optimizing-code-in-java.jpg", "Optimizing Code in Java", "Programming"], ["testing-in-java.jpg", "Testing in Java", "Programming"], ["introduction-to-oop.jpg", "Introduction to OOP", "Programming"], ["early-age-programmming.jpg", "Early Age Programming", "Programming"], ["code-org-1.jpg", "Code.org Course 1", "Programming"], ["course-2.jpg", "Code.org Course 2", "Programming"], ["course3.jpg", "Code.org Course 3", "Programming"], ["excel.jpg", "Microsoft Excel", "Other"], ["captain.jpg", "Sports Award: Cricket", "Awards"], ["sc.jpg", "Performance Award", "Awards"], ["recitation.jpg", "Recitation Award", "Awards"]];
const gal=document.getElementById('gallery'),fil=document.getElementById('filters');
const cats=['All',...new Set(CERTS.map(c=>c[2]))];
fil.innerHTML=cats.map((c,i)=>`<button class="chip${i?'':' on'}" data-c="${c}">${c}</button>`).join('');
gal.innerHTML=CERTS.map(c=>`<figure data-c="${c[2]}"><img src="images/certs/${c[0]}" alt="${c[1]} certificate" loading="lazy"><figcaption>${c[1]}</figcaption></figure>`).join('');
fil.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;
  fil.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===b));
  gal.querySelectorAll('figure').forEach(f=>f.hidden=b.dataset.c!=='All'&&f.dataset.c!==b.dataset.c)});
const lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p');
gal.addEventListener('click',e=>{const f=e.target.closest('figure');if(!f)return;lbi.src=f.querySelector('img').src;lbi.alt=f.querySelector('img').alt;lbp.textContent=f.querySelector('figcaption').textContent;lb.hidden=false;lb.querySelector('button').focus()});
lb.addEventListener('click',()=>lb.hidden=true);
addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
