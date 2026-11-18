export type Language = 'id' | 'en';

export type Project = {
	title: string;
	description: string;
	stack: string;
	year: number;
	href?: string;
};

type Profile = {
	bio: string;
	facts: { label: string; value: string }[];
	skills: string[];
};

export const projects: Record<Language, Project[]> = {
	id: [
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
	],
	en: [
		{
			title: 'PJBL: YAYUBI',
			description: 'Semester 1 project: a catering website.',
			stack: 'PHP',
			year: 2025,
			href: 'https://github.com/UbayDilla28/PJBL-Yayubi'
		},
		{
			title: 'Front-End test go brrrr',
			description: 'A front-end project for practice.',
			stack: 'CSS',
			year: 2026,
			href: 'https://github.com/UbayDilla28/Ubay-FE2026'
		},
		{
			title: 'Behind the Uniform',
			description: 'In short, we build VN.',
			stack: 'Renpy',
			year: 2026,
			href: 'https://github.com/UbayDilla28/Behind-the-Uniform'
		},
		{
			title: 'OOTS Portfolio',
			description:
				'A portfolio project for setificate and else, also my parent went to UDINUS so nostalgia I guess.',
			stack: 'SvelteKit',
			year: 2026,
			href: 'https://github.com/UbayDilla28/OOTS-PORTOFOLIO'
		}
	]
};

export const profile: Record<Language, Profile> = {
	id: {
		bio: 'Saya aslinya malas, tapi suka disuruh suruh bikin apa gitu jadinya ya gitulah.',
		facts: [
			{ label: 'FOKUS', value: 'Front-end gas, Back-end nanti aja' },
			{ label: 'STACK', value: 'SvelteKit · TypeScript · Tailwind' },
			{ label: 'LOKASI', value: 'Indonesia' },
			{ label: 'STATUS', value: 'Terbuka untuk mabar' }
		],
		skills: ['HTML', 'CSS', 'JavaScript', 'SvelteKit', 'Tailwind', 'Git']
	},
	en: {
		bio: "Honestly, I'm too lazy for building this and that, but I do it for the sake of grades.",
		facts: [
			{ label: 'FOCUS', value: 'Building front-end while I gave the back-ends to AI' },
			{ label: 'STACK', value: 'SvelteKit · TypeScript · Tailwind' },
			{ label: 'LOCATION', value: 'Indonesia' },
			{ label: 'STATUS', value: "Hey it's me, Ubaydilla. Ask me anything!" }
		],
		skills: ['HTML', 'CSS', 'JavaScript', 'SvelteKit', 'Tailwind', 'Git']
	}
};

export const copy = {
	id: {
		projects: 'Proyek',
		about: 'Tentang',
		contact: 'Kontak',
		theme: 'Ganti tema',
		language: 'Ganti bahasa',
		menu: 'Buka menu',
		heroBio: 'Siswa SMK jurusan PPLG. Tapi dia nggak tau mau ngapain jadinya amburadul.',
		viewProjects: 'Lihat proyek',
		dontContact: 'JANGAN Hubungi saya',
		available: 'TERSEDIA UNTUK PROYEK BARU — 2026',
		bannerAlt: 'Ilustrasi dekoratif',
		bannerCaption: 'Gambar hanya sebagai pemanis lmaooooooo',
		focus: 'FOKUS',
		stack: 'STACK',
		location: 'LOKASI',
		status: 'STATUS',
		skills: 'KEAHLIAN',
		contactPrompt: 'Punya pertanyaan atau ingin bekerja sama? Kirim pesan.',
		name: 'NAMA',
		email: 'EMAIL',
		message: 'PESAN',
		namePlaceholder: 'Nama lengkap kamu',
		messagePlaceholder: 'Tulis pesan kamu di sini',
		sending: 'Mengirim...',
		send: 'Kirim pesan',
		sendingMessage: 'Mengirim pesan...',
		sent: 'Pesan terkirim. Terima kasih!',
		sendError: 'Gagal mengirim. Coba lagi.',
		footerHeading: 'Mari membangun negri atau apalah.',
		github: 'GITHUB',
		openProject: 'Buka',
		music: 'Musik latar',
		play: 'Putar musik',
		pause: 'Jeda musik',
		audioError: 'Audio tidak dapat dimuat. Periksa file: '
	},
	en: {
		projects: 'Projects',
		about: 'About',
		contact: 'Contact',
		theme: 'Toggle theme',
		language: 'Change language',
		menu: 'Open menu',
		heroBio:
			'A vocational high school student studying software development that love to procratinating.',
		viewProjects: 'View projects',
		dontContact: "PLEASE DON'T contact me",
		available: 'AVAILABLE FOR NEW PROJECTS — 2026',
		bannerAlt: 'Decorative illustration',
		bannerCaption: 'Have you ever thought about life?',
		focus: 'FOCUS',
		stack: 'STACK',
		location: 'LOCATION',
		status: 'STATUS',
		skills: 'SKILLS',
		contactPrompt: 'Have a question or want to work together? Send me a message.',
		name: 'NAME',
		email: 'EMAIL',
		message: 'MESSAGE',
		namePlaceholder: 'Your full name',
		messagePlaceholder: 'Write your message here',
		sending: 'Sending...',
		send: 'Send message',
		sendingMessage: 'Sending your message...',
		sent: 'Message sent. Thank you!',
		sendError: 'Could not send your message. Please try again.',
		footerHeading: "Let's build anything or something idk.",
		github: 'GITHUB',
		openProject: 'Open',
		music: 'Background music',
		play: 'Play music',
		pause: 'Pause music',
		audioError: 'Audio could not be loaded. Check file: '
	}
} satisfies Record<Language, Record<string, string>>;
