class BookDTO {
    constructor(id, book , student, date_expiration, returned) {
        this.id = id; 
        this.book = book;
        this.student = student;
        this.date_expiratrion = date_expiration;
        this.returned  = returned;
    }
  
}

module.exports = BookDTO;
