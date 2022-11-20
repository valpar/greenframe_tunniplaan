
const formatDate ={
   
    forSql: (startTime:string) => {
        let outTime ="";
        if (startTime.length>19){
            outTime = startTime.substr(0, 19);
            outTime = outTime.replace("T"," ");
          }  else { outTime = startTime.replace("T"," ");  }

    // if (inputdate.includes("T")) {
    //     const splitActualDate = inputdate.split("T");
    //     inputdate = splitActualDate[0];
    //   }
    //   if (inputdate.includes(" ")) {
    //     const splitActualDate = inputdate.split(" ");
    //     inputdate = splitActualDate[0];
    //   }
    return outTime;
    }
}

export default formatDate;