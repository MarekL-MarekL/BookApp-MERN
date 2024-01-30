import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MdTitle } from "react-icons/md";

const DeleteBook = () => {
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((response) => {
				setTitle(response.data.title);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert("An error happened. Please Chack console");
				setLoading(false);
			});
	}, []);

	const handleDeleteBook = () => {
		setLoading(true);
		axios
			.delete(`http://localhost:5555/books/${id}`)
			.then((response) => {
				setLoading(false);
				enqueueSnackbar("Book Deleted successfully", { variant: "success" });
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar("Error", { variant: "error" });
				console.log(error);
			});
	};

	const handleCancel = () => {
		navigate("/");
	};

	return (
		<div className='p-4'>
			<BackButton />
			<h1 className='text-3xl my-4'>Delete book</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
					<div className='space-y-2 p-2'>
						<div className='p-4 space-y-2 text-center dark:text-white'>
							<h2
								className='text-xl font-bold tracking-tight'
								id='page-action.heading'>
								Delete {title}
							</h2>

							<p className='text-gray-500'>
								Are you sure you would like to do this?
							</p>
						</div>
					</div>
					<div className='px-6 py-2'>
						<div className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]'>
							<button
								type='button'
								onClick={handleCancel}
								className='inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800'>
								<span className='flex items-center gap-1'>
									<span className=''>Cancel</span>
								</span>
							</button>

							<button
								onClick={handleDeleteBook}
								type='submit'
								className='inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700'>
								<span className='flex items-center gap-1'>
									<span className=''>Confirm</span>
								</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeleteBook;
