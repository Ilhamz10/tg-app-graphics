import Table from './components/table';
import RefsTable from './components/RefsTable';
import { useAppSelector } from '../../hooks/redux-hooks';

const Bots = () => {
	const { refId } = useAppSelector((state) => state.uiReducer);

	if (refId) return <RefsTable />;
	return <Table />;
};

export default Bots;
