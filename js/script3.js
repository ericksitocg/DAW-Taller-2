agregarfilas = function(n){
	var i;
	for(i = 0; i<n;i++){
		let fila = document.createElement('div');
		fila.className = 'row';
		fila.id = 'fila' + i;
		fila.innerHTML = 'fila : ' + i;
		document.getElementById('contenedor').appendChild(fila);
	}	
};

numeroFilas = function(){
	var contador = 0;
	var filas = 0;

	$.ajax({
		//Ajax es un requerimiento asincrono es decir se ejecuta en un hilo dferente
		//Por eso es necesario cambiarlo porque sino retorna 0 filas
		async: false,
		url:'datosXML/escritores.xml',
		success:function(respuesta){

			$(respuesta).find('escritores').each(function(){
				$(this).find('escritor').each(function(){
					contador+=1;
					if(contador%5==0){
						filas+=1;
					}
				})
			})
		}
	})
	return filas - 1;
};

let filas = numeroFilas();
agregarfilas(filas);