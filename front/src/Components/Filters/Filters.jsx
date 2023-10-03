import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredBooks } from "../../redux/actions";

const Filters = () => {

    const dispatch = useDispatch()

    const { genres, authors, publishers } = useSelector((state) => state)

    const [selectedGenre, setGenre] = useState('')

    const [selectedAuthor, setAuthor] = useState('')

    const [selectedPublisher, setPublisher] = useState('')

    const [sort, setSort] = useState('')

    useEffect(() => { 
        dispatch(getFilteredBooks({sort, genre: selectedGenre})
        );
    }, [selectedGenre, sort])

    return (
        <div className="grid grid-cols-[25%_25%_25%_25%]">
            <div className="mt-5 mx-auto">
                <select onChange={(e) => setGenre(e.target.value)}>
                    <option hidden value=''>Genre</option>
                    {genres.map((genre) => {
                        return (
                            <option>{genre}</option>
                        )
                    })}
                </select>
                <div className="flex justify-center mt-2">
                    <p className="text-center mr-0.5 border border-solid border-black-500 bg-white rounded-xl">{selectedGenre}</p>
                    {selectedGenre ? <button className="w-5 h-5" onClick={() => setGenre('')}>❌ </button> : ''}
                </div>
            </div>

            <div className="mt-5 mx-auto">
                <select onChange={(e) => setPublisher(e.target.value)}>
                    <option hidden value=''>Publisher</option>
                    {publishers.map((publisher) => {
                        return (
                            <option>{publisher}</option>
                        )
                    })}
                </select>
                <div className="flex justify-center mt-2 ">
                    <p className="text-center mr-0.5 border border-solid border-black-500 bg-white rounded-xl">{selectedPublisher}</p>
                    {selectedPublisher ? <button className="w-5 h-5" onClick={() => setPublisher('')}>❌ </button> : ''}
                </div>
            </div>

            <div className="mt-5 mx-auto">
                <select onChange={(e) => setAuthor(e.target.value)}>
                    <option hidden value=''>Author</option>
                    {authors.map((author) => {
                        return (
                            <option>{author}</option>
                        )
                    })}
                </select>
                <div className="flex justify-center mt-2">
                    <p className="text-center mr-0.5 border border-solid border-black-500 bg-white rounded-xl">{selectedAuthor}</p>
                    {selectedAuthor ? <button className="w-5 h-5" onClick={() => setAuthor('')}>❌ </button> : ''}
                </div>
            </div>

            <div className="mt-5 mx-auto">
                <select onChange={(e) => setSort(e.target.value)}>
                    <option hidden value=''>Date</option>
                    <option value="ASC">Most recent</option>
                    <option value="DESC">Older</option>
                </select>
                <div className="flex justify-center mt-2">
                    <p className="text-center mr-0.5 border border-solid border-black-500 bg-white rounded-xl">{sort && sort === 'ASC' ? 'Most Recent' : sort && 'Older'}</p>
                    {sort ? <button className="w-5 h-5" onClick={() => setSort('')}>❌ </button> : ''}
                </div>
            </div>


        </div>
    )
}

export default Filters;