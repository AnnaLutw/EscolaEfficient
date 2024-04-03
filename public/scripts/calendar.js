
let dateClicked
const saveEvent = ()=>{
    try{
        const event = $('.modal_calendar').find('#event').val()
        const { content, status } = request('POST', `calendar`, {event:event, date:dateClicked});
        status !== 200 ? messagesHandler.messageError(content) : messagesHandler.newMessage(content);

    }catch(error){
        console.log(error)
    }
}
const getEvents = ()=>{
    try{
    const { content, status } = request('GET', `calendar`);
    return content.map(event => ({
        title: event.event,
        start: new Date(event.date), // Convertendo a string para objeto Date
    }));

    }catch(error){
        console.log(error)
    }
}
$(document).ready(function() {


    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      editable: true,
      locale: 'pt-br',
      events: getEvents(),
      dateClick: function(info) {
        dateClicked = info.date;
        console.log('Data clicada:', dateClicked);
      }
    });

    calendar.render();

    $('.fc-day').on('click' , ()=>{
        try{
            $('.modal_calendar').modal('show')
           

        }catch(error){
            console.log(error)
        }
    })
    $('.modal_calendar').on('click' , '#save',  ()=>{
        try{
            saveEvent()

        }catch(error){
            console.log(error)
        }
    })
  });