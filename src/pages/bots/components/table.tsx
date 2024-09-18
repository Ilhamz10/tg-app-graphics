import Tbody from '../UI/tbody';
import Thead from '../UI/thead';

const Table = () => {
	return (
		<div className='w-full grid grid-cols-[8ch,repeat(5,auto)] text-center'>
			<Thead />
			<Tbody
				tbody={{
					bots: 'ABCDIFGHIJKLMNOPQABCDIFGHIJKLMNOPQ',
					ca: 0,
					payments: 0,
					pdp: 1.24,
					profit: 17467.93,
					users: 0,
				}}
			/>
			<Tbody
				tbody={{
					bots: 'ABCDIFGHIJKLMNOPQABCDIFGHIJKLMNOPQ',
					ca: 1.5,
					payments: 6000,
					pdp: 1.24,
					profit: 875467.93,
					users: 600000,
				}}
			/>
		</div>
	);
};

export default Table;
