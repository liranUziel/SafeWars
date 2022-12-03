import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Button, Heading } from '@chakra-ui/react';

export const Horizontal = ({ steps, currStep }) => {
	const { nextStep, prevStep, reset, setStep } = useSteps({
		initialStep: 0,
	});

	return (
		<Flex flexDir='column' width='100%'>
			<Steps activeStep={currStep}>
				{steps.map(({ label }) => {
					return (
						<Step label={label} key={label}>
							A
						</Step>
					);
				})}
			</Steps>
			{currStep === steps.length ? (
				<Heading fontSize='xl' textAlign='center' marginTop={2}>
					Woohoo! All steps completed! You may close the window.
				</Heading>
			) : (
				// <Flex px={4} py={4} width='100%' flexDirection='column'>
				// 	<Heading fontSize='xl' textAlign='center'>
				// 		Woohoo! All steps completed!
				// 	</Heading>
				// 	<Button mx='auto' mt={6} size='sm' onClick={reset}>
				// 		Reset
				// 	</Button>
				// </Flex>
				<></>
				// <Flex width='100%' justify='flex-end'>
				// 	<Button isDisabled={currStep === 0} mr={4} onClick={prevStep} size='sm' variant='ghost'>
				// 		Prev
				// 	</Button>
				// 	<Button size='sm' onClick={nextStep}>
				// 		{currStep === steps.length - 1 ? 'Finish' : 'Next'}
				// 	</Button>
				// </Flex>
			)}
		</Flex>
	);
};

export default Horizontal;
