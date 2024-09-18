import { useEffect, useCallback } from 'react';

const PreventZoom = () => {
    const preventDefault = useCallback((e: Event) => {
        e.preventDefault();
    }, []);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const touchDurationTimer = setTimeout(() => {
            e.preventDefault();
        }, 500);
        (e.target as HTMLElement).setAttribute('data-touch-timer', touchDurationTimer.toString());
    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        const timerId = (e.target as HTMLElement).getAttribute('data-touch-timer');
        if (timerId) {
            clearTimeout(Number(timerId));
            (e.target as HTMLElement).removeAttribute('data-touch-timer');
        }
    }, []);

    useEffect(() => {
        document.addEventListener('gesturestart', preventDefault);
        document.addEventListener('gesturechange', preventDefault);
        document.addEventListener('gestureend', preventDefault);
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
        document.addEventListener('touchmove', handleTouchEnd, { passive: false });

        return () => {
            document.removeEventListener('gesturestart', preventDefault);
            document.removeEventListener('gesturechange', preventDefault);
            document.removeEventListener('gestureend', preventDefault);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchmove', handleTouchEnd);
        };
    }, [preventDefault, handleTouchStart, handleTouchEnd]);

    return null;
}

export default PreventZoom;