import type {
	AnnouncementConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	FooterConfig,
	FullscreenWallpaperConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	ProfileConfig,
	RandomPostsConfig,
	RelatedPostsConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
	ThirdPartyAnalyticsConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// Remove i18n imports to avoid circular dependencies

// Define site language
const SITE_LANG = "en"; // Language code, for example: 'en', 'zh_CN', 'ja', etc.
const SITE_TIMEZONE = -7; //Set your website time zone from -12 to 12 default in UTC+8
export const siteConfig: SiteConfig = {
	title: "Christopher Hoang",
	subtitle: "",
	siteURL: "https://hoangchristopher.github.io/", // Please replace it with your site url, ending with a slash
	siteStartDate: "2025-08-01", // The date the site started running, used by the site statistics component to calculate the number of running days

	timeZone: SITE_TIMEZONE,

	lang: SITE_LANG,

	themeColor: {
		hue: 280, // The default hue of the theme color, ranging from 0 to 360. For example: red: 0, cyan: 200, teal: 250, pink: 345
		fixed: false, // Hide theme color picker from visitors
	},

	// Featured page switch configuration (closing unused pages helps improve SEO, please remember to remove the corresponding links in navbarConfig after closing)
	featurePages: {
		anime: true, // Fan drama page switch
		diary: true, // Diary page switch
		friends: true, // Friend link page switch
		projects: true, // Project page switch
		skills: true, // Skill page switch
		timeline: true, // Timeline page switch
		albums: true, // Album page switch
		devices: true, // Device page switch
	},

	// Top column title configuration
	navbarTitle: {
		// Display mode: "text-icon" displays icon + text, "logo" displays only logo
		mode: "text-logo",
		// Top column title text
		text: "Christopher Hoang's Page",
		// Top bar title icon path, public/assets/home/home.webp is used by default
		icon: "assets/home/cut_fruit_lomon.webp",
		// Website logo image path
		logo: "assets/home/cut_fruit_lomon.webp",
	},

	// Page auto-zoom configuration
	pageScaling: {
		enable: true, // Whether to enable automatic scaling
		targetWidth: 1400, // Target width below which scaling begins
	},

	bangumi: {
		userId: "your-bangumi-id", // Set your Bangumi user ID here, can be set to "sai" for testing
		fetchOnDev: false, // Whether to obtain Bangumi data in the development environment (default false), execute pnpm build to build the json file before obtaining it
	},

	bilibili: {
		vmid: "your-bilibili-vmid", // Set your Bilibili user ID (uid) here, for example "1129280784"
		fetchOnDev: false, // Whether to obtain Bilibili data in the development environment (default false)
		coverMirror: "", // Cover image mirror source (optional, if you need to use a mirror source, such as "https://images.weserv.nl/?url=")
		useWebp: true, // Whether to use WebP format (default true)

		// bilibili viewing progress configuration instructions (optional, read carefully if configuration is required):
		// 1. Local development: Please fill in BILI_SESSDATA=your_SESSDATA in the .env file
		// 2. Remote build: Please add BILI_SESSDATA in GitHub repository Settings -> Secrets
		// Note: SESSDATA is the account credential. To prevent leakage, remember not to use hard coding.
		// Security tip: If SESSDATA has been leaked, please open the Bilibili mobile terminal -My -Settings -Security and Privacy -Login Device Management -One-click logout to destroy the leaked account credentials
	},

	anime: {
		mode: "local", // Fan drama page mode: "bangumi" uses Bangumi API, "local" uses local configuration, "bilibili" uses Bilibili API
	},

	// Article list layout configuration
	postListLayout: {
		// Default layout mode: "list" list mode (single column layout), "grid" grid mode (double column layout)
		// Note: If the sidebar configuration has "both" dual sidebars enabled, the post list "grid" grid (dual column) layout cannot be used
		defaultMode: "list",
		// Whether to allow users to switch layouts
		allowSwitch: true,
		// Article list page category navigation bar configuration
		categoryBar: {
			enable: true, // Whether to display the category navigation bar on the article list page
		},
	},

	// Label style configuration
	tagStyle: {
		// Whether to use the new style (hover highlight style) or the old style (outline always-on style)
		useNewStyle: false,
	},

	// Wallpaper mode configuration
	wallpaperMode: {
		// Default wallpaper mode: banner=top banner, fullscreen=full screen wallpaper, none=no wallpaper
		defaultMode: "banner",
		// Overall layout scheme switch button display settings (default: "desktop")
		// "off" = do not display
		// "mobile" = Display only on mobile devices
		// "desktop" = Display only on desktop
		// "both" = Show on all devices
		showModeSwitchOnMobile: "desktop",
	},

	banner: {
		// Supports single image or image array, automatically enables carousel when array length > 1
		src: {
			desktop: [
				"/assets/desktop-banner/tahoe_panorama_cropped.webp",
				"/assets/desktop-banner/taiwan_library.webp",
				"/assets/desktop-banner/taipei_panorama.webp",
				"/assets/desktop-banner/japan_river.webp",
			], // desktop banner image
			mobile: [
				"/assets/desktop-banner/tahoe_panorama_cropped.webp",
				"/assets/desktop-banner/taiwan_library.webp",
				"/assets/desktop-banner/taipei_panorama.webp",
				"/assets/desktop-banner/japan_river.webp",
			], // Mobile banner image
		}, // Use local banner image

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. Default is 'center'

		carousel: {
			enable: true, // When true: Enable carousel for multiple images. When false: randomly display a picture from the array
			interval: 4.5, // Carousel interval (seconds)
		},

		waves: {
			enable: true, // Whether to enable the water ripple effect (note: this function has a large performance overhead)
			performanceMode: false, // Performance mode: Reduce animation complexity (40% performance improvement)
			mobileDisable: false, // Disabled on mobile
		},

		// PicFlow API support (smart picture API)
		imageApi: {
			enable: false, // Enable image api
			url: "http://domain.com/api_v2.php?format=text&count=4", // Api address, returns the text of one image link per line
		},
		// Here we need to use the Text return type of the PicFlow API, so we need the format=text parameter
		// Project address: https://github.com/matsuzaka-yuki/PicFlow-API
		// Please build the API yourself

		homeText: {
			enable: true, // Display custom text on home page
			title: "Christopher Hoang", // Home Page Banner Main Title

			subtitle: [
				"Software Engineer",
				"Undergraduate Researcher",
				"FHL Vive Center for Enhanced Reality",
				"UC Berkeley RISELab/Sky Computing Lab",
			],
			typewriter: {
				enable: true, // Enable subtitle typewriter effect

				speed: 50, // Typing speed (milliseconds)
				deleteSpeed: 25, // Delete speed (milliseconds)
				pauseTime: 2000, // Pause time after full display (milliseconds)
			},
		},

		credit: {
			enable: false, // Show banner image source text

			text: "Describe", // source text to display
			url: "", // (Optional) URL link to original artwork or artist page
		},

		navbar: {
			transparentMode: "semifull", // Navigation bar transparency mode: "semi" semi-transparent with rounded corners, "full" fully transparent, "semifull" dynamic transparency
		},
	},
	toc: {
		enable: true, // Master switch, enable directory function
		mobileTop: true, // TOC button at the top of the mobile phone
		desktopSidebar: true, // PC sidebar TOC on the right
		floating: true, // Floating TOC button
		depth: 2, // Directory depth, 1-6, 1 means only h1 headers are displayed, 2 means h1 and h2 headers are displayed, and so on
		useJapaneseBadge: true, // Used in Japanese language name list (Aiueo...) Alternative numbers, opening order general 1, 2, 3... Modification A, I, U...
	},
	showCoverInContent: true, // Display article cover on article content page
	generateOgImages: false, // Enable the function of generating open graph images. Note that it takes a long time to render after enabling it. It is not recommended to enable it during local debugging.
	favicon: [
		// Leave blank to use the default favicon
		{
			src: '/assets/home/cut_fruit_lomon.webp', //Icon file path
		//   theme: 'light', //Optional, specify the theme 'light' | 'dark'
		//   sizes: '32x32', //optional, icon size
		}
	],

	// Font configuration
	font: {
		// Note: Custom fonts need to introduce font files in src/styles/main.css
		// Note: The font subset optimization function currently only supports TTF format fonts. After turning it on, you need to see the effect in the production environment. In the Dev environment, the browser default font is displayed!
		asciiFont: {
			// English font -highest priority
			// Specifying an English font will only retain a subset of ASCII characters, no matter how wide the font range is.
			fontFamily: "ZenMaruGothic-Medium",
			fontWeight: "400",
			localFonts: ["ZenMaruGothic-Medium.ttf"],
			enableCompress: true, // Enable font subset optimization to reduce font file size
		},
		cjkFont: {
			// CJK fonts -as fallback fonts
			fontFamily: "萝莉体 第二版",
			fontWeight: "500",
			localFonts: ["loli.ttf"],
			enableCompress: true, // Enable font subset optimization to reduce font file size
		},
	},
	showLastModified: true, // Switch to control the display of the "Last Edited" card
	pageProgressBar: {
		enable: true, // Enable the progress bar at the top of the page
		height: 3, // Progress bar height 3px
		duration: 6000, // Animation duration 6s
	},

	thirdPartyAnalytics: {
		enable: false, // Whether to enable third-party statistics (Microsoft Clarity). It is turned off by default. Enabling it may affect the Lighthouse score.
		clarityId: "", // Clarity project ID
	},
};
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	src: {
		desktop: [
			"/assets/desktop-banner/1.webp",
			"/assets/desktop-banner/2.webp",
			"/assets/desktop-banner/3.webp",
			"/assets/desktop-banner/4.webp",
			"/assets/desktop-banner/5.webp",
			"/assets/desktop-banner/6.webp",
		], // desktop banner image
		mobile: [
			"/assets/mobile-banner/1.webp",
			"/assets/mobile-banner/2.webp",
			"/assets/mobile-banner/3.webp",
			"/assets/mobile-banner/4.webp",
			"/assets/mobile-banner/5.webp",
			"/assets/mobile-banner/6.webp",
		], // Mobile banner image
	}, // Use local banner image
	position: "center", // Wallpaper position, equivalent to object-position
	carousel: {
		enable: true, // Enable carousel
		interval: 5, // Carousel interval (seconds)
	},
	zIndex: -1, // Layer, make sure the wallpaper is on the background layer
	opacity: 0.8, // wallpaper transparency
	blur: 1, // Background blur level
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		// Support custom navigation bar links and multi-level menus
		{
			name: "Portfolio",
			url: "#",
			icon: "material-symbols:developer-board",
			children: [
				{
					name: "Projects",
					url: "/projects/",
					icon: "material-symbols:work",
				},
				{
					name: "Timeline",
					url: "/timeline/",
					icon: "material-symbols:timeline",
				},
			],
		},
		{
			name: "Links",
			url: "/links/",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/matsuzaka-yuki/Mizuki",
					external: true,
					icon: "fa7-brands:github",
				},
				{
					name: "X (Twitter)",
					url: "https://x.com/hoangclam",
					external: true,
					icon: "fa7-brands:x-twitter",
				},
				{
					name: "Instagram",
					url: "https://www.instagram.com/xqchris/",
					external: true,
					icon: "fa7-brands:instagram",
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			icon: "material-symbols:person",
			children: [
				{
					name: "About",
					url: "/about/",
					icon: "material-symbols:person"
				},
				/*
				{
					name: "Anime",
					url: "/anime/",
					icon: "material-symbols:movie",
				},
				{
					name: "Diary",
					url: "/diary/",
					icon: "material-symbols:book",
				},
				{
					name: "Gallery",
					url: "/albums/",
					icon: "material-symbols:photo-library",
				},
				{
					name: "Devices",
					url: "/devices/",
					icon: "material-symbols:devices",
					external: false,
				},
				*/
			],
		},
		/*
		{
			name: "About",
			url: "/content/",
			icon: "material-symbols:info",
			children: [
				{
					name: "About",
					url: "/about/",
					icon: "material-symbols:person",
				},
				{
					name: "Friends",
					url: "/friends/",
					icon: "material-symbols:group",
				},
			],
		},
		*/
		{
			name: "Archive",
			url: "/archive/",
			icon: "material-symbols:info",
			children: [
				LinkPreset.Archive,
				{
					name: "Reports",
					url: "/reports/",
					icon: "material-symbols:group",
				},
			],
		}
		
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/headshot.jpg", // Relative to the /src directory. If starts with '/', relative to /public directory
	name: "Christopher Hoang",
	bio: "EECS @ Berkeley",
	typewriter: {
		enable: true, // Enable profile typewriter effect
		speed: 80, // Typing speed (milliseconds)
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/hoangchristopher",
		},
		{
			name: "Twitter",
			icon: "fa7-brands:x-twitter",
			url: "https://x.com/hoangclam",
		},
		{
			name: "Instagram",
			icon: "fa7-brands:instagram",
			url: "https://www.instagram.com/xqchris/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// Permalink fixed link configuration
export const permalinkConfig: PermalinkConfig = {
	enable: false, // Whether to enable the global permalink function, and use the default file name as the link when it is turned off.
	/**
	 * permalink format template
	 * Supported placeholders:
	 * -%year% : 4-digit year (2024)
	 * -%monthnum% : 2-digit month (01-12)
	 * -%day% : 2-digit date (01-31)
	 * -%hour% : 2-digit hour (00-23)
	 * -%minute% : 2-digit minute (00-59)
	 * -%second% : 2-digit seconds (00-59)
	 * -%post_id%: article serial number (arranged in ascending order of publication time, the earliest article is 1)
	 * -%postname%: article file name (slug)
	 * -%category%: category name ("uncategorized" when there is no category)
	 *
	 * Example:
	 * -"%year%-%monthnum%-%postname%" => "/2024-12-my-post/"
	 * -"%post_id%-%postname%" => "/42-my-post/"
	 * -"%category%-%postname%" => "/tech-my-post/"
	 *
	 * Note: Slash "/" is not supported, all generated links are in the root directory
	 */
	format: "%postname%", // Filename is used by default
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// NOTE: Some styles (like background color) have been overridden, see astro.config.mjs file.
	// Please select a dark theme as this blog theme currently only supports dark backgrounds
	theme: "github-dark",
	// Whether to hide code blocks when switching themes to avoid lag issues
	hideDuringThemeTransition: true,
};

export const commentConfig: CommentConfig = {
	enable: false, // Enable comments. When set to false, the comment component will not be displayed in the post area.
	system: "twikoo", // Comment system selection: "twikoo" | "giscus"
	twikoo: {
		envId: "https://twikoo.vercel.app",
		lang: SITE_LANG,
	},
	giscus: {
		repo: "your-github-username/your-repo-name",
		repoId: "your-repo-id",
		category: "Announcements",
		categoryId: "your-category-id",
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
	},
};

export const shareConfig: ShareConfig = {
	enable: true, // Enable sharing
};

export const announcementConfig: AnnouncementConfig = {
	title: "", // Announcement title, fill in the blanks using i18n string key.announcement
	content: "Feel free to reach out!", // Announcement content
	closable: true, // Allow users to close announcements
	link: {
		enable: true, // Enable link
		text: "Learn More", // link text
		url: "/about/", // Link URL
		external: false, // internal link
	},
};

export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // Enable music player functionality
	showFloatingPlayer: true, // Show floating player UI
	floatingEntryMode: "fab", // Floating entrance mode: "default" is an independent floating player, "fab" is integrated into the general FAB group
	mode: "local", // Music player mode, optional "local" or "meting"
	meting_api:
		"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Metering API address
	id: "14164869977", // playlist id
	server: "netease", // Music source server. Some meting api sources support more platforms. Generally speaking, netease=Netease Cloud Music, tencent=QQ Music, kugou=Kugou Music, xiami=Xiaomi Music, baidu=Baidu Music
	type: "playlist", // Play order type
};

export const footerConfig: FooterConfig = {
	enable: false, // Whether to enable Footer HTML injection function
	customHtml: "", // Custom footer information in HTML format, such as filing number, etc., left blank by default
	// You can also directly edit the FooterConfig.html file to add custom content such as registration numbers.
	// Note: If customHtml is not empty, the content in customHtml is used; if customHtml is left empty, the content in the FooterConfig.html file is used
	// FooterConfig.html may be deprecated in a future version
};

/**
 * Sidebar layout configuration
 * Used to control the display, sorting, animation, and responsive behavior of sidebar components
 * sidebar: Controls the sidebar (left or right) where the component is located. Note: Mobile versions usually do not display right column content. If the component is set to right, make sure layout.position is "both".
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// Sidebar component property configuration list
	properties: [
		{
			// Component type: User profile component
			type: "profile",
			// Component position: "top" means fixed at the top
			position: "top",
			// CSS class name used to apply styles and animations
			class: "onload-animation",
			// Animation delay time (milliseconds), used to stagger animation effects
			animationDelay: 0,
		},
		{
			// Component type: Announcement component
			type: "announcement",
			// Component position: "top" means fixed at the top
			position: "top",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 50,
		},
		{
			// Component type: Sidebar music component
			type: "music-sidebar",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 100,
		},
		{
			// Component type: Classification component
			type: "categories",
			// Component position: "sticky" means sticky positioning, scrollable
			position: "sticky",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 150,
			// Responsive configuration
			responsive: {
				// Folding threshold: Automatically fold when the number of categories exceeds 5
				collapseThreshold: 5,
			},
		},
		{
			// Component type: Label component
			type: "tags",
			// Component position: "sticky" indicates sticky positioning
			position: "top",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 250,
			// Responsive configuration
			responsive: {
				// Folding threshold: Automatically fold when the number of tags exceeds 20
				collapseThreshold: 20,
			},
		},
		{
			// Component type: card catalog component
			type: "card-toc",
			// Component location
			position: "sticky",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 200,
		},
		{
			// Component type: Site statistics component
			type: "site-stats",
			// Component location
			position: "top",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 200,
		},
		{
			// Component type: Calendar component (not displayed on mobile terminal)
			type: "calendar",
			// Component location
			position: "top",
			// CSS class name
			class: "onload-animation",
			// Animation delay time
			animationDelay: 250,
		},
	],

	// Sidebar component layout configuration
	components: {
		left: ["profile", "announcement", "calendar"],
		right: [],
		drawer: [
			"profile",
			"announcement",
			"music-sidebar",
			"categories",
			"tags",
		],
	},

	// Default animation configuration
	defaultAnimation: {
		// Whether to enable default animation
		enable: true,
		// Base latency (milliseconds)
		baseDelay: 0,
		// Incremental latency (milliseconds), incremental latency for each component in turn
		increment: 50,
	},

	// Responsive layout configuration
	responsive: {
		// Breakpoint configuration (pixel value)
		breakpoints: {
			// Mobile breakpoint: screen width less than 768px
			mobile: 768,
			// Tablet breakpoint: screen width less than 1280px
			tablet: 1280,
			// Desktop breakpoint: screen width is greater than or equal to 1440px
			desktop: 1440,
		},
	},
};

export const sakuraConfig: SakuraConfig = {
	enable: false, // Sakura effects are turned off by default
	sakuraNum: 21, // Sakura quantity
	limitTimes: -1, // Sakura crosses the limit number of times, 1 means infinite loop
	size: {
		min: 0.5, // Sakura minimum size multiple
		max: 1.1, // Sakura maximum size multiple
	},
	opacity: {
		min: 0.3, // Sakura minimum opacity
		max: 0.9, // Sakura maximum opacity
	},
	speed: {
		horizontal: {
			min: -1.7, // Minimum horizontal movement speed
			max: -1.2, // Maximum horizontal movement speed
		},
		vertical: {
			min: 1.5, // Minimum vertical movement speed
			max: 2.2, // Maximum vertical movement speed
		},
		rotation: 0.03, // Rotation speed
		fadeSpeed: 0.03, // Disappearance speed, should not be greater than minimum opacity
	},
	zIndex: 100, // Level to ensure that the cherry blossoms are displayed at the appropriate level
};

// Pio billboard girl configuration
export const pioConfig: import("./types/config").PioConfig = {
	enable: false, // Disable kanban girl to improve performance
	models: ["/pio/models/pio/model.json"], // Default model path
	position: "left", // Model location
	width: 280, // default width
	height: 250, // Default height
	mode: "draggable", // Default is draggable mode
	hiddenOnMobile: true, // Hidden by default on mobile devices
	dialog: {
		welcome: "Welcome to Mizuki Website!", // Welcome words
		touch: [
			"What are you doing?",
			"Stop touching me!",
			"HENTAI!",
			"Don't bully me like that!",
		], // Touch tip
		home: "Click here to go back to homepage!", // Home page tips
		skin: ["Want to see my new outfit?", "The new outfit looks great~"], // Tips for dressing up
		close: "QWQ See you next time~", // Close prompt
		link: "https://github.com/matsuzaka-yuki/Mizuki", // About links
	},
};

// Related articles Configuration
export const relatedPostsConfig: RelatedPostsConfig = {
	enable: true,
	maxCount: 5,
};

// Random article configuration
export const randomPostsConfig: RandomPostsConfig = {
	enable: true,
	maxCount: 5,
};

// Export all configured unified interfaces
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
	sakura: sakuraConfig,
	fullscreenWallpaper: fullscreenWallpaperConfig,
	pio: pioConfig,
	share: shareConfig,
	relatedPosts: relatedPostsConfig,
	randomPosts: randomPostsConfig,
} as const;

// Umami config related configurations have been moved to astro.config.mjs. Please insert the statistics script in the <head> of the layout.astro file by yourself.
