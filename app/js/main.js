const getDateArear = document.getElementById('send-message');
getDateArear.addEventListener('submit', getMessage);

function ctrlEnter(event, formElem)
    {
        if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD)))
            {
                getMessage(event);
            }
    }

function counter (){
    let counter = 4;
    return function(){
        return counter++
    }
}
var count = counter();

function getMessage(event){
    event.preventDefault();
    let dateArea = document.getElementById('date-textarea').value;
    sendMessage(dateArea);
}

function sendMessage (dateArea){
    let idDomElem = count();
    let appendMessage = document.getElementById('append-message');
    appendMessage.appendChild(document.createElement('div')).setAttribute("id", idDomElem);
    let elem = document.getElementById(idDomElem);    
    let html = '<div class="user__comments-name"><strong>Admin</strong><span>14 октября 2011</span></div><div class="user__comments-article"><p>' + dateArea + '</p></div>';
    elem.innerHTML = html;
    document.getElementById('date-textarea').value = '';
}




