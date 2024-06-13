
import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";

const MoviePage = ({success, error, movie}) => {

    const router = useRouter();
   
    if (!success){
        return (
            
            <div className="container text-center my-5">

            <h1>{error} 🤦‍♂️</h1>
           
            <Link href="/">
              <div className="btn btn-success">Volver</div>
            </Link>


            </div>
        )
    }

    const deleteData = async(id) => {
      try {
        await fetch(`/api/movie/${id}`, {
          method: 'DELETE'
        });
        router.push('/')

      } catch (error) {
        
      }
    }





  return (
    <div className="container">
        <h1 className="text-center bg-dark text-light">Detalle de Movie 🎥</h1>
      
        <div className="card-title border p-2 text-center">
            <h5 className="text-uppercase">{movie.title}</h5>

            <p className="fw-light">{movie.plot}</p>

            {/* Botón para volver al inicio */}
            <Link href="/">
            <div className="btn btn-success btn-sm me-2">Volver...</div>            
            </Link>

            {/* Botón para editar la peli */}
            <Link href={`/${movie._id}/edit`}>
                <div className="btn btn-warning btn-sm me-2">Editar</div>
            </Link>


            {/* Botón para eliminar la peli */}
            <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>Eliminar</button>




        </div>

    </div>
  )
}

export default MoviePage;


export async function getServerSideProps({params}){
    try {
        await conectarDB();
  
      
        const movie = await Movie.findById(params.id).lean();

        if (!movie){
            return { props: { success: false, error: 'PELÍCULA NO ENCONTRADA!!!'}  };
 
        }


  
        console.log(movie);

        movie._id = `${movie._id}`;

        return {  props: { success: true, movie}  };

    } catch (error) {

      console.log(error);

      if (error.kind === 'ObjectId'){
        return { props: { success: false, error: 'ID no válido'}  };
 
      }
      else {
        return { props: { success: false, error: 'Error del Servidor'}  };
      }
     
    }
  } 