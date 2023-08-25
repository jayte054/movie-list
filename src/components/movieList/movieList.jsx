import { ClipLoader } from "react-spinners";
import MovieItem from "../movieItem/movieItem";

const MovieList = ({movies, isLoading, handleReload}) => {
    
    if (isLoading) {
        return (
            <div className="loader">
                <ClipLoader color="white" loading={isLoading} size={20} /> 
            </div>
        );
    }

    if (!movies) {
        return (
            <p>
                Failed to fetch.{" "}
                <span style={{ cursor: "pointer" }} onClick={handleReload}>
                    Reload
                </span>
            </p>
        );
    }
    return (
        <>
                        {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}

        </>
    )
}

export default MovieList