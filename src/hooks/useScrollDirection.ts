import { useEffect, useState } from 'react';

const useScrollDirection = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
	const [directionState, setDirectionState] = useState<'down' | 'up'>('down');

	useEffect(() => {
		let myRef = ref?.current;

		const handleScroll = () => {
			const scrollY = ref?.current ? ref.current.scrollTop : window.pageYOffset;
			const direction = scrollY > lastScrollY ? 'down' : 'up';
			if (direction !== directionState) {
				setDirectionState(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		let startY = 0;
		let lastScrollY = ref?.current ? ref.current.scrollTop : window.pageYOffset;

		const handleTouchStart = (e) => {
			startY = e.touches[0].clientY;
		};

		const handleTouchMove = (e) => {
			const currentY = e.touches[0].clientY;
			const direction = currentY < startY ? 'down' : 'up';
			if (direction !== directionState) {
				setDirectionState(direction);
			}
			startY = currentY;
		};

		if (myRef) {
			myRef.addEventListener('scroll', handleScroll);
			myRef.addEventListener('touchstart', handleTouchStart);
			myRef.addEventListener('touchmove', handleTouchMove);
		} else {
			window.addEventListener('scroll', handleScroll);
			window.addEventListener('touchstart', handleTouchStart);
			window.addEventListener('touchmove', handleTouchMove);
		}

		return () => {
			if (myRef) {
				myRef.removeEventListener('scroll', handleScroll);
				myRef.removeEventListener('touchstart', handleTouchStart);
				myRef.removeEventListener('touchmove', handleTouchMove);
			} else {
				window.removeEventListener('scroll', handleScroll);
				window.removeEventListener('touchstart', handleTouchStart);
				window.removeEventListener('touchmove', handleTouchMove);
			}
		};
	}, [setDirectionState, ref]);

	return { direction: directionState };
};

export default useScrollDirection;
