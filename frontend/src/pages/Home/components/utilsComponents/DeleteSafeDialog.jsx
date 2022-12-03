import {
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from '@chakra-ui/react';
import { useRef } from 'react';

const DeleteSafeDialog = ({ deleteSafe, isOpen, onClose }) => {
	const cancelRef = useRef();

	return (
		<>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Safe
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={deleteSafe} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DeleteSafeDialog;
