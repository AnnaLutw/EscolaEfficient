
const types = ['end_semester', 'start_semester', 'holiday', 'big_holiday']
const saveEvent = async () => {
    try {
        const event = $('.modal_calendar').find('#event').val();
        const hour = $('.modal_calendar').find('#hour').val();
        const endEvent = $('.modal_calendar').find('#end').val();
        const startEvent = $('.modal_calendar').find('#start').val();
        const type = $('.modal_calendar').find('#event_type').val();
        
        const start = new Date(startEvent);
        const end = new Date(endEvent);

        const [hourPart, minutePart] = hour.split(':').map(Number);

        start.setUTCHours(hourPart);
        start.setUTCMinutes(minutePart);

        const { content, status } = await request('POST', `calendar`, { event: event, start: start, end:end, type:type});
        if (status !== 200) {
            messagesHandler.messageError(content);
        } else {
            messagesHandler.newMessage(content);
            initCalendar();
        }
    } catch (error) {
        console.log(error);
    }
};
const getEvents = async () => {
    try {
        const { content, status } = await request('GET', 'calendar');
        if (status === 200) {
            return content.map(event => ({
                title: event.event,
                end: new Date(event.end),
                start: new Date(event.start),
                backgroundColor:mapEventTypeToColor(event.type),
                _id: event._id
            }));
        } else {
            throw new Error('Erro ao obter eventos');
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const initCalendar = async () => {
    try {
        const events = await getEvents();
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            timeZone: 'UTC',
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            themeSystem: 'bootstrap5',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,multiMonthYear'
            },
            buttonText: { 
              today:    'Hoje',
              month:    'Mês',
              week:     'Semana',
              year:     'Ano',
              day:      'Dia',
              list:     'list'
            },
            eventDisplay: 'block',
            events: events,
            
        });

        calendar.render();
    } catch (error) {
        console.log(error);
    }
}

const validarHora =(hora) =>{
    const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return horaRegex.test(hora);
}
const mapEventTypeToColor = (eventType) => {
  switch (eventType) {
    case 'test':
      return '##0d6efd'; 
    case 'activity':
      return '#198754'; 
    case 'work':
      return '#dc3545'; 
    case 'end_semester':
      return '#ffc107'; 
    case 'start_semester':
      return '#0dcaf0'; 
    case 'holiday':
        return '#212529'; 
    default:
      return eventType;
  }
};

const mapEventTypeToText = (eventType) => {
  switch (eventType) {
    case 'test':
      return 'Prova';
    case 'activity':
      return 'Atividade';
    case 'work':
      return 'Trabalho';
    case 'end_semester':
      return 'Fim de semestre';
    case 'start_semester':
      return 'Início de semestre';
    case 'holiday':
      return 'Feriado';
    default:
      return eventType;
  }
};

const listEventType = (content) => {
  try {
    const ctx = '#event_type';
    $(ctx).empty(); 

    content.forEach(val => {
      const text = mapEventTypeToText(val); 
      $(ctx).append($('<option>', {
        value: val,
        text: text
      }));
    });

  } catch (error) {
    console.log(error);
  }
};

$(document).ready(async () =>{
    await initCalendar()

    $('#hour').mask('99:99');

    $('#hour').keyup(function() {
        if (!validarHora($(this).val())) {
            $('#hour-error').show();
            $('#save').prop('disabled', true); 
        } else {
            $('#hour-error').hide();
            $('#save').prop('disabled', false); 
        }
    });

    $('#new_event').on('click' , ()=>{
        try{
        list('calendar/type', listEventType)
            $('.modal_calendar').offcanvas('show')
        }catch(error){
            console.log(error)
        }
    })
    $('.modal_calendar').on('click' , '#save',  ()=>{
        try{
            saveEvent()
            $('.modal_calendar').modal('hide')
        }catch(error){
            console.log(error)
        }
    })
  
  });