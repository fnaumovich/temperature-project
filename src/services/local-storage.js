export default {
    setItem(str, data) {
        const string = JSON.stringify(data);
        localStorage.setItem(str, string);
    },
    getItem(str) {
        return JSON.parse(localStorage.getItem(str));
    }
};
