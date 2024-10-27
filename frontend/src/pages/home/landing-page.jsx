import mainLogo from "../../assets/images/main-logo.png";
import heroImage1 from "../../assets/images/hero-image.png"
import { Link } from "react-router-dom";
function LandingPage() {
	function Button({ color, color2, text }) {
		return (
			<Link
				to = {text=== 'Sign In'? '/login' : '/signup'}
				className={`
                ${color} 
                mr-2
                rounded-2xl 
                text-primary-50
                text-sm 
                font-bold 
                font-roboto 
				px-8
				sm:px-16
                py-2
				hover:${color2}
                `}
			>
				{text}
			</Link>
		);
	}
	return (
		<div className="landing-page bg-primary-50 p-6 w-full">
			<div className="wrapper  max-w-6xl mx-auto">
				<div className="hero  mt-5 min-h-[400px] md:h-[600px] flex flex-col  ">
					{/* ======= Header Start ======= */}
					 {/* <header className="flex items-center justify-center"> */}
						{/* ------- logo Start --------- */}
						{/* <div className="logo size-28">
							<img src={mainLogo} alt="main logo" className="size-full" />
						</div> */}
						{/* ------- logo End --------- */}
						{/* ------- login Section Start --------- */}
						{/* <div className="login-section ml-auto hidden sm:block">
							<Button color="bg-classic-blue" text="Sign In" />
							<Button color="bg-classic-red" text="Sign Up" />
						</div> */}
						{/* ------- login Section End --------- */}
					{/* </header>  */} 
					{/* ======= Header End ======= */}
					{/* ======= Hero Section Start ======= */}
					<div className="hero-section flex flex-col  sm:flex-row sm:items-center flex-grow  ">
						<div className="left-section  flex-1 flex flex-col items-center">
							<h2 className=" w-[200px] text-classic-red text-sm font-medium text-center py-[2px] px-[1.5px] my-5 bg-gradient-to-r from-green-400 via-green-500 via-blue-900 via-purple-600 to-classic_red-600 rounded-full " >
								<div className=" bg-primary-50 rounded-full p-2">
									WELCOME TO PORTFOLIFY
								</div>
							</h2>
							<h1 className="text-text-600 text-4xl text-center sm:text-center sm:text-5xl md:text-8xl">
								Building Your Digital Presence
							</h1>
							<p className=" text-center text-text-400 my-7 text-[1rem] ms:text-xl   md:w-[60%] w-[100%]">Portfolify is your all-in-one platform for effortlessly presenting your personal brand or skills to the world.</p>
							<div className=" login-section flex flex-row text-center sm:text-left mt-6 space-x-2">
								<Button color="bg-classic_blue-900" color2 = "bg-classic_blue-800" text="Sign In" />
								<Button color="bg-classic_red-700" color2 = "bg-classic_red-600" text="Sign Up" />
							</div>
						</div>
						{/* <div className="right-section flex-1 flex justify-center sm:justify-end">
							<div className="hero-imag w-80 mt-20 text-center">
								<img src={heroImage} alt="hero image" />
							</div>
						</div> */}
					</div>
				</div>
				{/* ======= Hero Section End ======= */}
				{/* ======= Main Section Start ======= */}
				<div className="main-section flex flex-col items-center justify-between  md:flex-row my-11 ">
					<div className="left-section flex-1 mb-10">
						<div className="main-image w-full sm:w-[500px]">
							<img src={heroImage1} alt="" className=" md:h-[600px] h-[300px] " />
						</div>
					</div>
					<div className="right-section flex-1 text-xl text-text-400 text-center ">
						<p className="text-text-600 font-bold">Elevate your professional portfolio with Portfolify.</p>
						<br />
						<br />
						<p>
							Portfolify helps developers showcase their coding skills,
							projects, and experiences in a polished and professional way. With
							customizable templates and live project demos, you can easily
							highlight your unique talents and work.
						</p>
						<br />
						<p>
							Whether you're seeking new job opportunities or building your
							personal brand, Portfolify provides the tools you need to create a
							sleek, modern portfolio that stands out.
						</p>
					</div>
				</div>
				{/* ======= Main Section End ======= */}
				{/* ======= Features Section Start ======= */}
				<div className="features-section mt-16">
					<h1 className="text-text-600 text-2xl sm:text-3xl font-bold text-center">
						Why Choose Portfolify?
					</h1>
					{/* ========= Row Start ========== */}
					<div className="row flex flex-col sm:flex-row gap-4 mt-16">
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
						<div className="w-12">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#174D6F" d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"/></svg>
						</div>
							<h5 className="ml-3 text-text-600 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-text-400 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<h5 className="ml-3 text-slate-800 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-slate-600 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<h5 className="ml-3 text-slate-800 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-slate-600 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					</div>
					{/* ========= Row End ========== */}
					{/* ========= Row Start ========== */}
					<div className="row flex flex-col sm:flex-row gap-4 mt-4">
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<h5 className="ml-3 text-slate-800 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-slate-600 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<h5 className="ml-3 text-slate-800 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-slate-600 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					{/* ------------ Card Start ------------ */}
					<div className="relative flex-1 flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-6">
						<div className="flex items-center mb-4">
							<h5 className="ml-3 text-slate-800 text-xl font-semibold">
								Website Review Check
							</h5>
						</div>
						<p className="block text-slate-600 leading-normal font-light mb-4">
							Because it&apos;s about motivating the doers. Because I&apos;m
							here to follow my dreams and inspire others.
						</p>
					</div>
					{/* ------------ Card End ------------ */}
					</div>
					{/* ========= Row End ========== */}
				</div>
				{/* ======= Features Section End ======= */}
			</div>
			
		</div>
	);
}

export default LandingPage;
