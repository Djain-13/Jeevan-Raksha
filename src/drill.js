import React, { useState } from 'react';
import './drill.css';

const scenarios = {
    earthquake: {
        title: "Earthquake: The Library",
        keyTakeaways: [
            "Always DROP, COVER, and HOLD ON during an earthquake.",
            "After the shaking, assess your surroundings for hazards before moving.",
            "Evacuate calmly using stairs, never elevators, and help others if it's safe.",
            "In an open area, stay away from buildings, trees, and power lines.",
            "After a disaster, rely on official sources for information, not rumors."
        ],
        story: [
            {
                image: '/images/firsteq.png',
                narrative: "You and your friend Sam are on the third floor of the college library, cramming for a history final. 'I can't memorize another date,' Sam groans. Suddenly, the floor lurches violently. The sound is deafening—a roar mixed with the groaning of steel and the shattering of glass. Sam freezes, his eyes wide with panic. What's your immediate instruction to him?",
                choices: [
                    { text: "'Sam, get under the table! Now!'", consequence: "Your sharp command cuts through his panic. You both dive under the heavy oak table. Books and ceiling tiles rain down, but the table holds strong. This was the correct, life-saving action.", isCorrect: true },
                    { text: "'Let's get out of here! Run!'", consequence: "You try to pull a terrified Sam towards the exit, but the floor is moving too violently. A massive bookshelf topples over, blocking your path. Trying to run during a quake is a recipe for disaster.", isCorrect: false }
                ]
            },
            {
                image: '/images/secondeq.png',
                narrative: "The main shaking subsides, leaving a ringing silence broken by the blare of a fire alarm. As you're about to crawl out, a short, sharp aftershock hits. A tall metal bookshelf, already leaning precariously, wobbles. You see another student frozen in fear, partially pinned under a fallen chair right in the bookshelf's path.",
                choices: [
                    { text: "Yell at the student to crawl away while you try to brace the shelf.", consequence: "You push against the wobbling shelf with all your might. 'Get out of there!' you scream. The student snaps out of it and scrambles to safety just as the shelf crashes down where they were moments before. Your quick thinking and decisive action saved them from serious injury.", isCorrect: true },
                    { text: "Pull Sam further under the table to make sure he is safe.", consequence: "Prioritizing only your own safety, you ignore the other student. The bookshelf topples with a deafening crash. While you and Sam are unharmed, your inaction meant the other student couldn't get away in time and is now crying out in pain. In emergencies, awareness of others is critical.", isCorrect: false }
                ]
            },
            {
                image: '/images/thirdeq.png',
                narrative: "The building is groaning, and dust fills the air. It's time to evacuate. The main emergency staircase is visible, but the path is partially blocked by a heavy, overturned cabinet. The back stairwell, usually for staff, should be clear, but it's further away and less familiar.",
                choices: [
                    { text: "Organize a group to move the cabinet and clear the main stairs.", consequence: "You and a few other students work together, managing to shove the heavy cabinet aside. This clears the primary, safest exit for everyone on the floor to evacuate in an orderly manner. Teamwork was the key.", isCorrect: true },
                    { text: "Take Sam and head for the unfamiliar back stairs.", consequence: "You find the back stairs, but the door is jammed shut from the building shifting. You've wasted precious minutes and now have to backtrack through the unstable library to the main exit anyway. Sticking to the designated, known escape route is usually the best plan.", isCorrect: false }
                ]
            },
            {
                image: '/images/fourtheq.png',
                narrative: "You make it outside to the designated assembly point on the lawn. Hundreds of students are gathered, shaken but mostly safe. You see your professor, Dr. Evans, trying to organize everyone. Just then, you notice another student nearby clutching their leg, a dark stain of blood spreading on their jeans.",
                choices: [
                    { text: "Help the injured student and send someone to get Dr. Evans.", consequence: "You rush to the student, applying pressure to the wound with your sweatshirt. 'Sam, go get Dr. Evans, tell her we have a serious injury here!' you command. Your quick thinking provides immediate aid while also alerting professional help. This is excellent emergency triage.", isCorrect: true },
                    { text: "Find Sam and make sure he's okay first.", consequence: "You prioritize finding Sam in the crowd. While you're looking for him, precious minutes pass. When you finally return to where the injured student was, you see that others have already helped them, but your delay could have been critical in a real emergency.", isCorrect: false }
                ]
            }
        ]
    }
};

function DrillGame({ onBack }) {
    const [currentScreen, setCurrentScreen] = useState('start');
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showConsequence, setShowConsequence] = useState(false);
    const [lastChoice, setLastChoice] = useState(null);

    const startDrill = () => {
        setCurrentScreen('scenario');
    };

    const selectScenario = (scenarioKey) => {
        setSelectedScenario(scenarioKey);
        setCurrentStep(0);
        setShowConsequence(false);
        setCurrentScreen('drill');
    };

    const makeChoice = (choice) => {
        setLastChoice(choice);
        setShowConsequence(true);
        
        setTimeout(() => {
            if (currentStep < scenarios[selectedScenario].story.length - 1) {
                setCurrentStep(currentStep + 1);
                setShowConsequence(false);
            } else {
                setCurrentScreen('end');
            }
        }, 3000);
    };

    const resetGame = () => {
        setCurrentScreen('start');
        setSelectedScenario(null);
        setCurrentStep(0);
        setShowConsequence(false);
        setLastChoice(null);
    };

    const currentStory = selectedScenario ? scenarios[selectedScenario].story[currentStep] : null;
    const progress = selectedScenario ? ((currentStep + 1) / scenarios[selectedScenario].story.length) * 100 : 0;

    return (
        <div id="game-container">
            {currentScreen === 'start' && (
                <div id="start-screen" className="fade-in">
                    <h1>Disaster Ready</h1>
                    <h2>The Hero's Drill</h2>
                    <p>
                        Test your emergency response skills through realistic scenarios. 
                        Make critical decisions and learn life-saving techniques.
                    </p>
                    <div className="button-group">
                        <button className="btn btn-primary" onClick={startDrill}>
                            Start Training
                        </button>
                        {onBack && (
                            <button className="btn btn-secondary" onClick={onBack}>
                                Back to Home
                            </button>
                        )}
                    </div>
                </div>
            )}

            {currentScreen === 'scenario' && (
                <div id="scenario-screen" className="fade-in">
                    <div className="header">
                        <h2>Choose Your Scenario</h2>
                    </div>
                    <p>Select a disaster scenario to begin your training:</p>
                    
                    <div className="scenario-card" onClick={() => selectScenario('earthquake')}>
                        <h3>Earthquake Emergency</h3>
                        <p>Navigate through a major earthquake in a college library. Learn proper drop, cover, and hold techniques.</p>
                    </div>
                </div>
            )}

            {currentScreen === 'drill' && currentStory && (
                <div id="drill-screen" className="fade-in">
                    <div className="header">
                        <div className="scenario-title">
                            {scenarios[selectedScenario].title}
                        </div>
                        <button className="header-btn" onClick={() => setCurrentScreen('scenario')}>
                            Change Scenario
                        </button>
                    </div>

                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: progress + '%' }}></div>
                    </div>

                    <div className="image-container">
                        <img 
                            src={currentStory.image} 
                            alt="Scenario" 
                            className="scenario-image"
                        />
                    </div>

                    <div className="narrative-box">
                        <div className="narrative-text">
                            {currentStory.narrative}
                        </div>
                    </div>

                    {showConsequence && lastChoice ? (
                        <div className="narrative-box">
                            <div className="narrative-text">
                                <strong>Result:</strong> {lastChoice.consequence}
                            </div>
                        </div>
                    ) : (
                        <div className="options-container">
                            {currentStory.choices.map((choice, index) => (
                                <button
                                    key={index}
                                    className="option-btn"
                                    onClick={() => makeChoice(choice)}
                                >
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {currentScreen === 'end' && (
                <div id="end-screen" className="fade-in">
                    <h2>Training Complete!</h2>
                    <p>Congratulations on completing the emergency drill. Here are the key takeaways:</p>
                    
                    <div className="takeaways-box">
                        <h3>Key Takeaways</h3>
                        <ul>
                            {scenarios[selectedScenario].keyTakeaways.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="button-group">
                        <button className="btn btn-primary" onClick={resetGame}>
                            Try Again
                        </button>
                        <button className="btn btn-secondary" onClick={() => setCurrentScreen('scenario')}>
                            New Scenario
                        </button>
                        {onBack && (
                            <button className="btn btn-secondary" onClick={onBack}>
                                Back to Home
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DrillGame;