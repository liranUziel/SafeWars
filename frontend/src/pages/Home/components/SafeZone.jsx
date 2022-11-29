// import '../../styles/SafeZone.css';
import Stepper from './utilsComponents/Stepper';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSafe, getSafe } from '../../../features/userSafe/userSafeSlice';
import safesService from '../../../utils/userSafe';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import Safe from './utilsComponents/Safe';
import { toast } from 'react-toastify';
// import asmLogo from '../../assets/Images/asm.svg';
import React from 'react';
import { Button } from '@chakra-ui/react';
// import DropZone from "./utilsComponents/DropZone";

const HomeSafeZone = () => {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	//   const [popupActive, setPopupActive] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { safeInfo } = useSelector((state) => state.safe);
	const [progress, setProgress] = useState(0);
	//   const [uploadingStatus, setUploadingStatus] = useState("idel");
	const [safe, setSafe] = useState({});
	const [file, setFile] = useState(undefined);

	useEffect(() => {
		dispatch(getSafe(user));
	}, [dispatch, user]);

	useEffect(() => {
		//TODO:If fail handle
		console.log('HERE');
		console.log(safeInfo);
		setSafe({ ...safeInfo, solved: false });
	}, [safeInfo]);

	const sendFile = () => {
		console.log(file);
		if (file) {
			switch (progress) {
				case 0: // Safe
					dispatch(safesService.postSafe(user, [], file));
					break;
				case 1: // Key
					//safesService.postKey(user, safeInfo._id, file);
					break;

				default:
					break;
			}
			setProgress(progress + 1);
			setFile(undefined);
		}
	};

	const reuploadSafe = (e) => {
		toast.warn('Warrning reuploading safe will remove the old one', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		e.preventDefault();
		setSafe({});
		dispatch(removeSafe());
		openPopup(e);
	};

	const closeModal = () => {
		setFile(undefined);
		setProgress(0);
		onClose();
	};
	return (
		<>
			{safeInfo.safeName === undefined ? (
				<div className='flex flex-col items-center justify-center h-full w-full m-10 p-2 gap-2'>
					<div className='container text-center text-black dark:text-white'>
						You don't have a safe, please click on upload safe to uplaod one. you can only have one safe at
						a time.
						<br />
						<button
							onClick={onOpen}
							className='border border-black rounded-md m-5 p-2 text-black dark:text-white'
						>
							upload safe
						</button>
					</div>
					<Modal isOpen={isOpen} onClose={closeModal} closeOnOverlayClick={false} motionPreset='scale'>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>
								<Stepper
									steps={[{ label: 'Upload Safe' }, { label: 'Upload Key' }]}
									currStep={progress}
								/>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<div className='dropZone'>
									<DropZone file={file} setFile={setFile} />
								</div>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='teal' variant='outline' onClick={sendFile} disabled={!file}>
									{progress == 0 ? 'Next' : 'Submit'}
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
			) : (
				<>
					<div className='user_safe_container text-black dark:text-white'>
						<Safe safe={safe} action={reuploadSafe} type='private' />
					</div>
				</>
			)}
		</>
	);
};

const DropZone = ({ file, setFile }) => {
	const handleFileChanged = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<div class='flex items-center justify-center w-full'>
			<label
				htmlFor='dropzone-file'
				class='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
			>
				<div class='flex flex-col items-center justify-center '>
					<svg
						aria-hidden='true'
						class='w-10 h-10 mb-3 text-gray-400'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
						></path>
					</svg>
					<p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
						{file ? (
							file['name']
						) : (
							<>
								<span class='font-semibold'>Click to upload</span> or drag and drop
							</>
						)}
					</p>
					<p class='text-xs text-gray-500 dark:text-gray-400'>ASM</p>
				</div>
				<span id='inputContainer'>
					<input id='dropzone-file' type='file' accept='.asm' hidden onChange={handleFileChanged} />
				</span>
			</label>
		</div>
	);
};

export default HomeSafeZone;
