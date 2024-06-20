 
 var startIndex = 0;
 var maxResults = 12;
 var totalItems = 0;

function fetchBooks() {
    var endpoint = `https://www.googleapis.com/books/v1/volumes?q=javascript&startIndex=${startIndex}&maxResults=${maxResults}`;
        
    $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(data) {
            totalItems = data.totalItems;
            updatePaginationButtons();
            listAllBooks(data.items);
        },
          error: function(xhr, status, error) {
            messagesHandler.messageError(error);
          }
    });
}


function listAllBooks(books) {
    var ctx = '.all_books';
    $(ctx).empty();

    books.forEach(book=> {
      var model = $('.model_book').clone().removeClass('d-none').attr('id',book.id )[0];
      $(model).find('#book_banner').attr('src', book.volumeInfo.imageLinks.thumbnail);
      $(model).find('#book_title').text(book.volumeInfo.title);
      $(ctx).append(model);
    });
  }

  const listAllBorrowedBooks = async (books) => {
    var ctx = '.all_borrowed_books';
    var ctxReturned = '.all_returned_books';
  
    $(ctx).empty();
    $(ctxReturned).empty();
  
    try {
      for (const book of books) {
        const singleBook = await fetchBookById(book.book); 
      
        if (singleBook) {
          var model = $('.model_borrowed_books').clone().removeClass('d-none').attr('id', book.book).attr('returned', book._id)[0];
          $(model).find('#book_banner').attr('src', singleBook.volumeInfo.imageLinks.thumbnail);
          $(ctx).append(model);

          if(book.returned){
            $(ctxReturned) ? $(ctxReturned).append(model) : null
          }
        }
      }
    } catch (error) {
      messagesHandler.messageError(error);
    }
  };
  

  function fetchBookById(bookId) {
    return new Promise((resolve, reject) => {
      var endpoint = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  
      $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(data) {
          resolve(data); // Resolve a Promise com os dados do livro
        },
        error: function(xhr, status, error) {
          reject(error); // Rejeita a Promise em caso de erro
        }
      });
    });
  }
  

function listSingleBook(content, returned = false) {
  let ctx
  if(!returned){
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7); 
    
     ctx = '.modal_book'
    $(ctx).find('.book_title').text( content.volumeInfo.title)  
    $(ctx).find('.book_banner').attr('src' , content.volumeInfo.imageLinks.thumbnail)  
    $(ctx).find('.book_desacription').text(content.volumeInfo.description)  
    $(ctx).find('.save').attr('id' , content.id)  
    $(ctx).find('#expiration_date').text(formatDate(expiration))
    $(ctx).find('#language').text(content.volumeInfo.language)
    $(ctx).find('#page_quant').text(content.volumeInfo.pageCount)
  }else{
    ctx = '.modal_return'
    $(ctx).find('.book_title').text( content.volumeInfo.title)  
    $(ctx).find('.book_banner').attr('src' , content.volumeInfo.imageLinks.thumbnail)  

  }

    $(ctx).modal('show')
  }

function updatePaginationButtons() {
    $('#prevBtn').prop('disabled', startIndex === 0);
    $('#nextBtn').prop('disabled', startIndex + maxResults >= totalItems);
}

const init = async()=>{
    try{

    await fetchBooks();
    await list('books', listAllBorrowedBooks)
    
    }catch(error){
      messagesHandler.messageError(error);
    }
}
init()
$(document).ready(function() {
    $('#prevBtn').on('click', function() {
      if (startIndex - maxResults >= 0) {
        startIndex -= maxResults;
        fetchBooks();
      }
    });
  
    // Evento de clique no botão Próximo
    $('#nextBtn').on('click', function() {
      if (startIndex + maxResults < totalItems) {
        startIndex += maxResults;
        fetchBooks();
      }
    });
    
    $('body').on('click', '.model_book', async(e) =>{
        const id = $(e.currentTarget).attr('id')
        const data = await fetchBookById(id)
        listSingleBook(data);
    });

    $('.modal_book ').on('click', '.save', async(e) =>{
      try{
        if(!confirm('Deseja pegar o livro empretado? Terá apenas 7 dias para devolve-lo')){
          return
        }
        const id = $(e.currentTarget).attr('id')
        const { content, status } = await request('POST', `books`, {id});
        if(status != 200){
          messagesHandler.messageError(content)
          return
        }
        $('.modal').modal('hide')
        await init()
      }catch(error){
        messagesHandler.messageError(error);
      }
    });

    $('body').on('click', '.model_borrowed_books ', async(e) =>{
      const id = $(e.currentTarget).attr('id')
      const returnedId = $(e.currentTarget).attr('returned')
      $('.modal_return').find('.return').attr('returned', returnedId)
      const data = await fetchBookById(id)
      
      listSingleBook(data, true);
  });
  $('.modal_return').on('click', '.return ', async(e) =>{
      const id = $(e.currentTarget).attr('returned')
      const { content, status } = await request('PUT', `books`, {id});
      if(status != 200){
        messagesHandler.messageError(content)
        return
      }
      $('.modal_return').modal('hide')
      messagesHandler.newMessage(content);
      await init()
  });
  });
  