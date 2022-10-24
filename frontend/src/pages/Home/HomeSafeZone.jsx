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
	const { safeInfo } = useSelector((state) => state.safe);
	const [progress, setProgress] = useState(null);
	const [uploadingStatus, setUploadingStatus] = useState('idel');
	const [safe, setSafe] = useState({});

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
		}
	};
	useEffect(() => {
		dispatch(getSafe(user));

	}, [dispatch,user]);

	
	useEffect(() => {
		setSafe({ ...safeInfo, solved: false });
	}, [safeInfo]);


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
		// setUploadingStatus("idel");
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
