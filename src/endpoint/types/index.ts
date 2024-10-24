export interface IUserStatistic {
	conversion: number;
	per_client_income: number;
	income_withdraw: number;
	income_payments: number;
	datybot: {
		users: number;
		total_income: number;
	};
}

export interface IStatisticGraphic {
	result: {
		graph: {
			x: number;
			y: number;
			label: string;
		}[];
	};
}

export interface IDateParams {
	start_date: number;
	end_date: number;
	tz: string;
}

export interface ISortParams {
	order: 'asc' | 'desc';
	sort_by:
		| 'users_count'
		| 'payments_count'
		| 'conversion'
		| 'per_client_price'
		| 'income_total';
}

export interface IBots {
	result: {
		projects: [
			{
				bot_username: string;
				users_count: number;
				payments_count: number;
				conversion: number;
				per_client_price: number;
				income_total: number;
				project_id_encoded: string;
			}
		];
		user: {
			user_id: number;
			username: string;
			first_name: string;
			last_name: null | string;
			language_code: string;
		};
	};
}

export interface IRefs {
	result: {
		refferal_links: [
			{
				link_name: string;
				users_count: number;
				payments_count: number;
				conversion: number;
				per_client_price: number;
				income_total: number;
			}
		];
		user: {
			user_id: number;
			username: string;
			first_name: string;
			last_name: null | string;
			language_code: string;
		};
	};
}
