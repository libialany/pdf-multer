$(document).ready(function(){
    $.getJSON( "http://localhost:3000/listar", function( data ) {
       //nsole.log(data);
        $('#data-table').DataTable({
           "data" : data,
           columns : [
            {"data" : "title"},
            {"data" : "description"},
            {"data" : "id" , render : function ( data, type, row, meta ) {
              console.log(row.path);
              return type === 'display'  ?
                  '<div class=""> <a href="/download/'+ data +'" class="btn btn-primary">download</a> <a href="'+ row.path +'" class="btn btn-primary">view</a> <a href="/delete/'+ data +'" class="btn btn-primary">delete</a> </div>'  :
                  data;
              }}
           ]
      });
      });
  });