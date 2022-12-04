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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSafe } from '../../../../features/userSafe/userSafeSlice';

const BreakSafeModal = ({ file, setFile, isOpen, onClose, breakSafe }) => {
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
					<Button colorScheme='teal' variant='outline' onClick={breakSafe}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default BreakSafeModal;
