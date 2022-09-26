export const fetchData = async (dataCategory) => {
    const data = await fetch(`http://localhost:3000/${dataCategory}`);
    const returnData = await data.json();
    return returnData;
}
