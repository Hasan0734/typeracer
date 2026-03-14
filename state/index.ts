import { TypingStatus } from '@/hooks/useTyping';
import { Difficulty } from '@/lib/words'
import { create, createStore } from 'zustand';
import { persist, PersistStorage } from "zustand/middleware";


export interface TypingStats {
    wpm: number
    cpm: number
    accuracy: number
    correctChars: number
    incorrectChars: number
    totalTyped: number
}

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
    setStatus: (status: TypingStatus) => void;
    setStats: (data: TypingStats) => void;
    reset: () => void;
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
        setStatus: (status) => set({ status }),
        setStats: (stats) => set({ ...stats }),

        reset: () => {
            set(initialState())
        },
    }), {
        name: "typing-settings",
        partialize: (state) => ({
            sound: state.sound,
            keySound: state.keySound,
            duration: state.duration,
            showKeyboard: state.showKeyboard,
            difficulty: state.difficulty

        }),
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



interface ScoreFields {
    wpm: number,
    accuracy: number;
    difficulty: Difficulty;
    duration: number,
    date: string
}

interface ScoreState {
    scores: ScoreFields[]
}

interface BestScoreState extends ScoreState {
    saveBestScore: (data: ScoreFields) => void;
    getBestScore: () => ScoreFields | null;
}

export const useBestScore = create<BestScoreState>()(
    persist((set, get) => ({
        scores: [],

        saveBestScore: (newScore: ScoreFields) => {

            const scores = [...get().scores];
            scores.push(newScore);

            scores.sort((a, b) => b.wpm - a.wpm);
            set({ scores })
        },
        getBestScore: () => {
            return get().scores.length > 0 ? get().scores[0] : null
        }

    }), {
        name: "best-type-score",
        partialize: (state) => ({
            scores: state.scores
        })
    })
)