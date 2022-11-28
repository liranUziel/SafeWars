import { Modal, ModalOverlay, ModalContent, Spinner as ChakraSpinner } from '@chakra-ui/react';
const Spinner = () => {
	return (
		<>
			<Modal isOpen={true} size='full'>
				<ModalOverlay />
				<ChakraSpinner />
				<ModalContent boxSize='fit-content' bg='transparent' shadow='none' placeContent='center'>
					<ChakraSpinner size='xl' />
				</ModalContent>
			</Modal>
		</>
	);
};

export default Spinner;
