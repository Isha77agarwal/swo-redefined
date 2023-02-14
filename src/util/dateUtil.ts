/**
 * Returns 0 based index of given month.
 * @param month
 */
export const getMonthIndex = (month: Month): number => {
    switch (month) {
        case "January":
            return 0;
        case "February":
            return 1;
        case "March":
            return 2;
        case "April":
            return 3;
        case "May":
            return 4;
        case "June":
            return 5;
        case "July":
            return 6;
        case "August":
            return 7;
        case "September":
            return 8;
        case "October":
            return 9;
        case "November":
            return 10;
        default:
            return 11;
    }
};

/**
 * Returns month based on 0 based index
 */
export const getMonthFromIndex = (index: number): Month => {
    switch (index) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        default:
            return "December";
    }
};

/**
 * returns the previous pth month for a given month
 */
export const getPreviousMonth = (month: Month, p = 1): Month => {
    if (p == 0) return month;
    if (p < 0) return getNextMonth(month, -p);
    // handle cases for loop back.
    p = p % 12;
    let index = getMonthIndex(month);
    index -= p;
    // handle negative indexes
    if (index < 0) index += 12;
    return getMonthFromIndex(index);
};

/**
 * returns the next nth month for a given month
 */
export const getNextMonth = (month: Month, n = 1): Month => {
    if (n == 0) return month;
    if (n < 0) return getPreviousMonth(month, -n);
    n = n % 12;
    let index = getMonthIndex(month);
    index += n;
    index %= 12;
    return getMonthFromIndex(index);
};