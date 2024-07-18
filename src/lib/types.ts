interface User {
	created_at: string;
	email: string;
	first_name: string;
	id: number;
	last_login: string;
	last_name: string;
	last_updated: string;
	role: string;
	username: string;
}

export interface Document {
	can_share: boolean;
	created_at: string;
	description: string;
	id: number;
	owner: User;
	owner_id: number;
	share_token: string;
	status: string;
	title: string;
	updated_at: string;
}
