import myStyle from './Slider.module.scss';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const BtnSlider = ({ direction, moveSlide }) => {
    
    return (
        <button
            className={direction === "next" ? `${myStyle.btnSlide} ${myStyle.next}` : `${myStyle.btnSlide} ${myStyle.prev}`}
            onClick={moveSlide}>
            {
                direction === "next" ? (<KeyboardDoubleArrowRightIcon />) : (<KeyboardDoubleArrowLeftIcon />)
            }
        </button>
    )
}

export default BtnSlider;