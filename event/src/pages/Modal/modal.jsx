import React from 'react'
import "modal.css"

const modal = (props) => { 
    return ( 
    <>

    <div className='modal-overlay' onClick={props.fecharModal}></div>
    <div className='Modal'>
        <h1>{props.titulo}</h1>
        <div className='modal_conteudo'>
        {props.tipoModel === "descricaoEvento" ? (
            <p>{props.tipoModel}</p>
        ) : (
            <>
            {comentarios.map((item) => (
                <div key={item.idComentarioEvento}>
                    <strong>{item.usuario.nomeUsuario}
                    </strong>
                    <img src= {ImgDeletar} alt="Deletar" />
                    <p>{item.descricao}</p>
                    <hr/>
                </div>
            ))}
            <div>
                <input type="text" 
                placeholder='Escreva seu comentario...'
                />

                <button>
                    Cadastrar
                </button>
            </div>

            </>
        )}

        </div>
    </div>

</>
  
  )
}

export default modal
