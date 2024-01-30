import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
	const [book, setBook] = useState({});
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((response) => {
				setBook(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<div className='p-4'>
			<BackButton />
			<h1 className='text-3xl my-4'>Show book</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>I:</span>
						<span className='text-base mr-4 text-gray-500'>{book._id}</span>
					</div>

					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>Title:</span>
						<span className='text-base mr-4 text-gray-500'>{book.title}</span>
					</div>
					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>Author:</span>
						<span className='text-base mr-4 text-gray-500'>{book.author}</span>
					</div>
					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>Publish Year:</span>
						<span className='text-base mr-4 text-gray-500'>
							{book.publishYear}
						</span>
					</div>
					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>Create Time:</span>
						<span className='text-base mr-4 text-gray-500'>
							{new Date(book.createdAt).toLocaleDateString()}
						</span>
					</div>
					<div className='my-4'>
						<span className='text-base mr-4 text-gray-500'>
							Last Update Time:
						</span>
						<span className='text-base mr-4 text-gray-500'>
							{new Date(book.updatedAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowBook;
