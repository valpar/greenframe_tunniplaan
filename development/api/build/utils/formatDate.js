"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatDate = {
    forSql: (inputdate) => {
        // let outTime ="";
        // if (inTime.length>19){
        // outTime = inTime.substr(0, 19);
        //     outTime = outTime.replace("T"," ");
        //   }  else {
        //     outTime = inTime.replace("T"," ");
        //   }
        if (inputdate.includes('T')) {
            const splitActualDate = inputdate.split('T');
            inputdate = splitActualDate[0];
        }
        if (inputdate.includes(' ')) {
            const splitActualDate = inputdate.split(' ');
            inputdate = splitActualDate[0];
        }
        return inputdate;
    },
    forSqlDateTime: (inputDateTime) => {
        let resultDateTime = '';
        if (inputDateTime.length > 19) {
            resultDateTime = inputDateTime.substr(0, 19);
            resultDateTime = resultDateTime.replace('T', ' ');
        }
        else {
            resultDateTime = inputDateTime.replace('T', ' ');
        }
        return resultDateTime;
    },
};
exports.default = formatDate;
