// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "cs184-raytracer",
		title: "Physically-based Ray Tracer",
		description:
			"Built a C++ rendering engine with BVH acceleration, direct and global illumination, and adaptive sampling to simulate realistic light transport.",
		image:
			"../../assets/cs184/cs184-raytracer/projectimages/CBbunny_s1024_m5_l16_o1.png",
		category: "other",
		techStack: ["C++", "Ray Tracing", "BVH", "Global Illumination"],
		status: "completed",
		visitUrl: "/reports/raytracer/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: true,
		tags: ["Computer Graphics", "Rendering", "UC Berkeley"],
	},
	{
		id: "cs180-diffusion",
		title: "Fun With Diffusion Models",
		description:
			"Explored diffusion models through sampling loops, image-to-image translation, classifier-free guidance, inpainting, and training denoising UNets.",
		image:
			"../../assets/cs180/cs180-diffusion/projectimages/00/almafi_cost_100.png",
		category: "other",
		techStack: ["Python", "PyTorch", "Diffusion Models", "UNet"],
		status: "completed",
		visitUrl: "/reports/diffusion/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: true,
		tags: ["Computer Vision", "Deep Learning", "UC Berkeley"],
	},
	{
		id: "cs180-nerf",
		title: "Neural Radiance Fields",
		description:
			"Implemented neural fields and NeRFs for novel view synthesis, including ray generation, point sampling, volume rendering, and training on custom data.",
		image:
			"../../assets/cs180/cs180-nerf/projectimages/2/progression/render_step_test1024_32_10000_4000.jpg",
		category: "other",
		techStack: ["Python", "PyTorch", "NeRF", "Volume Rendering"],
		status: "completed",
		visitUrl: "/reports/nerf/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: true,
		tags: ["Computer Vision", "3D Reconstruction", "UC Berkeley"],
	},
	{
		id: "cs184-clothsim",
		title: "Cloth Simulator",
		description:
			"Created a mass-spring cloth simulation with numerical integration, collision handling, self-collision via spatial hashing, and multiple real-time shaders.",
		image:
			"../../assets/cs184/cs184-cloth/projectimages/part5_bp.png",
		category: "other",
		techStack: ["C++", "Simulation", "OpenGL", "Shaders"],
		status: "completed",
		visitUrl: "/reports/clothsim/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: false,
		tags: ["Computer Graphics", "Physics Simulation", "UC Berkeley"],
	},
	{
		id: "cs180-stitching",
		title: "(Auto)Stitching Photo Mosaics",
		description:
			"Built an image mosaicing pipeline with homography recovery, rectification, blending, Harris corner detection, feature matching, and RANSAC.",
		image:
			"../../assets/cs180/cs180-stitching/projectimages/a4/blended_plaza.jpg",
		category: "other",
		techStack: [
			"Python",
			"Homography",
			"RANSAC",
			"Image Stitching",
		],
		status: "completed",
		visitUrl: "/reports/stitching/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: false,
		tags: ["Computer Vision", "Image Processing", "UC Berkeley"],
	},
	{
		id: "cs180-rgb",
		title: "Images of the Russian Empire",
		description:
			"Colorized the Prokudin-Gorskii photo collection by aligning RGB channels using single-scale search, image pyramids, and normalized cross-correlation.",
		image:
			"../../assets/cs180/cs180-rgb/projectimages/euctobolskAligned[3, 3][3, 6].png",
		category: "other",
		techStack: [
			"Python",
			"Image Alignment",
			"Image Pyramids",
			"NCC",
		],
		status: "completed",
		visitUrl: "/reports/rgb/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: false,
		tags: ["Computer Vision", "Image Processing", "UC Berkeley"],
	},
	{
		id: "cs180-frequencies",
		title: "Fun with Filters and Frequencies",
		description:
			"Explored convolution, edge detection, derivative of Gaussian filters, hybrid images, Gaussian and Laplacian stacks, and multiresolution blending.",
		image:
			"../../assets/cs180/cs180-frequencies/projectimages/21/sharp_taj.jpg",
		category: "other",
		techStack: [
			"Python",
			"Convolution",
			"Fourier Analysis",
			"Image Blending",
		],
		status: "completed",
		visitUrl: "/reports/frequencies/",
		startDate: "2024-05-15",
		endDate: "2024-05-15",
		featured: false,
		tags: ["Computer Vision", "Signal Processing", "UC Berkeley"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};