import DropZone from './DropZone';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

const BreakSafeModal = ({ file, setFile, isOpen, onClose, breakSafe, isLoadingKey }) => {
	const handleDropFile = async (newFile) => {
		setFile(newFile);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} motionPreset='scale'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader></ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<DropZone file={file} handleDropFile={handleDropFile} />
				</ModalBody>
				<ModalFooter>
					{isLoadingKey && <span className='m-2'>Loading... Please Wait and don't close the window.</span>}
					<Button colorScheme='teal' variant='outline' onClick={breakSafe} isDisabled={isLoadingKey}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default BreakSafeModal;
