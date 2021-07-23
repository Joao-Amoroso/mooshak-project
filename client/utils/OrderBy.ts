import { tableData } from "../types/tableData";

const orderByTimeAsc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
    };
    newData.sort(compare);
    return newData;
};
const orderByTimeDesc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
        return 0;
    };
    newData.sort(compare);
    return newData;
};
const orderByDateAsc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.uploadAt < b.uploadAt) return -1;
        if (a.uploadAt > b.uploadAt) return 1;
        return 0;
    };
    newData.sort(compare);
    return newData;
};
const orderByDateDesc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.uploadAt > b.uploadAt) return -1;
        if (a.uploadAt < b.uploadAt) return 1;
        return 0;
    };
    newData.sort(compare);
    return newData;
};
const orderByTestsAsc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.tests.passed < b.tests.passed) return -1;
        if (a.tests.passed > b.tests.passed) return 1;

        return 0;
    };
    newData.sort(compare);
    return newData;
};
const orderByTestsDesc = (data: tableData[]): tableData[] => {
    const newData = [...data];
    const compare = (a: tableData, b: tableData) => {
        if (a.tests.passed > b.tests.passed) return -1;
        if (a.tests.passed < b.tests.passed) return 1;
        return 0;
    };
    newData.sort(compare);
    return newData;
};

const obj: {
    [key: string]: any;
} = {
    DateAsc: orderByDateAsc,
    DateDesc: orderByDateDesc,
    TestsPassedDesc: orderByTestsDesc,
    TestsPassedAsc: orderByTestsAsc,
    TimeDesc: orderByTimeDesc,
    TimeAsc: orderByTimeAsc
};
export default obj;
