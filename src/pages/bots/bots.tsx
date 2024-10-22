import { useSearchParams } from 'react-router-dom';
import Table from './components/table';
import RefsTable from './components/RefsTable';

const Bots = () => {
	const [searchParams] = useSearchParams();

	if (searchParams.get('project_id')) return <RefsTable />;
	return <Table />;
};

export default Bots;
