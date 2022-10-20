import '../../styles/SafeZone.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSafe, getSafe } from '../../features/userSafe/userSafeSlice';
import safesService from '../../utils/userSafe';
import Safe from './Safe';
import { toast } from 'react-toastify';
import asmLogo from '../../Images/asm.svg';
import React from 'react';
import PopUp from './PopUp';

const HomeSafeZone = () => {
	const dispatch = useDispatch();
	const [popupActive, setPopupActive] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { safeInfo, isLoading, isError, isSuccess, message } = useSelector((state) => state.safe);
	const [file, setFile] = useState();
	const [progress, setProgress] = useState(null);
	const [uploadingStatus, setUploadingStatus] = useState('idel');
	const [safe, setSafe] = useState({});

	let safeId = undefined;

	const updateThumbnail = (e, file) => {
		const popupBodyElement = document.getElementsByClassName('safe_popup__body')[0];
		let thumbnailElement = popupBodyElement.querySelector('.upload_container__thumb');
		// First time - remove the prompt
		if (popupBodyElement.querySelector('.upload_container')) {
			popupBodyElement.querySelector('.upload_container').remove();
		}
		// First time - there is no thumbnail element, so lets create it
		if (!thumbnailElement) {
			thumbnailElement = document.createElement('div');
			thumbnailElement.classList.add('upload_container__thumb');
			popupBodyElement.prepend(thumbnailElement);
			const thumbnailImgElement = document.createElement('img');
			thumbnailImgElement.src = asmLogo;
			thumbnailImgElement.classList.add('upload_container__thumb__icon');
			thumbnailElement.appendChild(thumbnailImgElement);
			{
				/* <img src={asmLogo} alt="asm Logo" className="page__not__found__img"/> */
			}
		}

		thumbnailElement.dataset.label = file.name;
	};

	const restoreform = () => {
		const popupBodyElement = document.getElementsByClassName('safe_popup__body')[0];
		let thumbnailElement = popupBodyElement.querySelector('.upload_container__thumb');
		const formElement = document.getElementsByClassName('upload_form_container')[0];
		const inputContainer = document.getElementsByClassName('upload_form_container__input')[0];

		popupBodyElement.appendChild(formElement);
		if (thumbnailElement) {
			thumbnailElement.remove();
			const uploadContainer = document.createElement('div');
			uploadContainer.classList.add('upload_container');
			const promptContainer = document.createElement('div');
			promptContainer.classList.add('upload_container__prompt__container');
			const RiFileUploadLine = document.createElement('RiFileUploadLine');
			RiFileUploadLine.classList.add('upload_container__upload_icon');
			const uploadPrompt = document.createElement('div');
			uploadPrompt.classList.add('upload_container__prompt');
			uploadPrompt.innerHTML = 'Drag and Drop key file or click on upload';
			promptContainer.appendChild(RiFileUploadLine);
			promptContainer.appendChild(uploadPrompt);
			uploadContainer.appendChild(promptContainer);
			formElement.prepend(uploadContainer);
			inputContainer.querySelector('.upload_container__input').remove();
			const inputElement = document.createElement('input');
			inputElement.type = 'file';
			inputElement.classList.add('upload_container__input');
			inputContainer.prepend(inputElement);
			// updateEvent();
		}
	};
	useEffect(() => {
		dispatch(getSafe(user));
		// updateEvent();
	}, []);

	const updateEvent = () => {
		if (safeInfo === undefined) return;
		const inputElement = document.getElementsByClassName('upload_container__input')[0];
		const dropZoneElement = document.getElementsByClassName('upload_container')[0];
		const popupBody = document.getElementsByClassName('safe_popup__body')[0];
		if (dropZoneElement !== undefined) {
			dropZoneElement.addEventListener('dragover', (e) => {
				e.preventDefault();
				dropZoneElement.classList.add('upload_container__hover');
			});

			['dragleave', 'dragend'].forEach((type) => {
				dropZoneElement.addEventListener(type, (e) => {
					dropZoneElement.classList.remove('upload_container__hover');
				});
			});

			dropZoneElement.addEventListener('drop', (e) => {
				e.preventDefault();
				if (e.dataTransfer.files.length === 1) {
					const fileElement = e.dataTransfer.files[0];
					inputElement.files = e.dataTransfer.files;
					setFile(inputElement.files[0]);
					updateThumbnail(popupBody, fileElement);
				} else if (e.dataTransfer.files.length > 1) {
					console.error('too many files');
				}
				dropZoneElement.classList.remove('upload_container__hover');
			});

			inputElement.addEventListener('change', (e) => {
				if (inputElement.files.length) {
					setFile(inputElement.files[0]);
					updateThumbnail(popupBody, inputElement.files[0]);
				}
			});
		}
	};
	useEffect(() => {
		setSafe({ ...safeInfo, solved: false });
		console.log(safeInfo.safeName);
	}, [safeInfo]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (uploadingStatus === 'key') {
			setUploadingStatus('uploading');
			if (!safeId) return;
			const response = await safesService.postKey(user, safeId, file);
			console.log(response);
			setUploadingStatus('testing');
			setProgress(2);
			// setPopupActive(false);
		} else if (uploadingStatus === 'idel') {
			setUploadingStatus('uploading');
			// Upload safe
			const response = await safesService.postSafe(user, file);
			safeId = response.safeId;
			setProgress(1);
			restoreform();
			setUploadingStatus('key');
			console.log(`stage 2: status ${uploadingStatus}`);
		} else if (uploadingStatus === 'testing') {
			console.log('MASHEU');
			setUploadingStatus('done');
			console.log(`stage 3: status ${uploadingStatus}`);
			setUploadingStatus('idel');
		}
	};

	const reuploadSafe = (e) => {
		toast.warn('Warrning reuploading safe will remove the old one', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		console.log(`reupload safe`);
		e.preventDefault();
		setSafe({});
		dispatch(removeSafe());
		openPopup(e);
	};

	const closeOverlay = (e) => {
		setProgress(0);
		setPopupActive(false);
		// restoreform();
	};

	const openPopup = (e) => {
		setProgress(0);
		setPopupActive(true);
		// setUploadingStatus("idel");
		// console.log(`stage 0: status ${uploadingStatus}`);
		// setUploadingStatus("idel");
		console.log(`stage 0: status ${uploadingStatus}`);
	};

	const getKey = async (e) => {
		setProgress(2);
		setPopupActive(false);
	};

	return (
		<>
			{safeInfo.safeName === undefined ? (
				<div>
					<div className='empty_container'>
						You have not safe, please click on upload safe to uplaod one, you can only have one safe at any
						time.
						<br />
						<button onClick={openPopup} className='safe_upload_button'>
							upload safe
						</button>
					</div>
					<PopUp popupActive={popupActive} closeOverlay={closeOverlay}/>
				</div> 
			) : (
				<>
					<div className='user_safe_container'>
						<Safe safe={safe} action={reuploadSafe} type={'private'} />
					</div>
				</>
			)}
		</>
	);
};

export default HomeSafeZone;
