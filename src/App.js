import { useEffect, useState } from "react";
import { images } from "./data";
import './App.css';

/* The React hook usestate stores values for cardsChosen,IDs,image array and the points */
function MemoryGame() {
    const BLANK_CARD = "https://progitek.no/privat/bp/wp-content/uploads/2021/09/pexels-pixabay-235985-scaled.jpg"
    const [imagesArray, setImagesArray] = useState([])
    const [cardsChosen, setCardsChosen] = useState([])
    const [cardsChosenIds, setCardsChosenIds] = useState([])
    const [points, setPoints] = useState(0);

    const [openCards, setOpenCards] = useState([])

    /** The code block below generates concantenated array from the image array */
    function createCardBoard() {
        const imagesGenerated = images?.concat(...images)
        console.log(imagesGenerated)
        const shuffledArray = shuffleArray(imagesGenerated)
        setImagesArray(shuffledArray)
    }

    /**The code block below checks the clicked image to turn and show an animal */
     /* The image index and URL are saved in the arrays cardsChosenIds and cardChosen, respectively.*/
     /*  If the images match both URL and the indexes are different, we add two points to the user. */
    function flipImage(image, index) {
        // CHECK IF IMAGE IS SELECTED
        console.log(image, index)

        if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
            return
        }

        // Check if 
        if (cardsChosen?.length < 2) {

            setCardsChosen(cardsChosen => cardsChosen?.concat(image))
            setCardsChosenIds(cardsChosenIds => cardsChosenIds?.concat(index))

            if (cardsChosen?.length === 1) {
                // Check if images are the same
                if (cardsChosen[0] === image) {
                    setPoints(points => points + 2)
                    setOpenCards(openCards => openCards?.concat([cardsChosen[0], image]))
                }
                setTimeout(() => {
                    setCardsChosenIds([])
                    setCardsChosen([])
                }, 700)
                
            } 
        }
    }

    function isCardChosen(image, index) {
        return cardsChosenIds?.includes(index) || openCards?.includes(image)
    }

/* The code lines below shuffles the images in random order using Fisher-Yates algorithm*/ 
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array)
        return array
    }
/** This code block allow users to rest and start a new game */
    function startOver() {
        setCardsChosenIds([])
        setCardsChosen([])
        setPoints(0)
        setOpenCards([])
    }

    useEffect(() => {
        createCardBoard()
    }, [])
/** This is what is returned to the webpage where we can play the actual game */
    return (
        <div>
            <h2>MemoryGame</h2>
            <h3>Points: {points}</h3>
            <button onClick={startOver}>Start over</button>
            <div className="row no-gutters">
                {imagesArray?.map((image, index) => {
                    return (
                        <div className="col-4 col-lg-2" key={index} onClick={() => flipImage(image, index)}>
                            <img src={isCardChosen(image, index) ? image : BLANK_CARD} alt="" className={`img-fluid img-fixed`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MemoryGame