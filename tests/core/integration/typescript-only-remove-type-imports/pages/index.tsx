import type { User } from '../User';

const users: User[] = [
	{
		email: 'a@a.de',
		id: 'a',
		username: 'anton',
	},
	{
		email: 'b@b.de',
		id: 'b',
		username: 'berta',
	},
];

function Index() {
	return (
		<ul>
			{users.map((u) => (
				<li key={u.id}>
					{u.username}: {u.email}
				</li>
			))}
		</ul>
	);
}

export default Index;
