
const formatDate ={
   
    forSql: (inputdate:string) => {
        // let outTime ="";
        // if (inTime.length>19){
        // outTime = inTime.substr(0, 19);
        //     outTime = outTime.replace("T"," ");
        //   }  else { 
        //     outTime = inTime.replace("T"," ");
        //   }
        

    if (inputdate.includes("T")) {
        const splitActualDate = inputdate.split("T");
        inputdate = splitActualDate[0];
      }
      if (inputdate.includes(" ")) {
        const splitActualDate = inputdate.split(" ");
        inputdate = splitActualDate[0];
      }
    return inputdate;
    }
}

export default formatDate;