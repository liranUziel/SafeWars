import { Button, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';
import { useState } from 'react';

const AddStudentForm = ({ addStudent }) => {
	const [studentUserName, setStudentUserName] = useState('');

	const onCreateTournamnet = async (e) => {
		e.preventDefault();
		addStudent(studentUserName);
	};

	return (
		<form className='m-1 p-2 flex flex-col justify-center items-center' onSubmit={onCreateTournamnet}>
			<FormControl>
				<FormLabel>Student's User Name</FormLabel>
				<Input
					type='text'
					onChange={(e) => {
						setStudentUserName(e.target.value);
					}}
				/>
			</FormControl>
			<Button type='submit'>Add Student</Button>
		</form>
	);
};

export default AddStudentForm;
