import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShieldAlt, faChild, faUserGraduate, faUniversity, faUserShield, 
    faArrowRight, faFlagCheckered, faRedo, faTrophy, faMedal 
} from '@fortawesome/free-solid-svg-icons';
import './quiz_main.css';

// --- QUESTION DATABASE ---
const questions = [
    { type: "mcq", difficulty: "easy", question: "What is the FIRST thing you should do in an earthquake?", options: ["Run outside", "Stand in a doorway", "Drop, Cover, and Hold On", "Call for help"], answer: "c", topic: "quakeProof" },
    { type: "truefalse", difficulty: "easy", question: "You should always have a 'Go-Bag' ready.", options: ["True", "False"], answer: "a", topic: "goBagGuru" },
    { type: "mcq", difficulty: "easy", question: "If you see floodwaters, what is the safest action?", options: ["Drive through it slowly", "Walk through if it's not deep", "Turn Around, Don't Drown®", "Wait for it to stop raining"], answer: "c", topic: "floodReady" },
    { type: "truefalse", difficulty: "easy", question: "Use water to put out a grease fire in the kitchen.", options: ["True", "False"], answer: "b", topic: "fireSafety" },
    { type: "mcq", difficulty: "easy", question: "What does the 'S' in P.A.S.S. for fire extinguishers stand for?", options: ["Shout", "Spray", "Squeeze", "Safety"], answer: "c", topic: "fireSafety" },
    { type: "mcq", difficulty: "medium", question: "How often should you replace emergency kit supplies?", options: ["Every month", "Every 6-12 months", "Every 5 years", "Only when used"], answer: "b", topic: "goBagGuru" },
    { type: "mcq", difficulty: "medium", question: "What does 'CPR' stand for?", options: ["Cardiac Pulse Recovery", "Cardiopulmonary Resuscitation", "Chest Pumping Routine", "Critical Patient Response"], answer: "b", topic: "firstAid" },
    { type: "truefalse", difficulty: "medium", question: "The 'eye' of a hurricane is the most dangerous part.", options: ["True", "False"], answer: "b", topic: "cycloneSentinel" },
    { type: "mcq", difficulty: "medium", question: "What does the Richter scale measure?", options: ["Shaking duration", "Damage caused", "Magnitude (energy released)", "Epicenter depth"], answer: "c", topic: "quakeProof" },
    { type: "truefalse", difficulty: "hard", question: "A portable generator is safe in a garage if the door is open.", options: ["True", "False"], answer: "b", topic: "preparedness" },
    { type: "mcq", difficulty: "hard", question: "What is the '30/30 Rule' for lightning?", options: ["Shelter if lightning is 30 miles away, wait 30 mins", "If thunder is <=30s after lightning, seek shelter; wait 30 mins after last thunder", "Stay indoors 30 mins before and after", "Limit outdoor time to 30 mins"], answer: "b", topic: "preparedness" },
    { type: "mcq", difficulty: "hard", question: "What is a '100-year flood'?", options: ["A flood every 100 years", "Worst flood in 100 years", "A flood over 100 feet deep", "A flood with a 1% chance of happening in any year"], answer: "d", topic: "floodReady" },
];

const Quiz = () => {
    // Game flow state: 'levelSelection', 'quiz', 'results'
    const [gameState, setGameState] = useState('levelSelection');
    
    // Quiz-specific state
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [newBadges, setNewBadges] = useState([]);

    // Player progress state
    const [streak, setStreak] = useState(0);
    const [playerData, setPlayerData] = useState({
        level: 1,
        xp: 0,
        badgesEarned: [],
    });

    // Load player data from localStorage on initial render
    useEffect(() => {
        const savedData = localStorage.getItem('disasterQuizUser');
        if (savedData) {
            setPlayerData(JSON.parse(savedData));
        }
    }, []);

    // Save player data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('disasterQuizUser', JSON.stringify(playerData));
    }, [playerData]);

    const currentQuestion = useMemo(() => filteredQuestions[currentQuestionIndex], [filteredQuestions, currentQuestionIndex]);

    const startQuiz = (difficulty) => {
        const questionsForLevel = questions.filter(q => q.difficulty === difficulty);
        setFilteredQuestions(questionsForLevel);
        setCurrentQuestionIndex(0);
        setScore(0);
        setStreak(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setNewBadges([]);
        setGameState('quiz');
    };

    const handleAnswer = (option, index) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer({ index, text: option });

        const correctAnswerIndex = currentQuestion.answer.charCodeAt(0) - 97;
        if (index === correctAnswerIndex) {
            setScore(prev => prev + 1);
            setStreak(prev => prev + 1);
            // Add XP and handle leveling up
            setPlayerData(prev => {
                const newXp = prev.xp + 10 + (streak * 2);
                if (newXp >= 100) {
                    return { ...prev, xp: newXp % 100, level: prev.level + 1 };
                }
                return { ...prev, xp: newXp };
            });
        } else {
            setStreak(0);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
        } else {
            // End of quiz - calculate results
            const percentage = Math.round((score / filteredQuestions.length) * 100);
            let earnedBadges = [];

            // Logic to award badges
            if(score / filteredQuestions.length > 0.5) { // Example: award badge for >50% correct
                const topic = currentQuestion.topic;
                if(!playerData.badgesEarned.includes(topic)){
                    earnedBadges.push(topic);
                }
            }

            if(earnedBadges.length > 0) {
                setNewBadges(earnedBadges);
                setPlayerData(prev => ({
                    ...prev,
                    badgesEarned: [...prev.badgesEarned, ...earnedBadges]
                }));
            }
            setGameState('results');
        }
    };

    const resetQuiz = () => {
        setGameState('levelSelection');
    };
    
    // --- RENDER LOGIC ---

    if (gameState === 'levelSelection') {
        return (
            <div className="container">
                <header className="header fade-in">
                    <h1><FontAwesomeIcon icon={faShieldAlt} /> JEEVAN RAKSHA</h1>
                    <p>Disaster Preparedness Quiz Challenge</p>
                </header>
                <div className="level-selection fade-in">
                    <LevelCard icon={faChild} title="Beginner" desc="Learn the fundamental safety basics." reward="🏆 Earn Skill Badges" onClick={() => startQuiz('easy')} />
                    <LevelCard icon={faUserGraduate} title="Intermediate" desc="Advance your response techniques." reward="⚡ Earn More XP" onClick={() => startQuiz('medium')} />
                    <LevelCard icon={faUniversity} title="Advance" desc="Master complex scenarios to become a hero." reward="💎 Unlock Hero Badge" onClick={() => startQuiz('hard')} />
                </div>
            </div>
        );
    }

    if (gameState === 'quiz') {
        return (
            <div className="quiz-container fade-in">
                <PlayerStats level={playerData.level} xp={playerData.xp} streak={streak} />
                <div className="quiz-header">
                    <div className="question-counter">{`Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`}</div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}></div>
                    </div>
                </div>
                <div className="character">
                    <div className="character-avatar"><FontAwesomeIcon icon={faUserShield} /></div>
                    <div className="character-speech">{isAnswered ? (selectedAnswer.index === (currentQuestion.answer.charCodeAt(0) - 97) ? "Correct! Great job!" : "Not quite. Let's keep trying!") : `Question ${currentQuestionIndex + 1}: Stay focused!`}</div>
                </div>
                <div className="question">
                    <h3 className="question-text">{currentQuestion.question}</h3>
                    <div className="options">
                        {currentQuestion.options.map((option, index) => {
                            const letter = String.fromCharCode(65 + index);
                            let optionClass = 'option';
                            if (isAnswered) {
                                const correctAnswerIndex = currentQuestion.answer.charCodeAt(0) - 97;
                                if (index === correctAnswerIndex) {
                                    optionClass += ' correct';
                                } else if (selectedAnswer.index === index) {
                                    optionClass += ' incorrect';
                                }
                            }
                            return (
                                <div key={index} className={optionClass} onClick={() => handleAnswer(option, index)}>
                                    <div className="option-letter">{letter}</div>
                                    <div className="option-text">{option}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="quiz-navigation">
                    <button className="nav-button" onClick={handleNext} disabled={!isAnswered}>
                        {currentQuestionIndex === filteredQuestions.length - 1 ? 'Submit Challenge' : 'Next'} <FontAwesomeIcon icon={currentQuestionIndex === filteredQuestions.length - 1 ? faFlagCheckered : faArrowRight} />
                    </button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'results') {
        const percentage = Math.round((score / filteredQuestions.length) * 100);
        let scoreText;
        if (percentage >= 80) scoreText = "Outstanding! You're a true survival expert!";
        else if (percentage >= 50) scoreText = "Good work! Your skills are sharp.";
        else scoreText = "A good start! Every challenge is a learning opportunity.";

        return (
            <div className="results-container fade-in">
                <h2 className="results-title">Challenge Complete!</h2>
                <div className="score-display">{percentage}%</div>
                <p className="score-text">{scoreText}</p>
                {newBadges.length > 0 && (
                    <div className="badges-unlocked">
                        <h3>New Badges Unlocked!</h3>
                        {newBadges.map((badge, index) => (
                            <span key={badge} className="badge" style={{'--delay': `${index * 0.2}s`}}>
                                <FontAwesomeIcon icon={faMedal} /> {badge.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        ))}
                    </div>
                )}
                <div className="results-actions">
                    <button className="nav-button" onClick={resetQuiz}><FontAwesomeIcon icon={faRedo} /> Play Again</button>
                    <a href="#profile" className="nav-button"><FontAwesomeIcon icon={faTrophy} /> View My Profile</a>
                </div>
            </div>
        );
    }
};

// --- HELPER SUB-COMPONENTS ---
const LevelCard = ({ icon, title, desc, reward, onClick }) => (
    <div className="level-card" onClick={onClick}>
        <div className="level-icon"><FontAwesomeIcon icon={icon} /></div>
        <h3 className="level-title">{title}</h3>
        <p className="level-desc">{desc}</p>
        <div className="reward-badge">{reward}</div>
    </div>
);

const PlayerStats = ({ level, xp, streak }) => (
    <div className="player-stats">
        <div className="stat-badge">{`Level ${level}`}</div>
        <div className="xp-bar"><div className="xp-fill" style={{ width: `${xp}%` }}></div></div>
        <div className="stat-badge streak-counter">{`🔥 ${streak} Streak`}</div>
    </div>
);

export default Quiz;