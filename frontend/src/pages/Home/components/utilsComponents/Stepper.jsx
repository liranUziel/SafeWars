import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Button, Heading } from '@chakra-ui/react';

export const Stepper = ({ steps, currStep }) => {
	const { nextStep, prevStep, reset, setStep } = useSteps({
		initialStep: 0,
	});

	return (
		<Flex flexDir='column' width='100%'>
			<Steps activeStep={currStep}>
				{steps.map(({ label }) => {
					return <Step label={label} key={label}></Step>;
				})}
			</Steps>
			{currStep === steps.length ? (
				<Heading fontSize='xl' textAlign='center' marginTop={2}>
					Woohoo! All steps completed! You may close the window.
				</Heading>
			) : (
				<></>
			)}
		</Flex>
	);
};

export default Stepper;
