import { lazy } from 'react';
import HomeFirst from "../components/HomeFirst";
import PastSpeakers from '../components/PastSpeakers';

const AnimatedText = lazy(() => import("../components/HomeAbout"));

export default function Home() {
    return(
        <>
            <HomeFirst />
            <AnimatedText />
            <PastSpeakers />
        </>
    )
}