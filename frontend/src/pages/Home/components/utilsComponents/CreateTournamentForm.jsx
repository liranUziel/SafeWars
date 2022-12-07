import { Button, Checkbox, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { useState } from 'react';

const CreateTournamentForm = ({ createTournamnet }) => {
	const [deadline, setDeadline] = useState(undefined);
	const [showScore, setShowScore] = useState(false);

	const onCreateTournamnet = async (e) => {
		e.preventDefault();
		createTournamnet(deadline, showScore);
	};

	return (
		<form className='m-1 p-2 flex flex-col justify-center items-center' onSubmit={onCreateTournamnet}>
			<h2 className=''>Craete Tournament Form</h2>
			<FormControl>
				<FormLabel>Deadline</FormLabel>
				<Input
					type='datetime-local'
					onChange={(e) => {
						setDeadline(e.target.value);
					}}
				/>
				<FormLabel>Show score board for students?</FormLabel>
				<Switch
					onChange={(e) => {
						setShowScore(e.target.checked);
					}}
				/>
			</FormControl>
			<Button type='submit'>Create Tournament</Button>
		</form>
	);
};

export default CreateTournamentForm;
