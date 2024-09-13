interface LogRecord {
  date: Date;
  message: string;
};

const logged: LogRecord[] = [];

const addRecord = async (message: string) => {
  console.log(message);
  logged.push({
    date: new Date(),
    message,
  });
  return {
    result: true,
  };
};

const LoggerAPI = {
  addRecord,
};

export default LoggerAPI;
