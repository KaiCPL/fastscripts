/* fastscripts */
window.Y=function(s,c,x){var r=document.querySelectorAll(s);return r.length?(c?[].forEach.call(r,x?function(e){e.addEventListener(c,x,!!0)}:c):r[0]):null};
function insertAfter(newNode,referenceNode){referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}
function _clear(e){if(e) while(e.firstChild) e.removeChild(e.firstChild);}
function _remove(e){ e.parentNode.removeChild(e); }
function _id(id){return document.getElementById(id);}
function _class(cl){return document.getElementsByClassName(cl);}
function _selector(s){return document.querySelectorAll(s);}
function _create(e,id){var T=document.createElement(e); if(typeof id==='string') T.id=id; return T;}
function _toggle(e){ e.hasAttribute('hidden') ? e.removeAttribute('hidden') : e.setAttribute('hidden',true); }
function _define(id,scope){ return _id(id)||((_id(scope)||document.body).appendChild(_create('div',id)));}
function _each(nodelist,callback){ Array.prototype.forEach.call(nodelist,callback); }
function _apply(selector,callback){ _each(_selector(selector),callback); }
function _findnext(element,nodename){ nodename=nodename.toUpperCase(); while(element.nextElementSibling){ element=element.nextElementSibling; if(element.tagName==nodename) return element; } return null; }
function _findparent(element,nodename){ nodename=nodename.toUpperCase(); while(element.parentNode){ element=element.parentNode; if(element.tagName==nodename) return element; } return null; }
function _objectClone(original,copy){ if(Object.assign) copy=Object.assign({},original); else copy=JSON.parse(JSON.stringify(original)); }
function createXMLHTTPObject() {
	var XMLHttpFactories=[
		function(){return new XMLHttpRequest();},
		function(){return new ActiveXObject("Msxml2.XMLHTTP");},
		function(){return new ActiveXObject("Msxml3.XMLHTTP");},
		function(){return new ActiveXObject("Microsoft.XMLHTTP");}
	];
	var xmlhttp=false;
	for(var i=0;i<XMLHttpFactories.length;i++) { try { xmlhttp = XMLHttpFactories[i](); } catch (e) { continue; } break; }
	return xmlhttp;
}
function ajax_success(data){ console.log(data); }
function ajax_error(xhr,status){ console.log('HTTP '+xhr+' '+status); }
function ajax(url,method,data,success,error,headers) {
	//if(!data && method=='POST') return false;
	if (!(req=createXMLHTTPObject())) return false;
	if(typeof success != 'function') success=ajax_success;
	if(typeof error != 'function') error=ajax_success;
	req.open(method,url,true); // true for async
	if(!!headers) for(var i in headers) req.setRequestHeader(i, headers[i]);
	req.send(data);
	req.onreadystatechange=function(){
		if(req.readyState==4){
			if(req.status==200 || req.status==304) success(req.responseText);
			else error(req.status,req.statusText);
		}
	};
	return req.responseText;
}