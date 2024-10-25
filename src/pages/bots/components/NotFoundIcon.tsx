import Lottie from 'react-lottie';
import animationData from '../../../assets/lottie-files/not-found.json';

const NotFoundIcon = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div className='cursor-pointer w-44 h-44 mx-auto'>
			<Lottie options={defaultOptions} />
		</div>
	);
};

export default NotFoundIcon;
