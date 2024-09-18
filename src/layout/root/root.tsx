import PreventZoom from '../../shared/PreventZoom';
import Layout from '../../shared/Layout';

import Footer from '../footer/footer';
import { routes } from '../../main';

export const Root = () => {
	return (
		<>
			<PreventZoom />
			<Layout routes={routes} />
			<Footer />
		</>
	);
};
