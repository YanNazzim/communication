import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the stylesheet

// It's cleaner to manage slide data in an array of objects
const slidesData = [
  {
    // Scene 1
    content: (
      <>
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">Bridging the Gap: Enhancing Communication in Paint Projects</h2>
        <p className="text-xl text-gray-600 mb-8 font-medium">For Project Managers & Project Consultants</p>
        <div className="text-7xl text-indigo-500 mb-10">
          🎨 <span className="text-5xl">📋</span>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">"Effective communication is the backbone of any successful project... When communication falters, it can lead to costly mistakes, misunderstandings, and ultimately, project failures."</p>
      </>
    ),
  },
  {
    // Scene 2
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">Key Roles & Their Importance</h2>
        <div className="slide-2-roles mb-10">
          <div className="role-box">
            <div className="text-5xl mb-4 text-blue-600">🧮 📋</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Project Consultants (Estimators)</h3>
            <p className="text-gray-700">Meticulously create estimates for painting jobs.</p>
          </div>
          <div className="role-box">
            <div className="text-5xl mb-4 text-green-600">📞 👷</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Project Managers</h3>
            <p className="text-gray-700">Coordinate jobs and manage customer relationships.</p>
          </div>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed">"In a paint company, two roles are pivotal... Their success is deeply intertwined."</p>
      </>
    ),
  },
  // Add all 19 of your slides here in the same object format...
  // To keep this example concise, I've only included the first two.
  // The full data structure should contain all 19 slides.
  // For example, the last slide would be:
  {
    // Scene 19
    content: (
      <>
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">Start Your Transformation Today!</h2>
        <div className="text-8xl text-yellow-500 mb-10">✨</div>
        <p className="text-2xl font-semibold text-gray-800 mb-8">"Invest in these strategies to build a more cohesive, productive, and profitable operation. Your team and your customers will thank you."</p>
        <img src="https://placehold.co/200x80/6366f1/ffffff?text=Your+Company+Logo" alt="Company Logo Placeholder" className="mt-8 rounded-lg shadow-md" />
      </>
    )
  }
];


function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef([]); // To hold references to slide elements

  // Create refs for each slide
  slideRefs.current = slidesData.map(
    (_, i) => slideRefs.current[i] ?? React.createRef()
  );

  // This effect handles the scrolling when the currentSlide state changes
  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentSlide]);


  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="slide-container">
      <div id="slides-wrapper">
        {slidesData.map((slide, index) => (
          <div
            // Use the ref from our array
            ref={slideRefs.current[index]}
            // Add 'active' class to the current slide for it to be visible
            className={`slide p-8 bg-white flex flex-col justify-center items-center ${index === currentSlide ? 'active' : ''}`}
            key={index}
          >
            <div className="slide-content">
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button
          onClick={prevSlide}
          className="nav-button"
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700">
          Slide {currentSlide + 1} of {slidesData.length}
        </span>
        <button
          onClick={nextSlide}
          className="nav-button"
          disabled={currentSlide === slidesData.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;