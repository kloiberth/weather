

const ChangeGrade = ({setIsFahrenheit,isFahrenheit}) => {

    return (
        <>
         <button onClick={() => setIsFahrenheit(!isFahrenheit)} className="btn-change">{isFahrenheit? "change °C" : "change °F"}</button>
        </>
    );
};

export default ChangeGrade;