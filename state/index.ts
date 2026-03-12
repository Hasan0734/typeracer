import { TypingStats, TypingStatus } from '@/hooks/useTyping';
import { Difficulty } from '@/lib/words'
import { create, createStore } from 'zustand';
import { persist, PersistStorage } from "zustand/middleware";


// interface TypingStats extends ApplicationFields{
//     wpm: number
//     cpm: number
//     accuracy: number
//     correctChars: number
//     incorrectChars: number
//     totalTyped: number
// }

interface ApplicationFields extends TypingStats {
    difficulty: Difficulty;
    duration: number;
    sound: boolean;
    keySound: boolean;
    showKeyboard: boolean;
    status: TypingStatus;
}


interface ApplicationState extends ApplicationFields {
    setDifficulty: (difficulty: Difficulty) => void;
    setDuration: (duration: number) => void;
    setSound: (sound: boolean) => void;
    setKeySound: (sound: boolean) => void;
    setShowKeyboard: (open: boolean) => void;
}

export const useApplicationStore = create<ApplicationState>()(
    persist((set) => ({
        ...initialState(),
        setDifficulty: (difficulty: Difficulty) => {
            set({ difficulty })
        },
        setDuration: (duration: number) => {
            set({ duration })
        },
        setSound: (sound: boolean) => set({ sound }),
        setKeySound: (keySound: boolean) => set({ keySound }),
        setShowKeyboard: (open) => set({ showKeyboard: open }),
    }), {
        name: "typing-settings"
    })
)


function initialState(): ApplicationFields {
    const difficulty = 'medium';
    const duration = 30;
    const sound = false;
    const keySound = false;
    const showKeyboard = false;
    const status = "idle";
    const wpm = 0;
    const cpm = 0;
    const accuracy = 0;
    const correctChars = 0;
    const incorrectChars = 0;
    const totalTyped = 0;

    return {
        difficulty,
        duration,
        sound,
        keySound,
        showKeyboard,
        status,
        wpm, cpm, accuracy, correctChars, incorrectChars, totalTyped
    }
}


//   const [difficulty, setDifficulty] = useState<Difficulty>("medium")
//   const [duration, setDuration] = useState(30)
//   const [sound, setSound] = useState(false)
//   const [keySound, setKeySound] = useState(false)
//   const [showKeyboard, setShowKeyboard] = useState(false)