import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSafe } from '../../../features/userSafe/userSafeSlice';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
	useDisclosure,
} from '@chakra-ui/react';
import safesService from '../../../utils/safesService';

import Safe from './utilsComponents/Safe';
import Stepper from './utilsComponents/Stepper';
import DropZone from './utilsComponents/DropZone';

const HomeSafeZone = () => {
	const dispatch = useDispatch();
	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user } = useSelector((state) => state.auth);
	const { safes } = useSelector((state) => state.safe);
	const { classInfo } = useSelector((state) => state.class);
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState(undefined);
	const [newSafes, setNewSafes] = useState([]);

	useEffect(() => {
		dispatch(getSafe(user));
	}, [dispatch, user]);

	const handleDropFile = async (newFile) => {
		setFile(newFile);
	};

	const sendFile = async () => {
		if (file) {
			switch (progress) {
				case 0: // Safe
					const classesId = classInfo.map((currClass) => currClass._id);
					const safesResponse = await safesService.postSafe(user, classesId, file);
					setNewSafes(safesResponse.newSafes);
					break;
				case 1: // Key
					//const isSucce
					const results = await Promise.all(
						await newSafes.map(async (currSafe) => {
							const { isSucceeded } = await safesService.postKey(user, currSafe._id, file);
							return isSucceeded;
						})
					);
					const isErrorAtKey = results.some((result) => !result);
					if (isErrorAtKey) {
						toast({
							title: 'Invalid Key, please try again.',
							status: 'error',
						});
					} else {
						toast({
							title: 'Uploaded successufully.',
							status: 'success',
						});
						dispatch(getSafe(user));
					}
					break;

				default:
					break;
			}
			setProgress(progress + 1);
			setFile(undefined);
		}
	};

	const closeModal = () => {
		setFile(undefined);
		setProgress(0);
		onClose();
		dispatch(getSafe(user));
	};
	return (
		<>
			{safes.length <= 0 ? (
				<div className='flex flex-col items-center justify-center h-full m-10 p-2 gap-2'>
					<div className='container text-center text-black dark:text-white'>
						You don't have a safe, please click on upload safe to uplaod one. you can only have one safe at
						a time.
						<br />
						<button
							onClick={onOpen}
							className='border rounded-md m-5 p-2 text-white dark:bg-dark-accenet-800 bg-light-accent-800'
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
							{progress < 2 && (
								<>
									<ModalBody>
										<DropZone file={file} handleDropFile={handleDropFile} />
									</ModalBody>

									<ModalFooter>
										<Button
											colorScheme='teal'
											variant='outline'
											onClick={sendFile}
											disabled={!file}
										>
											{progress == 0 ? 'Next' : 'Submit'}
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			) : (
				<>
					<div className='flex flex-wrap m-4 gap-4 text-black dark:text-white'>
						{safes.map((currSafe) => {
							return <Safe key={currSafe._id} safe={currSafe} type='private' />;
						})}
					</div>
				</>
			)}
		</>
	);
};

export default HomeSafeZone;
