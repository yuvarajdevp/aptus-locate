const UnderLine = ({ Linewidth, left, active }) => {
    if (!active) return null; // hide if not active

    return (
        <div>
            <hr
                className={`mobileView bg-primary ${left === "true" ? "" : "mx-auto my-auto"} mt-2 mb-0 border-0 opacity-100`}
                style={{
                    width: Linewidth ? Linewidth : "10%",
                    height: "3px",
                    borderRadius: "200px",
                }}
            />
        </div>
    );
};

export default UnderLine;

