// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "Studying Electrical Engineering and Computer Science (EECS)",
		description:
			"Currently studying EECS and learning anything about everything :)",
		type: "education",
		startDate: "2024-07-21",
		location: "Berkeley, CA",
		organization: "University of California, Berkeley",
		skills: ["Java", "C++", "Python", "JavaScript", "HTML/CSS", "Scheme", "SQL"],
		achievements: [
			"Current GPA: 3.8/4.0",
			"Data Structures and Abstraction", 
			"Efficient Algorithms and Intractable Problems", 
			"Introduction to Machine Learning", 
			"Computer Vision and Computational Photography", 
			"Foundations of Computer Graphics", 
			"Full-Stack Web Architecture", 
			"Introduction to the Internet",
			"Great Ideas of Computer Architecture", 
			"Structure and Interpretation of Computer Programs"
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "nasa-ncas",
		title: "Software and Systems Specialist",
		description:
			"A personal blog website developed using the Astro framework as a practical project for learning frontend technologies.",
		type: "work",
		startDate: "2023-07-18",
		endDate: "2024-01-020",
		location: "Mountain View, CA",
		organization: "NASA NCAS",
		achievements: [
			"Developed the software infrastructure of an Urban Air Mobility (UAM) vehicle, presented to key shareholders",
			"Formulated an integration plan centered around the utilization of UAM vehicles to tackle emergency response",
			"Shadowed active engineers within the UAM field to assess the current landscape of the field's technologies",
		],
		
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "summer-internship-2025",
		title: "Software Engineer Intern",
		description:
			"Summer internship at Boeing BDS developing software and conducting internal research and development.",
		type: "work",
		startDate: "2025-06-08",
		endDate: "2025-08-16",
		location: "Seattle, WA",
		organization: "Boeing",
		position: "Software Engineer Intern",
		skills: ["Java", "C++", "Kubernetes", "Docker", "GitLab"],
		achievements: [
			"Integrated unit testing and automated artifact documentation into Boeing's continuous integration and continuous delivery/deployment (CI/CD) and DevSecOps pipeline.",
			"Supported foreign trade negotiations through IRAD efforts regarding the architecuture of onboard aerial communications networking.",
			"Constructed Amazon Web Services (AWS) development environment for a team of 50+ developers.",
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "beesure",
		title: "BeeSure Cerebellar Examination Application",
		description:
			"Summer internship at Boeing BDS developing software and conducting internal research and development.",
		type: "project",
		startDate: "2024-11-08",
		endDate: "2024-11-10",
		location: "Palo Alto, CA",
		organization: "Stanford University",
		skills: ["C#", "Unity", "Meta SDK"],
		achievements: [
			"Awarded 'Virtuous Reality - Best of Social Good' award among 62 project teams at Stanford's Immerse the Bay",
			"Spearheaded the development of a real-time cerebellar examination virtual reality application using Unity and C#, enabling an engaging alternative to in-person appointments for people suffering from degenerative brain disease.",
			"Implemented real-time data tracking to record patient performance metrics for in-depth assessment by doctors."
		],
		icon: "material-symbols:work",
		color: "#DC2626",
		featured: true,
	},
	
	
	
	
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education")
			.length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
