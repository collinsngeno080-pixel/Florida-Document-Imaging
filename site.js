(function(){
    var t=document.querySelector('.menu-toggle'),n=document.getElementById('site-nav');
    if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});}
    var f=document.getElementById('quote-form'); if(!f) return;
    var msg=document.getElementById('form-msg');
    f.addEventListener('submit',function(e){
        e.preventDefault();
        if(!f.reportValidity()) return;
        var data=new FormData(f), fields=[];
        data.forEach(function(v,k){ if(v!=='') fields.push({name:k,value:String(v)}); });
        var portal=f.dataset.portal, guid=f.dataset.form;
        function done(ok){
            msg.hidden=false;
            if(ok){ msg.dataset.state='ok'; msg.textContent='Thanks. We received your request and will call you to go over the details.'; f.querySelector('button[type=submit]').disabled=true; }
            else { msg.dataset.state='err'; msg.textContent='Your request did not go through. Please call us at (239) 332-3369 and we will take it by phone.'; }
        }
        if(!guid){ done(false); return; }
        fetch('https://api.hsforms.com/submissions/v3/integration/submit/'+portal+'/'+guid,{
            method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({fields:fields,context:{pageUri:location.href,pageName:document.title}})
        }).then(function(r){done(r.ok);}).catch(function(){done(false);});
    });
})();
