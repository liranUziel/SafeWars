import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classService from '../../../../features/class/classService';

const StudentsList = ({ students }) => {
	const { user } = useSelector((state) => state.auth);

	if (students.length <= 0) {
		return <div className='text-center font-bold'>There are no any students in this class.</div>;
	}
	return (
		<>
			<TableContainer m='5'>
				<Table size='sm'>
					<Thead>
						<Tr>
							<Th isNumeric>#</Th>
							<Th>Id</Th>
							<Th>Name</Th>
							<Th>Submited</Th>
							<Th>Safe Verified</Th>
							<Th isNumeric>Score</Th>
						</Tr>
					</Thead>
					<Tbody>
						{students.map((currStudent, index) => {
							return (
								<Tr key={currStudent.id}>
									<Td>{index}</Td>
									<Td>{currStudent.userId}</Td>
									<Td>{currStudent.realName}</Td>
									<Td>{currStudent.hasSubmitedSafe ? 'V' : 'X'}</Td>
									<Td>{currStudent.isSafeVerified ? 'V' : 'X'}</Td>
									<Td>{currStudent.score}</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default StudentsList;
