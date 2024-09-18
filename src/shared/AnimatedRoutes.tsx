import React from 'react';
import { Routes, useLocation, useRoutes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
	initial: {
		opacity: 0,
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	in: {
		opacity: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	out: {
		opacity: 0,
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
};

const pageTransition = {
	type: 'tween',
	ease: 'linear',
	duration: 0.3,
};

const AnimatedRoutes = ({ routes }: { routes: any }) => {
	const location = useLocation();
	const element = useRoutes(routes, location);

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
			}}>
			<AnimatePresence initial={false}>
				<motion.div
					key={location.pathname}
					initial='initial'
					animate='in'
					exit='out'
					variants={pageVariants}
					transition={pageTransition}
					style={{ overflow: 'auto', height: '100%' }}>
					<div className='route-section'>{element}</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedRoutes;
