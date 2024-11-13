import DynamicBackground from "../components/DynamicBackground";
import DynamicSlidingImages from "../components/DynamicSlidingImages";

import { homePageImages } from "../lib/data";

const HomePage = () => {
    return(
        <div>
            <DynamicBackground backgroundUrl="https://www.w3schools.com/html/mov_bbb.mp4">
                <DynamicSlidingImages images={homePageImages} />
            </DynamicBackground>
        </div>
    );
}

export default HomePage;