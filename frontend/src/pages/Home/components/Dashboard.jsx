import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import StudentsList from './utilsComponents/StudentsList';
import CreateTournamentForm from './utilsComponents/CreateTournamentForm';
import tournamentService from '../../../features/tournament/tournamentServices';
import AddStudentForm from './utilsComponents/AddStudentForm';
import classService from '../../../features/class/classService';
import { getClassInfo } from '../../../features/class/classSlice';

const Dashboard = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { classInfo } = useSelector((state) => state.class);
	const [selectedClass, setSelectedClass] = useState(undefined);
	const [tournament, setTournament] = useState(undefined);

	const [students, setStudents] = useState([]);

	useEffect(() => {
		if (classInfo <= 0) return;
		setSelectedClass(classInfo[0]);
	}, [classInfo]);

	useEffect(() => {
		if (!selectedClass) return;

		classService
			.getClassStudents(user, selectedClass._id)
			.then(({ students }) => {
				setStudents(students);
			})
			.catch((err) => {
				console.log(err);
			});

		tournamentService.getTournamentInfo(user).then(({ tournaments }) => {
			const relatedTournament = tournaments.find(
				(currTournament) => selectedClass._id === currTournament.classRelated
			);
			setTournament(relatedTournament);
		});
	}, [selectedClass]);

	const handleSelectedClass = (e) => {};

	const handleCreateTournamnet = async (deadline, showScore) => {
		tournamentService
			.createTournamentSafe(user, selectedClass._id, showScore, deadline)
			.then(({ newTournament }) => {
				toast({
					status: 'success',
					description: 'Created Successfuly!',
				});
				setTournament(newTournament);
			})
			.catch((err) => {
				toast({
					status: 'error',
					description: err?.response?.data,
				});
			});
	};

	const handleAddStudent = async (studentUserName) => {
		classService
			.addStudentToClass(user, selectedClass._id, studentUserName)
			.then((data) => {
				toast({
					status: 'success',
					description: 'Added Successfuly!',
				});
				setSelectedClass(data);
				dispatch(getClassInfo(user));
			})
			.catch((err) => {
				toast({
					status: 'error',
					description: err?.response?.data,
				});
			});
	};

	// If don't have any classes no need to render everything else
	if (classInfo.length <= 0) {
		return <div className='text-center font-bold'>You don't have any classes.</div>;
	}

	return (
		<div className='flex flex-col justify-center items-center m-3'>
			{/* Responsible for selecting the class */}
			<section>
				<label>Selected Class: </label>
				<select onChange={handleSelectedClass}>
					{classInfo.map((classObj) => {
						return (
							<option key={classObj._id} value={classObj._id}>
								{`${classObj.classInfo.className} ${classObj.classInfo.classNumber}`}
							</option>
						);
					})}
				</select>
			</section>
			{/* Display students in class */}
			<StudentsList students={students} />
			<AddStudentForm addStudent={handleAddStudent} />
			{/* Create Tournament Form */}
			{!tournament ? (
				<CreateTournamentForm createTournamnet={handleCreateTournamnet} />
			) : (
				<div>
					Deadline: {new Date(tournament.deadline).toDateString()}
					<br />
					Show score board: {tournament.showScore ? 'V' : 'X'}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
