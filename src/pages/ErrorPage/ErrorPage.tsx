import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const currentParams = new URLSearchParams(searchParams);
	const [params, setParams] = useState('');

	useEffect(() => {
		if (currentParams.get('project_id')) {
			setParams(('project_id=' + currentParams.get('project_id')) as string);
		}
	}, [currentParams.get('project_id')]);

	useEffect(() => {
		navigate(`/?${params}`);
	}, []);

	return <></>;
};

export default ErrorPage;
