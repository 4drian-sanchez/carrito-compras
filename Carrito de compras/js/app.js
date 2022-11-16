/* Registramos las variables cuando carge todo el DOM */
document.addEventListener( 'DOMContentLoaded', () => {
    
    const d = document;
    const listaCursos = d.querySelector('#lista-cursos') ;
    const kart = d.querySelector('#lista-carrito tbody');
    const vaciarKart = d.querySelector('#vaciar-carrito');
    let carritoArr = JSON.parse(localStorage.getItem('curso')) ?? [];
    if(carritoArr !== []) mostrarHTML();
    
    runEvents();
    function runEvents() {
        listaCursos.addEventListener('click', obtenerCurso);
        kart.addEventListener('click', eliminarCurso);
        vaciarKart.addEventListener('click', () => {
            carritoArr = [];
            cleanHTML(kart);
            storage();
            mostrarHTML();
        })
    }

    function obtenerCurso(e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            const curso = e.target.parentElement.parentElement;
            agregarCurso(curso);
        };
    };

    function agregarCurso(curso) {
        
        const info = {
            titulo: curso.querySelector('H4').textContent,
            imagen: curso.querySelector('.imagen-curso').src,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('.agregar-carrito').dataset.id,
            cantidad: 1
        }

        const existe = carritoArr.some( curso => curso.id === info.id);
        if(existe) {
            const carritoArrMap = carritoArr.map( curso => {
                if(curso.id === info.id){ 
                    curso.cantidad++;
                }
                return curso;
            }); 
            carritoArr = [...carritoArrMap];
        }else {
            carritoArr = [...carritoArr, info];
        }
        mostrarHTML();
        storage();
    };

    function mostrarHTML() {
        
        cleanHTML(kart);
        carritoArr.forEach((curso => {
            
            const {titulo, imagen, precio, cantidad, id} = curso;
            const row = d.createElement('TR');
            row.innerHTML = `
                <td><img class="imagen-kart" src="${imagen}"></td>
                <td><p>${titulo}</p></td>
                <td><p>${precio}</p></td>
                <td><p>${cantidad}</p></td>
                <td><a class="borrar-curso" data-id="${id}" >X</a></td>
            `;

            kart.appendChild(row);
        }))

    }

    function cleanHTML(ref) {
        while(ref.firstChild) {
            ref.removeChild(ref.firstChild);
        }
    }
    
    function eliminarCurso(e) {
        if(e.target.classList.contains('borrar-curso')) {
            const cursoId = e.target.dataset.id;
            carritoArr = carritoArr.filter(curso => curso.id !== cursoId);
            mostrarHTML();
            storage();
        }
    }

    function storage() {
        localStorage.setItem('curso', JSON.stringify(carritoArr));
    };

}); //DOMContentLouder