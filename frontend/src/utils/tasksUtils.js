export const formatDate = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
};

export const priorityText = (priority) => {
    switch (priority) {
        case "low":
            return "Low";
        case "medium":
            return "Medium";
        case "high":
            return "High";
        default:
            return "Not stated";
    }
};
