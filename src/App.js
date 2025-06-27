import React, { useState, useEffect, useRef } from "react";
import logo from "./NHV painters.svg"; // Make sure you have this logo in your src folder

const GlobalStyles = () => (
  <style>{`
    body {
        font-family: 'Inter', sans-serif;
        background-color: #1a202c; /* Dark background */
        color: #e2e8f0; /* Light text color */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
    }

    .slide-container {
        position: relative;
        width: 100%;
        max-width: 900px;
        background-color: #2d3748; /* Darker container background */
        border-radius: 1.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 5rem;
    }

    .slide {
        display: none;
        padding: 2rem;
        text-align: center;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        scroll-snap-align: start;
        min-height: calc(100vh - 40px - 5rem);
    }

    .slide.active {
        display: flex;
    }

    .slide-content {
        max-width: 700px;
        margin: 0 auto;
    }

    .navigation {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 900px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #1a202c;
        border-top: 1px solid #4a5568;
        border-bottom-left-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
    }

    .nav-button {
        background-color: #4f46e5;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-button:hover {
        background-color: #4338ca;
        transform: translateY(-2px);
    }

    .nav-button:disabled {
        background-color: #a78bfa;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }
    
    .slide-2-roles {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }
    @media (min-width: 768px) {
        .slide-2-roles {
            flex-direction: row;
            justify-content: center;
            gap: 3rem;
        }
    }
    .role-box {
        background-color: #4a5568;
        padding: 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid #718096;
        width: 100%;
        max-width: 300px;
    }
     .broken-bridge-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
        gap: 0.5rem;
    }
    .bridge-element {
        background-color: #4a5568;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        color: #e2e8f0;
    }
    .gap-line {
        width: 2px;
        height: 30px;
        background-color: #ef4444;
        margin: 0.5rem 0;
        position: relative;
    }
    .gap-line::before, .gap-line::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #ef4444;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);
    }
    .gap-line::before { top: -5px; }
    .gap-line::after { bottom: -5px; }

    .infographic-steps {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        text-align: left;
        margin-top: 1.5rem;
    }
    
    .infographic-steps div {
        background-color: #2c5282;
        padding: 0.75rem 1.25rem;
        border-left: 4px solid #63b3ed;
        border-radius: 0.5rem;
        font-weight: 500;
        color: #e2e8f0;
    }

    h2, h3, p {
        color: #e2e8f0;
    }
    
    /* Overriding text colors for the dark theme */
    .text-indigo-700 { color: #81e6d9 !important; }
    .text-gray-500 { color: #b0c4de !important; } /* Added for readability */
    .text-gray-600 { color: #a0aec0 !important; }
    .text-gray-700 { color: #a0aec0 !important; }
    .text-gray-800 { color: #e2e8f0 !important; }
    .text-blue-600 { color: #63b3ed !important; }
    .text-green-600 { color: #48bb78 !important; }
    .text-red-600 { color: #f56565 !important; }
    .text-red-500 { color: #f56565 !important; }
    .text-green-700 { color: #68d391 !important; }
    .text-purple-700 { color: #b794f4 !important; }
    .text-yellow-700 { color: #faf089 !important; }
    .text-cyan-700 { color: #81e6d9 !important; }
    .text-orange-700 { color: #f6ad55 !important; }
    .text-blue-700 { color: #63b3ed !important; }
    .text-pink-700 { color: #fbb6ce !important; }
    
    /* New class for dark text on light backgrounds */
    .dark-text-on-light-bg {
        color: #1a202c !important; 
        font-weight: 600; 
    }

    .logo-background {
    background-color: #e2e8f0; /* A light gray color */
    padding: 1rem;
    border-radius: 0.75rem;
    display: inline-block; /* To wrap the container around the logo */
    margin-top: 2rem;
}

  `}</style>
);

// Slide data is an array of objects, with each object's 'content' property holding valid JSX.
const slidesData = [
  {
    // Scene 1
    content: (
      <>
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">
          Bridging the Gap: Enhancing Communication in Paint Projects
        </h2>
        <p className="text-xl text-gray-600 mb-8 font-medium">
          For Project Managers & Project Consultants
        </p>
        <div className="text-7xl text-indigo-500 mb-10">
          🎨 <span className="text-5xl">📋</span>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
          "Effective communication is the backbone of any successful project,
          especially in dynamic industries like painting. When communication
          falters, it can lead to costly mistakes, misunderstandings, and
          ultimately, project failures."
        </p>
      </>
    ),
  },
  {
    // Scene 2
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Key Roles & Their Importance
        </h2>
        <div className="slide-2-roles mb-10">
          <div className="role-box">
            <div className="text-5xl mb-4 text-blue-600">🧮 📋</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Project Consultants (Estimators)
            </h3>
            <p className="text-gray-700">
              Meticulously create estimates for painting jobs.
            </p>
          </div>
          <div className="role-box">
            <div className="text-5xl mb-4 text-green-600">📞 👷</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Project Managers
            </h3>
            <p className="text-gray-700">
              Coordinate jobs and manage customer relationships.
            </p>
          </div>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed">
          "In a paint company, two roles are pivotal: Project Consultants, who
          meticulously create estimates, and Project Managers, who coordinate
          jobs and manage customer relationships. Their success is deeply
          intertwined."
        </p>
      </>
    ),
  },
  {
    // Scene 3
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          The Communication Divide
        </h2>
        <div className="broken-bridge-diagram mb-10">
          <div className="bridge-element">Estimates</div>
          <div className="gap-line"></div>
          <div className="bridge-element">Execution</div>
          <div className="flex justify-center gap-8 mt-6">
            <span className="text-4xl">💭 Client Expectations</span>
            <span className="text-4xl">🚧 Project Reality</span>
          </div>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed">
          "A common challenge arises when estimation and execution functions
          operate in silos. This disconnect between the initial estimate and the
          project's reality can lead directly to customer dissatisfaction and
          financial losses."
        </p>
      </>
    ),
  },
  {
    // Scene 4
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Understanding the Challenges: Misunderstood Scope
        </h2>
        <div className="relative mb-10 p-8 border-4 border-dashed border-gray-400 rounded-full w-64 h-64 flex justify-center items-center mx-auto">
          <span className="text-2xl font-semibold text-gray-700">
            Unclear Goals
          </span>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-blue-200 opacity-50 rounded-full w-48 h-48 animate-pulse"></div>
          </div>
          <div className="absolute -bottom-8 right-0 text-7xl transform rotate-45 text-red-500">
            ↗️
          </div>
        </div>
        <p className="text-2xl font-semibold text-red-600 mb-6">
          Misunderstood Project Goals / Scope
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "One major hurdle is misunderstood project goals or scope. Ambiguous
          requirements lead to a lack of cohesive direction and 'scope creep,'
          where unplanned work inflates costs and jeopardizes profitability."
        </p>
      </>
    ),
  },
  {
    // Scene 5
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Understanding the Challenges: Inaccurate Estimates
        </h2>
        <div className="mb-10 text-8xl text-red-500">⚖️</div>
        <p className="text-2xl font-semibold text-red-600 mb-6">
          Inaccurate Estimates (incl. Padding)
        </p>
        <div className="text-5xl text-gray-400 mb-6">🚫🤝</div>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Inaccurate estimates, often due to 'padding' when information is
          scarce, hide true risks. Project Managers then receive unrealistic
          schedules and budgets, leading to distrust and difficulty in
          execution."
        </p>
      </>
    ),
  },
  {
    // Scene 6
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Understanding the Challenges: Missed Deadlines & Efficiency Loss
        </h2>
        <div className="flex justify-center items-center gap-10 mb-10">
          <span className="text-8xl text-red-500">⏱️</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl text-gray-400">⛔</span>
            <span className="text-xl text-gray-600 font-semibold">
              Stalled Productivity
            </span>
            <span className="text-lg text-gray-500">(Workers waiting)</span>
          </div>
        </div>
        <p className="text-2xl font-semibold text-red-600 mb-6">
          Missed Deadlines & Decreased Productivity
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Poor communication also causes missed deadlines, impacting customer
          satisfaction. It reduces productivity as teams wait for vital
          information, and outdated technology can make things even worse."
        </p>
      </>
    ),
  },
  {
    // Scene 7
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Strategic Framework: Process Optimization (Standardization)
        </h2>
        <div className="text-8xl text-green-500 mb-10">⚙️➡️⚙️</div>
        <p className="text-2xl font-semibold text-green-700 mb-6">
          Process Optimization: Standardizing Information Flow
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "To improve, we need process optimization. This starts with clear
          project briefs and scope of work documents, detailing everything from
          paint types to surface preparation."
        </p>
      </>
    ),
  },
  {
    // Scene 8
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Strategic Framework: Structured Handovers
        </h2>
        <div className="flex justify-center items-center gap-6 mb-10">
          <span className="text-8xl text-blue-500">🏃‍♂️➡️🏃‍♀️</span>
          <span className="text-7xl text-purple-500">✅</span>
        </div>
        <p className="text-2xl font-semibold text-purple-700 mb-6">
          Structured Project Handover Checklists
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Implementing structured handover checklists ensures a smooth
          transition from estimation to execution, preventing critical
          information loss, minimizing delays, and avoiding cost overruns."
        </p>
      </>
    ),
  },
  {
    // Scene 9
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Strategic Framework: Communication Protocols
        </h2>
        <div className="relative w-64 h-64 bg-gray-100 rounded-xl mb-10 mx-auto border-4 border-indigo-300">
          <div className="absolute top-4 left-4 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            PM
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            PC
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-indigo-400 opacity-20">
            📊
          </div>
          <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-indigo-400 transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-1 bg-purple-400 transform -rotate-45"></div>
        </div>
        <p className="text-2xl font-semibold text-indigo-700 mb-6">
          Standardized Communication Protocols
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Establishing standardized communication protocols and reporting
          intervals creates a predictable flow of information. This includes
          defining purpose, stakeholders, methods, frequency, and accountability
          for updates."
        </p>
      </>
    ),
  },
  {
    // Scene 10
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Cultivating Interpersonal Effectiveness: Empathy
        </h2>
        <div className="flex justify-center items-center gap-8 mb-10">
          <span className="text-8xl text-green-500">🤝</span>
          <span className="text-6xl text-blue-400">💬</span>
        </div>
        <p className="text-2xl font-semibold text-green-700 mb-6">
          Cultivating Interpersonal Effectiveness: Empathy
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Beyond processes, empathy is crucial. Empathetic Project Managers
          build stronger relationships, foster collaboration, and lead to better
          decision-making by understanding others' viewpoints."
        </p>
      </>
    ),
  },
  {
    // Scene 11
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Cultivating Interpersonal Effectiveness: Active Listening
        </h2>
        <div className="flex justify-center items-center gap-8 mb-10">
          <span className="text-8xl text-yellow-500">👂</span>
          <span className="text-6xl text-gray-600">👤</span>
        </div>
        <p className="text-2xl font-semibold text-yellow-700 mb-6">
          Active Listening & Effective Questioning
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Active listening means fully concentrating, asking clarifying
          questions, and confirming understanding by paraphrasing. This uncovers
          hidden assumptions and ensures all nuances of an estimate or update
          are clear."
        </p>
      </>
    ),
  },
  {
    // Scene 12
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Cultivating Interpersonal Effectiveness: Collaborative Planning
        </h2>
        <div className="flex justify-center items-center gap-8 mb-10">
          <span className="text-8xl text-cyan-500">🧑‍🤝‍🧑</span>
          <span className="text-6xl text-gray-400">⬜</span>
        </div>
        <p className="text-2xl font-semibold text-cyan-700 mb-6">
          Promoting Collaborative Planning Sessions
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Encourage joint planning sessions from the start. Project Consultants
          and Managers can review documents, discuss alternatives, and establish
          achievable schedules together, fostering shared ownership."
        </p>
      </>
    ),
  },
  {
    // Scene 13
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Leveraging Technology: Integrated Platforms
        </h2>
        <div className="flex justify-center items-center gap-8 mb-10">
          <span className="text-8xl text-orange-500">💻</span>
          <span className="text-6xl text-red-500">📱</span>
          <span className="text-8xl text-blue-500">☁️</span>
        </div>
        <p className="text-2xl font-semibold text-orange-700 mb-6">
          Leveraging Technology: Integrated Platforms
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Technology is indispensable. Integrated project management tools
          centralize documentation, tasks, and progress tracking, breaking down
          geographical barriers and streamlining workflows."
        </p>
      </>
    ),
  },
  {
    // Scene 14
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Leveraging Technology: Specific Software
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-xl font-semibold">
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            Knowify
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            PaintScout
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            Jobber
          </div>
        </div>
        <p className="text-2xl font-semibold text-red-700 mb-6">
          Industry-Specific Software: Knowify, PaintScout, Jobber
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Software like Knowify, PaintScout, and Jobber offer features from
          precise estimating and job costing to client portals and automated
          communication, specifically designed for painting contractors."
        </p>
      </>
    ),
  },
  {
    // Scene 15
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Leveraging Technology: General Tools
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-xl font-semibold">
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            Slack
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            ClickUp
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow dark-text-on-light-bg">
            Google Docs
          </div>
        </div>
        <p className="text-2xl font-semibold text-blue-700 mb-6">
          General Tools: Slack, ClickUp, Google Docs, etc.
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "General tools like Slack for real-time chat, ClickUp for task
          management, and Google Docs for file sharing also significantly
          enhance collaboration and efficiency."
        </p>
      </>
    ),
  },
  {
    // Scene 16
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Developing a Communication Plan - Key Steps
        </h2>
        <div className="infographic-steps mb-10 mx-auto">
          <div>1. Choose Format</div>
          <div>2. Set Goal</div>
          <div>3. Identify Stakeholders</div>
          <div>4. Identify Methods</div>
          <div>5. Determine Frequency</div>
          <div>6. Assign Roles</div>
        </div>
        <p className="text-xl text-gray-800 leading-relaxed">
          "To formalize improvement, develop a tailored communication plan. This
          involves choosing a format, setting clear goals, identifying all
          stakeholders and their needs, selecting methods, determining
          frequency, and assigning roles for accountability."
        </p>
      </>
    ),
  },
  {
    // Scene 17
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Sustaining Improvement: Feedback Loops
        </h2>
        <div className="text-9xl text-pink-500 mb-10">🔄</div>
        <p className="text-2xl font-semibold text-pink-700 mb-6">
          Sustaining Improvement: Continuous Feedback Loops
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "Finally, establish continuous feedback loops. Regularly collect input
          from teams and clients, analyze it, prioritize changes, implement
          adjustments, and continuously monitor their effectiveness. This
          fosters a culture of learning and adaptation."
        </p>
      </>
    ),
  },
  {
    // Scene 18
    content: (
      <>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">
          Conclusion: Operational Excellence
        </h2>
        <div className="flex justify-center items-center gap-8 mb-10">
          <span className="text-8xl text-purple-500">👥</span>
          <span className="text-7xl text-green-500">📈</span>
        </div>
        <p className="text-2xl font-semibold text-purple-700 mb-6">
          Unlock Operational Excellence & Profitability
        </p>
        <p className="text-xl text-gray-800 leading-relaxed">
          "By optimizing processes, cultivating interpersonal skills, and
          leveraging technology, painting companies can achieve more accurate
          estimates, smoother project handoffs, reduced costs, and ultimately,
          higher customer satisfaction and profitability."
        </p>
      </>
    ),
  },
  {
    // Scene 19
    content: (
      <>
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">
          Start Your Transformation Today!
        </h2>
        <div className="text-8xl text-yellow-500 mb-10">✨</div>
        <p className="text-2xl font-semibold text-gray-800 mb-8">
          "Invest in these strategies to build a more cohesive, productive, and
          profitable operation. Your team and your customers will thank you."
        </p>
        <div className="logo-background">
          <img src={logo} alt="Company Logo" className="rounded-lg shadow-md" />
        </div>
      </>
    ),
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef([]);

  // This ensures our refs array is the same size as our data array.
  // It creates a new ref for each slide on the initial render.
  if (slideRefs.current.length !== slidesData.length) {
    slideRefs.current = Array(slidesData.length)
      .fill()
      .map((_, i) => slideRefs.current[i] || React.createRef());
  }

  // This effect handles the scrolling when the currentSlide state changes
  useEffect(() => {
    // We check if the ref for the current slide exists before trying to scroll.
    if (
      slideRefs.current[currentSlide] &&
      slideRefs.current[currentSlide].current
    ) {
      slideRefs.current[currentSlide].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
    <>
      <GlobalStyles />
      <div className="slide-container">
        <div id="slides-wrapper">
          {slidesData.map((slide, index) => (
            <div
              // Assign the corresponding ref to the slide div
              ref={slideRefs.current[index]}
              // The 'active' className makes the current slide visible
              className={`slide ${index === currentSlide ? "active" : ""}`}
              key={index}
            >
              <div className="slide-content">{slide.content}</div>
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
          <span className="text-lg font-medium" style={{ color: "#a0aec0" }}>
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
    </>
  );
}

export default App;