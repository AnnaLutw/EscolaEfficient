
let dateClicked
const types = ['end_semester', 'start_semester', 'holiday', 'big_holiday']
const saveEvent = async () => {
    try {
        const event = $('.modal_calendar').find('#event').val();
        const hour = $('.modal_calendar').find('#hour').val();
        const endEvent = $('.modal_calendar').find('#end').val();
        
        const start = new Date(dateClicked);
        const end = new Date(endEvent);

        const [hourPart, minutePart] = hour.split(':').map(Number);

        start.setUTCHours(hourPart);
        start.setUTCMinutes(minutePart);

        const { content, status } = await request('POST', `calendar`, { event: event, start: start, end:end});
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

    const  eventosCalendar= [
            {
            "title": "Início do Semestre",
            "start": "2024-03-01",
            'color' : 'blue'
          },
          {
            "title": "Fim de Semestre",
            "start": "2024-07-01",
          },
          {
            "title": "Ano Novo",
            "start": "2024-01-01",
            "end": "2024-01-02"
          },
          {
            "title": "Tiradentes",
            "start": "2024-04-21",
            "end": "2024-04-22"
          },
          {
            "title": "Dia do Trabalho",
            "start": "2024-05-01",
            "end": "2024-05-02"
          },
          {
            "title": "Independência do Brasil",
            "start": "2024-09-07",
            "end": "2024-09-08"
          },
          {
            "title": "Nossa Senhora Aparecida",
            "start": "2024-10-12",
            "end": "2024-10-13"
          },
          {
            "title": "Finados",
            "start": "2024-11-02",
            "end": "2024-11-03"
          },
          {
            "title": "Proclamação da República",
            "start": "2024-11-15",
            "end": "2024-11-16"
          },
          {
            "title": "Natal",
            "start": "2024-12-25",
            "end": "2024-12-26"
          }
    ]
  
const getEvents = async () => {
    try {
        const { content, status } = await request('GET', 'calendar');
        if (status === 200) {
            return eventosCalendar.map(event => ({
                title: event.title,
                end: new Date(event.end),
                start: new Date(event.start),
                backgroundColor:event.color,
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


const initCalendar = async()=>{
    try{
        const events = await getEvents();
        var calendarEl = document.getElementById('calendar');
    
        var calendar = new FullCalendar.Calendar(calendarEl, {
          timeZone: 'UTC',
          initialView: 'multiMonthYear',
        //   editable: true,
          locale: 'pt-br',
          themeSystem: 'bootstrap5',
          
           headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,multiMonthYear'
            },
          events:events,
          dateClick: function(info) {
            dateClicked = info.date;
            const formattedDate = moment(dateClicked).format('YYYY-MM-DD HH:mm:ss');
            console.log('Data clicada:', formattedDate);
            
          }
        });
    
        calendar.render();
    }catch(error){
        console.log(error)
    }
}

const validarHora =(hora) =>{
    const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return horaRegex.test(hora);
}
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
            $('.modal_calendar').modal('hide')
        }catch(error){
            console.log(error)
        }
    })
  
  });