function JobTypeBadge ({ type }) {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    console.log("type:", type);
    return (
        <span
            className={
                type === "full-time"
                    ? "badge bg-success"
                    : type === "part-time"
                        ? "badge bg-primary"
                        : type === "per-hour"
                            ? "badge bg-warning"
                            : type === "fixed-price"
                                ? "badge bg-danger"
                                : ""
            }
        style={{ marginLeft: "10px" }}>
            {capitalizeFirstLetter(type)}
        </span>
    );
}

export default JobTypeBadge;