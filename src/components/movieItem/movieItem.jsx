const MovieItem = ({ movie }) => {
    return (
        <ul>
            <li>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Title}</p>
            </li>
        </ul>
    );
};

export default MovieItem;