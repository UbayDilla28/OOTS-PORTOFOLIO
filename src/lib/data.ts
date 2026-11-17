export type Project = {
	title: string;
	description: string;
	stack: string;
	year: number;
	href?: string;
};

export const projects: Project[] = [
	{
		title: 'PJBL: YAYUBI',
		description: 'PJBL Semester 1 membuat web catering.',
		stack: 'PHP',
		year: 2025,
		href: 'https://github.com/UbayDilla28/PJBL-Yayubi'
	},
	{
		title: 'Front-End testing aja',
		description: 'Intinya ini testing front-end.',
		stack: 'CSS',
		year: 2026,
		href: 'https://github.com/UbayDilla28/Ubay-FE2026'
	},
	{
		title: 'Behind the Uniform',
		description: 'Intinya kita bikin game VN.',
		stack: 'Renpy',
		year: 2026,
		href: 'https://github.com/UbayDilla28/Behind-the-Uniform'
	},
	{
		title: 'OOTS Portfolio',
		description: 'Disuruh kakak kakak UDINUS buat bikin portofolio, yaudah ini dibikin aja.',
		stack: 'SvelteKit',
		year: 2026,
		href: 'https://github.com/UbayDilla28/OOTS-PORTOFOLIO'
	}
];

export const profile = {
	bio: 'Saya aslinya malas, tapi suka disuruh suruh bikin apa gitu jadinya ya gitulah.',
	facts: [
		{ label: 'FOKUS', value: 'Front-end gas, Back-end nanti aja' },
		{ label: 'STACK', value: 'SvelteKit · TypeScript · Tailwind' },
		{ label: 'LOKASI', value: 'Indonesia' },
		{ label: 'STATUS', value: 'Terbuka untuk mabar' }
	],
	skills: ['HTML', 'CSS', 'JavaScript', 'SvelteKit', 'Tailwind', 'Git']
};
