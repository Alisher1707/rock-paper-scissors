import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [showRules, setShowRules] = useState(false)
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [gameState, setGameState] = useState('choosing')
  const [showComputerChoice, setShowComputerChoice] = useState(false)
  const [gameMode, setGameMode] = useState('basic') // 'basic' or 'advanced'

  const basicChoices = [
    {
      id: 'rock',
      name: 'Rock',
      icon: '/svg/Rock Icon.svg',
      outerClass: 'circle-rock-outer',
      innerClass: 'circle-rock-inner'
    },
    {
      id: 'paper',
      name: 'Paper',
      icon: '/svg/Paper Icon.svg',
      outerClass: 'circle-paper-outer',
      innerClass: 'circle-paper-inner'
    },
    {
      id: 'scissors',
      name: 'Scissors',
      icon: '/svg/Scissors Icon.svg',
      outerClass: 'circle-scissors-outer',
      innerClass: 'circle-scissors-inner'
    }
  ]

  const advancedChoices = [
    ...basicChoices,
    {
      id: 'lizard',
      name: 'Lizard',
      icon: '/svg/lizard icon.svg',
      outerClass: 'circle-lizard-outer',
      innerClass: 'circle-lizard-inner'
    },
    {
      id: 'spock',
      name: 'Spock',
      icon: '/svg/spock icon.svg',
      outerClass: 'circle-spock-outer',
      innerClass: 'circle-spock-inner'
    }
  ]

  const choices = gameMode === 'advanced' ? advancedChoices : basicChoices

  const getWinner = (player, computer) => {
    if (player === computer) return 'draw'

    const winConditions = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['paper', 'spock'],
      spock: ['scissors', 'rock']
    }

    if (winConditions[player]?.includes(computer)) {
      return 'win'
    }
    return 'lose'
  }

  const handleChoice = (choice) => {
    const computerSelection = choices[Math.floor(Math.random() * choices.length)]
    const gameResult = getWinner(choice.id, computerSelection.id)

    setPlayerChoice(choice)
    setComputerChoice(computerSelection)
    setGameState('result')
    setShowComputerChoice(false)

    // Show computer choice after 1 second
    setTimeout(() => {
      setShowComputerChoice(true)
      setResult(gameResult)

      if (gameResult === 'win') {
        const newScore = score + 1
        setScore(newScore)
        // Switch to advanced mode when score reaches 12
        if (newScore >= 1 && gameMode === 'basic') {     // 1 => 12
          setGameMode('advanced')
        }
      // } else if (gameResult === 'lose') {
      //   setScore(Math.max(0, score - 1))--------------------------------------close the minus score --------------
      }
    }, 1000)
  }

  const playAgain = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setGameState('choosing')
    setShowComputerChoice(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Score Header */}
        <div className="flex items-center justify-between border-[3px] border-white/20 rounded-2xl px-8 py-5 mb-20">
          <div>
            <h1 className="text-[2rem] font-bold uppercase leading-[1.9rem] tracking-tight">
              Rock<br />
              Paper<br />
              Scissors{gameMode === 'advanced' && (<><br />Lizard<br />Spock</>)}
            </h1>
          </div>
          <div className="bg-white rounded-lg px-10 py-4">
            <div className="text-[#2a46c0] text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-center">
              Score
            </div>
            <div className="text-[#565468] text-[3.5rem] font-bold leading-none text-center mt-1">
              {score}
            </div>
          </div>
        </div>

        {/* Game Area */}
        {gameState === 'choosing' && (
          <div className="relative">
            {gameMode === 'basic' ? (
              <>
                <div className="flex justify-center items-start gap-16 mb-16">
                  {/* Paper - Left (Blue) */}
                  <button
                    onClick={() => handleChoice(choices[1])}
                    className="transition-transform hover:scale-105"
                  >
                    <div className="w-44 h-44 rounded-full flex items-center justify-center circle-paper-outer">
                      <div className="w-[7rem] h-[7rem] rounded-full flex items-center justify-center circle-paper-inner">
                        <div className="w-28 h-28 rounded-full flex items-center justify-center circle-white">
                          <img src="/svg/Paper Icon.svg" alt="Paper" className="w-18 h-18" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Scissors - Right (Yellow) */}
                  <button
                    onClick={() => handleChoice(choices[2])}
                    className="transition-transform hover:scale-105"
                  >
                    <div className="w-44 h-44 rounded-full flex items-center justify-center circle-scissors-outer">
                      <div className="w-[7rem] h-[7rem] rounded-full flex items-center justify-center circle-scissors-inner">
                        <div className="w-28 h-28 rounded-full flex items-center justify-center circle-white">
                          <img src="/svg/Scissors Icon.svg" alt="Scissors" className="w-18 h-18" />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Rock - Bottom Center (Red) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleChoice(choices[0])}
                    className="transition-transform hover:scale-105"
                  >
                    <div className="w-44 h-44 rounded-full flex items-center justify-center circle-rock-outer">
                      <div className="w-[7rem] h-[7rem] rounded-full flex items-center justify-center circle-rock-inner">
                        <div className="w-28 h-28 rounded-full flex items-center justify-center circle-white">
                          <img src="/svg/Rock Icon.svg" alt="Rock" className="w-18 h-18" />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              /* Advanced Mode - Pentagon Layout */
              <div className="relative w-full h-[450px] flex items-center justify-center">
                {/* Scissors - Top Center (Yellow) */}
                <button
                  onClick={() => handleChoice(choices[2])}
                  className="absolute transition-transform hover:scale-105"
                  style={{ top: '-40px', left: '50%', transform: 'translateX(-50%)' }}
                >
                  <div className="w-32 h-32 rounded-full flex items-center justify-center circle-scissors-outer">
                    <div className="w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center circle-scissors-inner">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center circle-white">
                        <img src="/svg/Scissors Icon.svg" alt="Scissors" className="w-14 h-14" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Paper - Top Right (Blue) */}
                <button
                  onClick={() => handleChoice(choices[1])}
                  className="absolute transition-transform hover:scale-105"
                  style={{ top: '90px', right: '110px' }}
                >
                  <div className="w-32 h-32 rounded-full flex items-center justify-center circle-paper-outer">
                    <div className="w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center circle-paper-inner">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center circle-white">
                        <img src="/svg/Paper Icon.svg" alt="Paper" className="w-14 h-14" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Spock - Top Left (Cyan) */}
                <button
                  onClick={() => handleChoice(choices[4])}
                  className="absolute transition-transform hover:scale-105"
                  style={{ top: '90px', left: '110px' }}
                >
                  <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #3fb7cd, #2d9db4)' }}>
                    <div className="w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #4fc1d6, #3fb8cd)' }}>
                      <div className="w-24 h-24 rounded-full flex items-center justify-center circle-white">
                        <img src="/svg/spock icon.svg" alt="Spock" className="w-14 h-14" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Rock - Bottom Right (Red) */}
                <button
                  onClick={() => handleChoice(choices[0])}
                  className="absolute transition-transform hover:scale-105"
                  style={{ bottom: '20px', right: '100px' }}
                >
                  <div className="w-32 h-32 rounded-full flex items-center justify-center circle-rock-outer">
                    <div className="w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center circle-rock-inner">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center circle-white">
                        <img src="/svg/Rock Icon.svg" alt="Rock" className="w-14 h-14" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Lizard - Bottom Left (Purple) */}
                <button
                  onClick={() => handleChoice(choices[3])}
                  className="absolute transition-transform hover:scale-105"
                  style={{ bottom: '20px', left: '100px' }}
                >
                  <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #834fe0, #7634d9)' }}>
                    <div className="w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #8b5ce8, #8349e0)' }}>
                      <div className="w-24 h-24 rounded-full flex items-center justify-center circle-white">
                        <img src="/svg/lizard icon.svg" alt="Lizard" className="w-14 h-14" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result Screen */}
        {gameState === 'result' && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-20 mb-12">
              {/* Player Choice */}
              <div className="text-center">
                <p className="text-lg uppercase tracking-widest mb-12">You Picked</p>
                <div className={`w-56 h-56 rounded-full flex items-center justify-center ${playerChoice.outerClass}`}>
                  <div className={`w-[10rem] h-[10rem] rounded-full flex items-center justify-center ${playerChoice.innerClass}`}>
                    <div className="w-40 h-40 rounded-full flex items-center justify-center circle-white">
                      <img src={playerChoice.icon} alt={playerChoice.name} className="w-24 h-24" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="text-center px-8">
                  <h2 className="text-5xl font-bold mb-4 uppercase">
                    {result === 'win' && 'You Win'}
                    {result === 'lose' && 'You Lose'}
                    {result === 'draw' && 'Draw'}
                  </h2>
                  <button
                    onClick={playAgain}
                    className="px-14 py-3 bg-white text-[#3b4363] rounded-lg hover:text-red-500 transition-all uppercase tracking-widest text-sm font-semibold"
                  >
                    Play Again
                  </button>
                </div>
              )}

              {/* Computer Choice */}
              <div className="text-center">
                <p className="text-lg uppercase tracking-widest mb-12">The House Picked</p>
                {showComputerChoice ? (
                  <div className={`w-56 h-56 rounded-full flex items-center justify-center ${computerChoice.outerClass}`}>
                    <div className={`w-[10rem] h-[10rem] rounded-full flex items-center justify-center ${computerChoice.innerClass}`}>
                      <div className="w-40 h-40 rounded-full flex items-center justify-center circle-white">
                        <img src={computerChoice.icon} alt={computerChoice.name} className="w-24 h-24" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-56 h-56 rounded-full bg-[#16213d] flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[#0d1525]"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rules Button */}
        <div className="absolute bottom-8 right-8">
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-10 py-3 border-2 border-white/20 rounded-lg hover:bg-white/5 transition-all uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Rules
          </button>
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 rounded-2xl p-10 max-w-md mx-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold uppercase">Rules</h2>
              <button
                onClick={() => setShowRules(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-base text-gray-600">
              {gameMode === 'basic' ? (
                <>
                  <p><span className="font-semibold text-gray-800">Rock</span> beats <span className="font-semibold text-gray-800">Scissors</span></p>
                  <p><span className="font-semibold text-gray-800">Scissors</span> beats <span className="font-semibold text-gray-800">Paper</span></p>
                  <p><span className="font-semibold text-gray-800">Paper</span> beats <span className="font-semibold text-gray-800">Rock</span></p>
                </>
              ) : (
                <>
                  <p><span className="font-semibold text-gray-800">Rock</span> beats <span className="font-semibold text-gray-800">Scissors & Lizard</span></p>
                  <p><span className="font-semibold text-gray-800">Paper</span> beats <span className="font-semibold text-gray-800">Rock & Spock</span></p>
                  <p><span className="font-semibold text-gray-800">Scissors</span> beats <span className="font-semibold text-gray-800">Paper & Lizard</span></p>
                  <p><span className="font-semibold text-gray-800">Lizard</span> beats <span className="font-semibold text-gray-800">Paper & Spock</span></p>
                  <p><span className="font-semibold text-gray-800">Spock</span> beats <span className="font-semibold text-gray-800">Scissors & Rock</span></p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
