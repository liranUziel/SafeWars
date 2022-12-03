import { useEffect, useState } from 'react';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillXCircleFill, BsSafe } from 'react-icons/bs';
import { RiSafe2Fill } from 'react-icons/ri';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSafe } from '../../../../features/userSafe/userSafeSlice';

import DeleteSafeDialog from './DeleteSafeDialog';

const Safe = ({ safe: _safe, type }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [safe, setSafe] = useState({});
	const [safeId, setSafeId] = useState('');
	const [name, setName] = useState('');
	const [popupActive, setPopupActive] = useState(false);
	const breakSafe = (e) => {
		console.log(safeId);
		// setSafeId(e.target.id);
	};
	const closeOverlay = (e) => {
		setPopupActive(false);
		// restoreform();
	};
	useEffect(() => {
		setSafe(_safe);
		setName(safe.safeName);
		setSafeId(safe._id);
	}, [_safe]);
	const downloadSafe = async (e) => {
		// const response = await getSafe(user, safe._id);
		// fileDownload(response.data, safe.safeName);
		console.log(`donwload safe`);
	};

	const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

	const handleDeleteSafe = async () => {
		dispatch(deleteSafe({ user, safeId: _safe._id }));
		onCloseAlert();
	};

	return (
		<div
			className={`flex flex-col dark:text-white dark:bg-dark-accenet-900 bg-light-accent-200 p-5 w-fit boder rounded ${
				safe.solved ? 'border-green-600' : 'border-gray-500'
			}`}
			id='safe'
		>
			<div className={`flex justify-end gap-2`} id='header'>
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
			</div>
			<div className={`flex justify-center my-5 items-center relative group`} id='main'>
				{safe.solved ? (
					<RiSafe2Fill className={`text-7xl text-green-600`} />
				) : (
					<BsSafe className={`text-7xl text-white`} />
				)}
				{safe.solved || type === 'private' ? (
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
			</div>
			<div id='footer' className='text-white'>
				<h3 className=''>
					file name: <span className=''>{name}</span>
				</h3>
				<span className=''>date: 15/8/2022 17:11 pm</span>
			</div>

			<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} motionPreset='scale'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className='flex items-center justify-center w-full'>
							<label
								htmlFor='dropzone-file'
								className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
							>
								<div className='flex flex-col items-center justify-center pt-5 pb-6'>
									<svg
										aria-hidden='true'
										className='w-10 h-10 mb-3 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
										></path>
									</svg>
									<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
										<span className='font-semibold'>Click to upload</span> or drag and drop
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>ASM</p>
								</div>
								<input id='dropzone-file' type='file' className='hidden' />
							</label>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='teal' variant='outline' onClick={breakSafe}>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Safe;
