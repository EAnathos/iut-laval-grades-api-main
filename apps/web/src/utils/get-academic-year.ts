const getAcademicYear = (): string => {
    const date = new Date();
    const month = date.getMonth();

    if (month >= 8 && month <= 11) {
        return `${date.getFullYear()}-${date.getFullYear() + 1}`;
    } else {
        return `${date.getFullYear() - 1}-${date.getFullYear()}`;
    }
};

export default getAcademicYear;