const formatDate = {

  forSql: (inputdate:string) => {
    // let outTime ="";
    // if (inTime.length>19){
    // outTime = inTime.substr(0, 19);
    //     outTime = outTime.replace("T"," ");
    //   }  else {
    //     outTime = inTime.replace("T"," ");
    //   }

    // ESLint errorite kõrvaldamiseks lõin returnedInputDate,
    // enne muudeti ja tagastati inputdate, mis on sama nimega, kui parameeter
    let returnedInputDate;
    if (inputdate.includes('T')) {
      const [splitActualDate] = inputdate.split('T');
      returnedInputDate = splitActualDate;
    }
    if (inputdate.includes(' ')) {
      const [splitActualDate] = inputdate.split(' ');
      returnedInputDate = splitActualDate;
    }
    return returnedInputDate;
  },

  forSqlDateTime: (inputDateTime:string) => {
    let resultDateTime = '';
    if (inputDateTime.length > 19) {
      resultDateTime = inputDateTime.substr(0, 19);
      resultDateTime = resultDateTime.replace('T', ' ');
    } else {
      resultDateTime = inputDateTime.replace('T', ' ');
    }
    return resultDateTime;
  },

};

export default formatDate;
