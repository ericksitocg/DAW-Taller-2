agregarfilas = function(n) {
    var i;
    for (i = 0; i < n; i++) {
        let fila = document.createElement('div');
        fila.className = 'row fila';
        fila.id = 'fila' + i;
/*
        let fila_contenido = document.createElement('div');
        fila_contenido.className = 'row fila_contenido';
        fila_contenido.id = 'fila_contenido' + i;
        fila_contenido.innerHTML = 'Lorem ipson';
        */

        document.getElementById('contenedor').appendChild(fila);
        //document.getElementById('contenedor').appendChild(fila_contenido);
    }
};

numeroFilas = function() {
    var contador = 0;
    var filas = 0;

    $.ajax({
        //Ajax es un requerimiento asincrono es decir se ejecuta en un hilo dferente
        //Por eso es necesario cambiarlo porque sino retorna 0 filas
        async: false,
        url: 'datosXML/escritores.xml',
        success: function(respuesta) {

            $(respuesta).find('escritores').each(function() {
                $(this).find('escritor').each(function() {
                    if (contador % 5 == 0 && contador != 0) {
                        filas += 1;
                    }
                    contador += 1;

                })
            })
        }
    })
    return filas;
};


//////////////////////////

agregarfilas(numeroFilas());


/////////////////////////
$(document).ready(function() {

    let n_filas = 0;
    let n_columnas = 0;
    let id_fila = "";

    $.ajax({
        url: 'datosXML/escritores.xml',
        success: function(respuesta) {

            $(respuesta).find('escritores').each(function() {
                $(this).find('escritor').each(function() {

                    let id = $(this).find('id').text();
                    let nombre = $(this).find('nombre').text()
                    /*
                    let columna = $('<div></div>').addClass('col-lg-2 columna');
                    columna.attr('id',id);
                    */
                    let columna = $('<button></button>').addClass('columna btn btn-info');
                    columna.attr('type', 'button');
                    columna.text(nombre);
                    columna.attr('id', id);
                    /*
          
                    columna.attr('data-toggle','collapse');
                    columna.attr('data-target','#fila_contenido' + n_filas);
                    */


                    if (n_columnas % 5 == 0 && n_columnas != 0) {
                        n_filas += 1;
                    }

                    id_fila = '#fila' + n_filas;

                    let fila = $(id_fila);
                    fila.append(columna);

                    n_columnas += 1;

                })

                //Logica de evento click

                $('.columna').click(function() {
                    let id=$(this)[0].id;
                    let fila = $(this)[0].parentNode;
                    let lista_poemas = $('<ol></ol>');
                    lista_poemas.addClass('lista_poemas list-group');

                    $.ajax({
                      url:"datosXML/frases.xml",
                      success : function(respuesta) {
                          $(respuesta).find('frases').each(function () {
                            $(this).find('frase').each(function () {
                                  var id_autor=$(this).find('id_autor').text();
                                  var frase=$(this).find('texto').text();

                                  if(id==id_autor) {
                                    let elemento = $('<li>' + frase+ '</li>')
                                    elemento.addClass('list-group-item');
                                    lista_poemas.append(elemento);
                                  }

                                })

                          })

                          $('.lista_poemas').remove();
                          $(fila).after().append(lista_poemas);

                      }

                    })
                })


                //
            })
        }

    })

})