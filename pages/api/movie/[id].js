import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";


export default async function handler(req, res) {
 
  
  await conectarDB();
  

    // GET api/movie/:id (obtener un id y listarlo - agregar un documento)
    // DELETE api/movie/:id (elimina un documento con id )
    // PUT api/movie/:id (modifica un documento con id  )
    

  const {method, query: {id}, } = req;

  switch(method) {

    case 'PUT':
      try{

       const movie = await Movie.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
       );

       if(!movie) {
            return res.status(404).json({success: false });
       }

       return res.json({success: true, data: movie});

      }catch (error) {
        return res.status(404).json({success: false, error });
        }




    case 'DELETE':
      try{

       const movie = await Movie.findByIdAndDelete(id)

       if(!movie) {
            return res.status(404).json({success: false });
       }

       return res.json({success: true, data: movie});

      }catch (error) {
        return res.status(404).json({success: false });
        }


    case 'GET':
      try{

       const movie = await Movie.findById(id).lean(); // Poner .lean() aliviana muchísimo la carga, es una re buena práctica

       if(!movie) {
            return res.status(404).json({success: false });
       }

       return res.json({success: true, data: movie});

      }catch (error) {
        return res.status(404).json({success: false });
        }
     
    
    default :
      return res
        .status(500)
        .json({success: false, error: 'Falla de servidor'});
  }

}