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

    const [bookName, setBookName] = useState('')

    useEffect(() => {
        dispatch(getFilteredBooks({ sort, genre: selectedGenre, author: selectedAuthor, publisher: selectedPublisher, title: bookName })
        );
    }, [sort, selectedGenre, selectedAuthor, selectedPublisher, bookName])

    return (
        <div>
        <div className="grid grid-cols-[25%_25%_25%_25%]">
            <div className="mt-5 mx-auto">
                <select className='rounded-3xl h-9' onChange={(e) => setGenre(e.target.value)}>
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
                <select className='rounded-3xl h-9' onChange={(e) => setPublisher(e.target.value)}>
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
                <select className='rounded-3xl h-9' onChange={(e) => setAuthor(e.target.value)}>
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
                <select className='rounded-3xl h-9' onChange={(e) => setSort({ field: 'title', direction: e.target.value })}>
                    <option hidden value=''>Title</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                </select>
                <div className="flex justify-center mt-2">
                    <p className="text-center mr-0.5 border border-solid border-black-500 bg-white rounded-xl">{sort.direction}</p>
                    {sort.direction ? <button className="w-5 h-5" onClick={() => setSort('')}>❌ </button> : ''}
                </div>
            </div>


        </div>

<div className="grid place-content-center">
<input className="rounded-3xl h-9 mt-9 " type="text" placeholder="Search by name...    🔍︎" value={bookName} onChange={(e) => setBookName(e.target.value)}></input>
</div>
</div>

    )
}

export default Filters;