import GamesCategory from '../components/home/GamesCategory'
import GamesShowcase from '../components/home/GamesShowcase'
import GamesSlider from '../components/home/GamesSlider'
import Footer from '../components/footer/Footer'
export default function Home(){
    return(
        <>
            <GamesShowcase/>
            <GamesSlider/>
            <GamesCategory/>
            <Footer/>
        </>
    )
}