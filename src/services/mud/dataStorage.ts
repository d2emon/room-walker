interface DataStorage<Data> {
  [k: string]: Data;
}

function dataStorage<Data> () {
  const stored: DataStorage<Data> = {};
        
  const getData = async (itemId: string): Promise<Data | null> => {
    const item = stored[itemId];
    return item ? {...item} : null;
  }
        
  const setData = async (itemId: string, data: Data): Promise<Data> => {
    stored[itemId] = {...data};
    return {...data};
  }
    
  return {
    getData,
    setData,
  };
};
          
export default dataStorage;
    