interface LogRecord {
    date: number,
    message: string,
}

interface LogData {
    records: LogRecord[],
}

const DATA: LogData = {
    records: [],
};

export const getRecords = (): Promise<LogRecord[]> => Promise.resolve([...DATA.records]);
export const addRecord = (message: string): Promise<boolean> => new Promise<boolean>((resolve) => {
    const date = new Date();
    DATA.records.push({
        date: date.getTime(),
        message
    });
    return resolve(true);
});
