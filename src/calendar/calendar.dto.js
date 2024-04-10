class CalendarDTO {
    constructor(id, event , start, end, type) {
        this.id = id; 
        this.event = event;
        this.start = start;
        this.end = end;
        this.type = type;
    }

    static get eventTypes() {
        return ['test', 'activity', 'work', 'end_semester', 'start_semester' , 'holiday'];
    }
}

module.exports = CalendarDTO;
