export type tableData = {
    id: string;
    user: string;
    uploadAt: string;
    time: number;
    tests: {
        passed: number;
        testsFailed: string[];
    };
};
