// import { useContext } from "react"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { ClipLoader } from "react-spinners"; 
// import toastify from "toastify-js"
// import { UserContext } from "../../authentication/usercontext"
// import { search, defaultMovies } from "../../services/omdbService"
// import Footer from "../Footer/footer"
// import Navbar from "../Navbar/navbar"
// import "./moviebody.css"

// const MovieBody = () => {
//     const [movies, setMovies] = useState([])
//     const [searchTerm, setSearchTerm] = useState("")
//     const [isLoading, setIsLoading] = useState(false)
//     const {username} = useContext(UserContext)
//     const navigate = useNavigate()

//     const handleReload = async() => {
//         setSearchTerm("")
//         await fetchAllMovies()
//     }

//     const handleSearch = async() => {
//         try{
//          setIsLoading(true)       
//         const response = await search(searchTerm)
//         setMovies(response)
//             setTimeout(() => {
//                 setIsLoading(false)
//             }, 2000)
                   
//         }catch(error){
//             console.error("error fetching movie", error)
//             await fetchAllMovies()
//         }
//     }

//     const fetchAllMovies = async () => {
//         setIsLoading(true)
//         const response = await defaultMovies()
//         setMovies(response) 
//         setTimeout(() => {
//             setIsLoading(false)
//         }, 2000)      
//       };

//     useEffect(() => {
//         fetchAllMovies()
//     },[])

//     const refresh = () => {
//         fetchAllMovies()
//         setSearchTerm("")
//         navigate("/body")
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="movie-container">
//                 <div className="movie-title">
//                 <span className="movie-title-header" onClick={refresh}> My Movies</span>  
//                 <span> Welcome {username}! </span> 
//                 </div>
//                 <div>
//                 <span>Search</span>  
//                 <input type="text"
//                        placeholder="search for movies"
//                        value={searchTerm}
//                        onChange={(e) => setSearchTerm(e.target.value)} 
//                 />
//                 <button type="submit" style={{cursor:"pointer"}} onClick={handleSearch}>Submit</button> 
//                 </div>      
//             </div>
//             <div className="movie-list-container">
//                    { isLoading &&
//                     <div className="loader" >
//                         <ClipLoader color="white" 
//                                     loading={isLoading} 
//                                     size={20} /> 
//                     </div>
                     
//                    } 
//                    { !isLoading &&
//                    <>
//                    { (movies && movies?.map((movie) => (
//                             <ul key={movie.imdbID}>
//                                 <li>
//                                     <img src={movie.Poster} alt="movie.Title" />
//                                     <p>{movie.Title}</p>
//                                 </li>
//                             </ul>
//                         )
//                     ))}
//                     {
//                         !movies && <p>failed to fetch <span style={{cursor:"pointer"}} 
//                                                             onClick={() => handleReload()}>
//                                                                 Reload
//                                                       </span> 
//                                     </p>
//                     }
//                 </> }                        
//                 </div> 
//                 <Footer />
//         </>
//     )

// }

// export default MovieBody

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../authentication/usercontext";
import { search, defaultMovies } from "../../services/omdbService";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";
import MovieList from "../movieList/movieList";
import "./moviebody.css";

const MovieBody = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { username } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const response = await search(searchTerm);
            setMovies(response);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error("error fetching movie", error);
            await fetchAllMovies();
        }
    };

    const fetchAllMovies = async () => {
        setIsLoading(true);
        const response = await defaultMovies();
        setMovies(response);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        fetchAllMovies();
    }, []);

    const refresh = () => {
        fetchAllMovies();
        setSearchTerm("");
        navigate("/body");
    };

    const handleReload = async () => {
        setSearchTerm("");
        await fetchAllMovies();
    };

    return (
        <>
            <Navbar />
            <div className="movie-container">
                <div className="movie-title">
                    <span className="movie-title-header" onClick={refresh}> My Movies</span>  
                    <span> Welcome {username}! </span> 
                </div>
                <div>
                    <span>Search</span>  
                    <input
                        type="text"
                        placeholder="search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button
                        type="submit"
                        style={{ cursor: "pointer" }}
                        onClick={handleSearch}
                    >
                        Submit
                    </button> 
                </div>      
            </div>
            <div className="movie-list-container">
                <MovieList movies={movies} isLoading={isLoading} handleReload={handleReload} />
            </div> 
            <Footer />
        </>
    );
};

export default MovieBody;
