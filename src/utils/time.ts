export const formatDate = (timestamp: number) => {
    const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(timestamp);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
