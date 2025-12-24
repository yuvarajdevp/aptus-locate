const UnderLine = ({ Linewidth, left, active }) => {
    if (!active) return null; // hide if not active

    return (
        <div>
            <hr
                className={`mobileView ${left === "true" ? "" : "mx-auto my-auto"} mt-2 mb-0`}
                style={{
                    background: 'rgb(25, 67, 140)',
                    opacity: "1",
                    width: Linewidth ? Linewidth : "10%",
                    height: '3px',
                    borderRadius: "200px",
                    border: "1px solid"
                }}
            />
        </div>
    );
};

export default UnderLine;

