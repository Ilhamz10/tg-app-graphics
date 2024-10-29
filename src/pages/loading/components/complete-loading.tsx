import LoadingGraphic from '../UI/loading-graphic';
import LoadingCompleteData from '../UI/loading-complete-data';

const CompleteLoading = () => {
	return (
		<>
			<div className='grid gap-2 mb-8'>
				<LoadingGraphic />
				<LoadingGraphic />
				<LoadingGraphic />
			</div>
			<LoadingCompleteData />
		</>
	);
};

export default CompleteLoading;
