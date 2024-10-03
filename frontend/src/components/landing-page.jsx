import mainLogo from '../assets/main-logo.png'
import heroImage1 from '../assets/hero-image-1.jpeg'
import heroImage2 from '../assets/hero-image-2.jpeg'
import heroImage3 from '../assets/hero-image-3.jpeg'
import heroImage from '../assets/hero-image.png'
function LandingPage() {
	function Button(props) {
		return (
			<button
				className={`
                ${props.color} 
                mr-2
                rounded-2xl 
                text-primary 
                text-lg 
                font-bold 
                font-roboto 
                px-5 
                py-2
                `}>
				{props.text}
			</button>
		)
	}
	return (
		<div className='landing-page'>
			{/* ======= Header Start ======= */}
			<header className='flex items-center'>
				{/* ------- logo Start --------- */}
				<div className='logo size-28'>
					<img src={mainLogo} alt='main logo' className='size-full' />
				</div>
				{/* ------- logo End --------- */}
				{/* ------- login Section Start --------- */}
				<div className='login-section ml-auto'>
					<Button color='bg-classic-blue' text='Sign In' />
					<Button color='bg-classic-red' text='Sign Up' />
				</div>
				{/* ------- login Section End --------- */}
			</header>
			{/* ======= Header End ======= */}
			{/* ======= Hero Section Start ======= */}
            <div className="hero-section flex items-center">
                <div className="left-section flex-1">
                    <h2 className='text-classic-red text-2xl'>Welcome to Portfolify</h2>
                    <h1 className='text-blue-text text-6xl font-bold'>Building Your Digital Presence</h1>
                </div>
                <div className="right-section flex-1">
                    <div className="hero-image relative">
                        <img src={heroImage} alt="hero image" />
                            {/* <img className='rounded-3xl absolute w-56 top-4' src={heroImage3} alt="heroImage3" />
                            <img className='rounded-3xl absolute w-56 top-2' src={heroImage2} alt="heroImage2" />
                            <img className='rounded-3xl absolute w-56 top-0'  src={heroImage1} alt="heroImage1" /> */}
                    </div>
                </div>
            </div>
			{/* ======= Hero Section End ======= */}
		</div>
	)
}

export default LandingPage
