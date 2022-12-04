import { BsFillArrowDownCircleFill, BsFillXCircleFill, BsSafe } from 'react-icons/bs';
import { RiSafe2Fill } from 'react-icons/ri';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSafe, getSafe } from '../../../../features/userSafe/userSafeSlice';

import DeleteSafeDialog from './DeleteSafeDialog';
import safesService from '../../../../features/safe/safeService';
import fileDownload from 'js-file-download';
import BreakSafeModal from './BreakSafeModal';
import { useState } from 'react';

const Safe = ({ safe, type }) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const { user } = useSelector((state) => state.auth);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

	const [file, setFile] = useState(undefined);

	const breakSafe = async () => {
		const { isSucceeded } = await safesService.postKey(user, safe._id, file);
		if (!isSucceeded) {
			toast({
				status: 'error',
				title: "Didn't broke safe!",
			});
		} else {
			toast({
				status: 'success',
				title: 'Broke Safe!',
			});
			dispatch(getSafe(user));
		}
	};

	const downloadSafe = async () => {
		const response = await safesService.downloadSafe(user, safe._id);
		fileDownload(response.data, safe.safeName);
	};

	const handleDeleteSafe = async () => {
		dispatch(deleteSafe({ user, safeId: safe._id }));
		onCloseAlert();
	};

	return (
		<div
			className={`flex flex-col dark:text-white dark:bg-dark-accenet-900 bg-light-accent-200 p-4 w-44 boder rounded ${
				safe.solved ? 'border-green-600' : 'border-gray-500'
			}`}
			id='safe'
		>
			{/* Header where the icons */}
			<header className={`flex justify-end gap-2`} id='header'>
				<BsFillArrowDownCircleFill
					onClick={downloadSafe}
					className={` ${
						safe.solved ? 'text-gray-600' : 'hover:text-light-accent-100 text-white cursor-pointer'
					}`}
				/>
				{type === 'private' ? (
					<>
						<BsFillXCircleFill onClick={onOpenAlert} className={`hover:text-green-600 cursor-pointer`} />
						<DeleteSafeDialog deleteSafe={handleDeleteSafe} isOpen={isOpenAlert} onClose={onCloseAlert} />
					</>
				) : (
					<></>
				)}
			</header>
			{/* Content */}
			<main className={`flex justify-center my-5 items-center relative group`} id='main'>
				{/* Which icon to show */}
				{safe.solved ? (
					<RiSafe2Fill className={`text-7xl text-green-600`} />
				) : (
					<BsSafe className={`text-7xl text-white`} />
				)}
				{/* Break button */}
				{safe.solved || (type === 'private' && safe.isVerified) ? (
					<></>
				) : (
					<button
						className='z-10 text-xl font-semibold p-2 bg-green-500 rounded w-fit h-9 absolute hidden group-hover:block'
						id={safe._id}
						onClick={onOpen}
					>
						BREAK
					</button>
				)}
			</main>
			{/* Footer of safe Plain Data */}
			<footer id='footer' className='text-white'>
				<h3 className=''>
					Safe Name: <span className=''>{safe.safeName}</span>
				</h3>
				<span className=''>{new Date(safe.updatedAt).toDateString()}</span>
				{!safe.isVerified && (
					<>
						<br />
						<span className='text-red-600'>Not Verified! Break safe to verify.</span>
					</>
				)}
			</footer>

			<BreakSafeModal file={file} setFile={setFile} isOpen={isOpen} onClose={onClose} breakSafe={breakSafe} />
		</div>
	);
};

export default Safe;
