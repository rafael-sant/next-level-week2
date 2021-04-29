import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;     
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    clearPlayerState: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;

    playPrevious: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
  
    function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying);
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);

    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(isShuffling) {
            const nextRamdomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRamdomEpisodeIndex);
        } else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state)
    }
  
    return (
        <PlayerContext.Provider
            value={{ episodeList, 
            currentEpisodeIndex,
            play,
            isPlaying, 
            isLooping,
            isShuffling,
            hasNext,
            hasPrevious,
            playNext,
            playPrevious,
            playList,
            toggleLoop,
            toggleShuffle,
            togglePlay, 
            clearPlayerState,
            setPlayingState
        }}>
            {children}
        </PlayerContext.Provider> 
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
} 