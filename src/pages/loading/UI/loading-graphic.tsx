import { graphicLoadingImg } from '../../../assets';
import AccordionCard from '../../../shared/UI/AccordionCard';

const LoadingGraphic = () => {
	return (
		<AccordionCard
			setPercentage={() => {}}
			setTitle={() => {}}
			maxPercentage={0}
			maxValue={0}
			maxDate='0'
			setDate={() => {}}
			content={
				<div className='px-3 pb-3'>
					<img src={graphicLoadingImg} className='w-full loading' />
				</div>
			}
			title={
				<div className='min-w-36 max-w-36 w-full bg-[#DCDCE2] h-8 rounded-lg flex justify-end relative loading'>
					<div className='bg-bgColor w-3 h-[37px] blur-[2px] absolute -right-1 -top-[3px]' />
				</div>
			}
			info={
				<div className='min-w-12 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
					<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
				</div>
			}
			date={
				<div className='max-w-28 w-full bg-[#DCDCE2] h-4 rounded-lg flex justify-end relative loading'>
					<div className='bg-bgColor w-3 h-[19px] blur-[2px] absolute -right-1 -top-[3px]' />
				</div>
			}
			text={'Доход'}
			type='good'
		/>
	);
};

export default LoadingGraphic;
