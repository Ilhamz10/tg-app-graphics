import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { calendarActions } from '../../store/calendar-slice';

const routes = [
	{ to: '/choice', text: 'Выбрать' },
	{ to: '/yesterday', text: 'Вчера' },
	{ to: '/', text: 'Сегодня' },
	{ to: '/week', text: 'Неделя' },
	{ to: '/month', text: 'Месяц' },
	{ to: '/year', text: 'Год' },
];
const Footer = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	function toggleCalendar() {
		dispatch(calendarActions.toggleCallendar());
	}

	return (
		<footer className='fixed left-0 right-0 bottom-0 z-[99999999]'>
			<ul className='relative flex items-center justify-between px-4 pt-4 pb-3 bg-bgColor '>
				{routes.map((route) => (
					<li
						key={route.to}
						className={`relative ${route.to === pathname ? 'py-[5px]' : ''}`}>
						<NavLink
							onClick={route.to === '/choice' ? toggleCalendar : () => {}}
							className={({ isActive }) =>
								`text-sm font-medium relative z-10 transition-[top] ${
									isActive ? 'text-linkColor -top-8' : 'text-subtitleColor top-0'
								}`
							}
							to={route.to}>
							{route.text}
						</NavLink>
						{pathname === route.to && (
							<motion.div
								layoutId='underline'
								transition={{
									ease: 'linear',
								}}
								className='absolute w-max text-sm font-medium text-transparent h-full -left-[10px] -top-8 bg-bgColor border-[5px] border-secondaryBgColor rounded-lg px-[5px] before:w-3 before:h-3 before:bg-bgColor before:absolute before:top-[49%] before:-left-[16.5px] before:rounded-tr-[7px] before:shadow-[3px_-1px_0_0_var(--tg-theme-secondary-bg-color)] after:w-3 after:h-3 after:bg-bgColor after:absolute after:top-[49%] after:-right-[16.5px] after:rounded-tl-[7px] after:shadow-[-3px_-1px_0_0_var(--tg-theme-secondary-bg-color)]'>
								{route.text}
							</motion.div>
						)}
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
