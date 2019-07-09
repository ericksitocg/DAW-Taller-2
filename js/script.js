$(document).ready(function () {

  var L_columnas = []
  var fila = ""
  var n_fila = 0;

  $.ajax({
    url: 'datosXML/escritores.xml',
    success: function (respuesta) {

      $(respuesta).find('escritores').each(function () {
        $(this).find('escritor').each(function () {

          let id = $(this).find('id').text()
          let nombre = $(this).find('nombre').text()
          let columna = $('<label></label>').addClass(`col-lg-1`);
          columna.attr('id', id);
          columna.text(nombre);

          L_columnas.push(columna);
          n_fila += 1;

          if (n_fila % 5 === 0) {
            fila = $('<div></div>').addClass('row');
            fila.attr('id', n_fila);
            L_columnas.map(columna => {
              fila.append(columna);
            })

            $('#ajax-req').append(fila);            

            L_columnas = []
          }

        })


        $('label').click(function () {
          
          id_lbl = $(this)[0].id
          fila = $(this)[0].parentNode
          var L_frases = []
          var string = ''

          $.ajax({
            url: "datosXML/frases.xml",
            success: function (respuesta) {


              $(respuesta).find('frases').each(function () {

                $(this).find('frase').each(function () {

                  var id_autor = $(this).find('id_autor').text();
                  var frase = $(this).find('texto').text();

                  if (id_autor === id_lbl) {

                    L_frases.push(frase + '\n')
                    
                    string += frase + '\n';

                  }
                })
              })

              for(var i=0;i<L_frases.length;i++){
                console.log(L_frases[i]);
                var p=document.createElement('p');
                var nodo=document.createTextNode(L_frases[i]);
                p.appendChild(nodo);
                var lbl_autor=document.getElementById(id_lbl);
                lbl_autor.appendChild(p);

                }
            }
          })
        })
      })
    }

    
  })
})